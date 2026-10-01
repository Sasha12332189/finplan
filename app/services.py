from __future__ import annotations

import re
from datetime import datetime, timezone
from decimal import Decimal

from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from .models import Transaction, User


EXPENSE_PATTERN = re.compile(r"^\s*(?P<prefix>[+-])?\s*(?P<amount>\d+(?:[.,]\d{1,2})?)\s*(?P<note>.+?)\s*$")

CATEGORY_KEYWORDS = {
    "Food": ("coffee", "cafe", "food", "еда", "кава", "продукт", "ресторан"),
    "Transport": ("taxi", "uber", "bolt", "metro", "bus", "такси", "транспорт"),
    "Home": ("rent", "flat", "коммун", "квартира", "оренда"),
    "Fun": ("cinema", "game", "bar", "кино", "игр", "бар"),
    "Health": ("doctor", "pharmacy", "лікар", "аптек"),
}


def infer_category(note: str) -> str:
    lower_note = note.lower()
    for category, words in CATEGORY_KEYWORDS.items():
        if any(word in lower_note for word in words):
            return category
    return "Other"


def parse_expense_message(text: str) -> tuple[str, Decimal, str, str] | None:
    match = EXPENSE_PATTERN.match(text)
    if not match:
        return None
    amount = Decimal(match.group("amount").replace(",", "."))
    note = match.group("note").strip()
    if amount <= 0 or not note:
        return None
    kind = "income" if match.group("prefix") == "+" else "expense"
    return kind, amount, note, infer_category(note)


async def ensure_user(session: AsyncSession, telegram_id: int, first_name: str, username: str | None) -> User:
    user = await session.scalar(select(User).where(User.telegram_id == telegram_id))
    if user:
        user.first_name = first_name or user.first_name
        user.username = username
        return user
    user = User(telegram_id=telegram_id, first_name=first_name or "friend", username=username)
    session.add(user)
    try:
        await session.flush()
        return user
    except IntegrityError:
        # Another request (e.g. Mini App auth + /start) may create the same user concurrently.
        await session.rollback()
        existing = await session.scalar(select(User).where(User.telegram_id == telegram_id))
        if not existing:
            raise
        existing.first_name = first_name or existing.first_name
        existing.username = username
        return existing


async def monthly_totals(session: AsyncSession, user_id: int) -> tuple[Decimal, Decimal]:
    now = datetime.now(timezone.utc)
    month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    transactions = list(
        (await session.scalars(select(Transaction).where(Transaction.user_id == user_id, Transaction.occurred_at >= month_start))).all()
    )
    expenses = sum((Decimal(item.amount) for item in transactions if item.kind == "expense"), Decimal("0"))
    income = sum((Decimal(item.amount) for item in transactions if item.kind == "income"), Decimal("0"))
    return income, expenses

