from datetime import datetime
from decimal import Decimal
from typing import Literal

from pydantic import BaseModel, Field, field_validator


CURRENCIES = {
    "EUR", "GBP", "CHF", "CZK", "DKK", "HUF", "PLN", "RON", "SEK", "NOK", "ISK",
    "UAH", "RSD", "ALL", "BAM", "MDL", "MKD", "BYN", "RUB", "TRY", "GEL", "AMD", "AZN",
    "USD", "CAD", "AUD", "JPY",
}


class TransactionCreate(BaseModel):
    kind: Literal["expense", "income"]
    amount: Decimal = Field(gt=0, max_digits=16, decimal_places=2)
    category: str = Field(default="Other", max_length=64)
    note: str | None = Field(default=None, max_length=500)
    occurred_at: datetime | None = None


class GoalCreate(BaseModel):
    title: str = Field(min_length=1, max_length=120)
    target_amount: Decimal = Field(gt=0, max_digits=16, decimal_places=2)
    saved_amount: Decimal = Field(default=Decimal("0"), ge=0, max_digits=16, decimal_places=2)
    target_date: datetime | None = None


class UserSettingsUpdate(BaseModel):
    currency: str = Field(default="UAH", min_length=3, max_length=8)
    monthly_budget: Decimal | None = Field(default=None, ge=0, max_digits=16, decimal_places=2)
    language: Literal["uk", "ru", "en"] = "uk"
    theme: Literal["system", "light", "dark"] = "system"
    opening_balance: Decimal = Field(default=Decimal("0"), max_digits=16, decimal_places=2)

    @field_validator("currency")
    @classmethod
    def valid_currency(cls, value: str) -> str:
        value = value.upper()
        if value not in CURRENCIES:
            raise ValueError("Unsupported currency")
        return value


class InvestmentTransactionCreate(BaseModel):
    symbol: str = Field(min_length=1, max_length=32)
    instrument_name: str = Field(min_length=1, max_length=180)
    asset_type: str = Field(default="Stock", max_length=32)
    side: Literal["BUY", "SELL"]
    quantity: Decimal = Field(gt=0, max_digits=20, decimal_places=8)
    price: Decimal = Field(gt=0, max_digits=20, decimal_places=6)
    fee: Decimal = Field(default=Decimal("0"), ge=0, max_digits=16, decimal_places=2)
    currency: str = Field(default="USD", min_length=3, max_length=8)
    occurred_at: datetime | None = None


class InvestmentCapitalTransfer(BaseModel):
    amount: Decimal = Field(gt=0, max_digits=16, decimal_places=2)
    direction: Literal["allocate", "return"] = "allocate"


class FXConvertCreate(BaseModel):
    base: str = Field(min_length=3, max_length=8)
    quote: str = Field(min_length=3, max_length=8)
    amount: Decimal = Field(gt=0, max_digits=20, decimal_places=6)

    @field_validator("base", "quote")
    @classmethod
    def valid_fx_currency(cls, value: str) -> str:
        value = value.upper()
        if value not in CURRENCIES:
            raise ValueError("Unsupported currency")
        return value


class WatchlistCreate(BaseModel):
    symbol: str = Field(min_length=1, max_length=32)
    instrument_name: str = Field(min_length=1, max_length=180)
    asset_type: str = Field(default="Stock", max_length=32)
