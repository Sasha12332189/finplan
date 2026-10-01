from __future__ import annotations

import hashlib
import hmac
import json
import time
from dataclasses import dataclass
from urllib.parse import parse_qsl
from typing import Optional

from fastapi import Header, HTTPException, Request
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from .config import get_settings
from .database import SessionLocal
from .models import User


@dataclass(frozen=True)
class TelegramIdentity:
    telegram_id: int
    first_name: str
    username: Optional[str]


def validate_init_data(init_data: str, bot_token: str, max_age_seconds: int) -> TelegramIdentity:
    """Validate Telegram Mini App initData as specified by Telegram's Web Apps docs."""
    if not init_data or not bot_token:
        raise ValueError("Telegram Mini App authentication is not configured")
    values = dict(parse_qsl(init_data, keep_blank_values=True))
    received_hash = values.pop("hash", None)
    auth_date = values.get("auth_date")
    if not received_hash or not auth_date or not values.get("user"):
        raise ValueError("Missing Telegram Mini App authentication fields")
    if abs(time.time() - int(auth_date)) > max_age_seconds:
        raise ValueError("Telegram Mini App session has expired")

    data_check_string = "\n".join(f"{key}={value}" for key, value in sorted(values.items()))
    secret = hmac.new(b"WebAppData", bot_token.encode(), hashlib.sha256).digest()
    expected_hash = hmac.new(secret, data_check_string.encode(), hashlib.sha256).hexdigest()
    if not hmac.compare_digest(expected_hash, received_hash):
        raise ValueError("Telegram Mini App signature is invalid")

    telegram_user = json.loads(values["user"])
    return TelegramIdentity(
        telegram_id=int(telegram_user["id"]),
        first_name=telegram_user.get("first_name") or "friend",
        username=telegram_user.get("username"),
    )


async def get_current_user(
    request: Request,
    x_telegram_init_data: str | None = Header(default=None),
    x_dev_telegram_user: str | None = Header(default=None),
) -> User:
    settings = get_settings()
    try:
        if x_telegram_init_data:
            identity = validate_init_data(
                x_telegram_init_data, settings.bot_token, settings.webapp_auth_max_age_seconds
            )
        elif settings.debug and (x_dev_telegram_user or settings.dev_telegram_user_id):
            identity = TelegramIdentity(
                telegram_id=int(x_dev_telegram_user or settings.dev_telegram_user_id),
                first_name="Local developer",
                username=None,
            )
        else:
            raise ValueError("Open finplan from its Telegram bot")
    except (ValueError, json.JSONDecodeError) as error:
        raise HTTPException(status_code=401, detail=str(error)) from error

    async with SessionLocal() as session:
        existing = await session.scalar(select(User).where(User.telegram_id == identity.telegram_id))
        if existing:
            existing.first_name = identity.first_name
            existing.username = identity.username
            await session.commit()
            await session.refresh(existing)
            return existing

        user = User(
            telegram_id=identity.telegram_id,
            first_name=identity.first_name,
            username=identity.username,
        )
        session.add(user)
        try:
            await session.commit()
            await session.refresh(user)
            return user
        except IntegrityError:
            # /start and Mini App auth can arrive at nearly the same time for a new user.
            await session.rollback()
            existing = await session.scalar(select(User).where(User.telegram_id == identity.telegram_id))
            if not existing:
                raise
            existing.first_name = identity.first_name
            existing.username = identity.username
            await session.commit()
            await session.refresh(existing)
            return existing

