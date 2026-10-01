from __future__ import annotations

from datetime import datetime, timezone
from decimal import Decimal

from sqlalchemy import BigInteger, DateTime, ForeignKey, Numeric, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column

from .database import Base


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    telegram_id: Mapped[int] = mapped_column(BigInteger, unique=True, index=True)
    first_name: Mapped[str] = mapped_column(String(128), default="friend")
    username: Mapped[str | None] = mapped_column(String(128), nullable=True)
    currency: Mapped[str] = mapped_column(String(8), default="UAH")
    language: Mapped[str] = mapped_column(String(8), default="uk")
    theme: Mapped[str] = mapped_column(String(16), default="system")
    monthly_budget: Mapped[Decimal | None] = mapped_column(Numeric(16, 2), nullable=True)
    opening_balance: Mapped[Decimal] = mapped_column(Numeric(16, 2), default=Decimal("0"))
    investment_capital: Mapped[Decimal] = mapped_column(Numeric(16, 2), default=Decimal("0"))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)


class Transaction(Base):
    __tablename__ = "transactions"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    kind: Mapped[str] = mapped_column(String(16))
    amount: Mapped[Decimal] = mapped_column(Numeric(16, 2))
    category: Mapped[str] = mapped_column(String(64), default="Other")
    note: Mapped[str | None] = mapped_column(Text, nullable=True)
    occurred_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)


class Goal(Base):
    __tablename__ = "goals"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    title: Mapped[str] = mapped_column(String(120))
    target_amount: Mapped[Decimal] = mapped_column(Numeric(16, 2))
    saved_amount: Mapped[Decimal] = mapped_column(Numeric(16, 2), default=Decimal("0"))
    target_date: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)


class InvestmentTransaction(Base):
    __tablename__ = "investment_transactions"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    symbol: Mapped[str] = mapped_column(String(32), index=True)
    instrument_name: Mapped[str] = mapped_column(String(180))
    asset_type: Mapped[str] = mapped_column(String(32), default="Stock")
    side: Mapped[str] = mapped_column(String(8))
    quantity: Mapped[Decimal] = mapped_column(Numeric(20, 8))
    price: Mapped[Decimal] = mapped_column(Numeric(20, 6))
    fee: Mapped[Decimal] = mapped_column(Numeric(16, 2), default=Decimal("0"))
    currency: Mapped[str] = mapped_column(String(8), default="USD")
    occurred_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)


class WatchlistItem(Base):
    __tablename__ = "watchlist_items"
    __table_args__ = (UniqueConstraint("user_id", "symbol", name="uq_watchlist_user_symbol"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    symbol: Mapped[str] = mapped_column(String(32))
    instrument_name: Mapped[str] = mapped_column(String(180))
    asset_type: Mapped[str] = mapped_column(String(32), default="Stock")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)
