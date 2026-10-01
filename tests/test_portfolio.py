from datetime import datetime, timezone
from decimal import Decimal

from app.models import InvestmentTransaction
from app.portfolio import build_positions


def trade(id, side, quantity, price, fee="0"):
    return InvestmentTransaction(
        id=id, user_id=1, symbol="AAPL", instrument_name="Apple", asset_type="Stock", side=side,
        quantity=Decimal(quantity), price=Decimal(price), fee=Decimal(fee), currency="USD",
        occurred_at=datetime(2026, 1, id, tzinfo=timezone.utc),
    )


def test_weighted_average_cost_and_realised_gain():
    positions = build_positions([trade(1, "BUY", "2", "100", "2"), trade(2, "BUY", "2", "120", "0"), trade(3, "SELL", "1", "140", "1")])
    position = positions[0]
    assert position.quantity == Decimal("3")
    assert position.average_cost == Decimal("110.5")
    assert position.realised_pnl == Decimal("28.5")
