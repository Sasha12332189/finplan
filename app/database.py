from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import text

from .config import get_settings


class Base(DeclarativeBase):
    pass


settings = get_settings()
engine = create_async_engine(settings.database_url, future=True)
SessionLocal = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


async def init_database() -> None:
    from . import models  # noqa: F401

    async with engine.begin() as connection:
        await connection.run_sync(Base.metadata.create_all)
        if connection.dialect.name == "sqlite":
            result = await connection.execute(text("PRAGMA table_info(users)"))
            columns = {row[1] for row in result.fetchall()}
            migrations = {
                "language": "ALTER TABLE users ADD COLUMN language VARCHAR(8) DEFAULT 'uk'",
                "theme": "ALTER TABLE users ADD COLUMN theme VARCHAR(16) DEFAULT 'system'",
                "opening_balance": "ALTER TABLE users ADD COLUMN opening_balance NUMERIC(16, 2) DEFAULT 0",
                "investment_capital": "ALTER TABLE users ADD COLUMN investment_capital NUMERIC(16, 2) DEFAULT 0",
            }
            for name, statement in migrations.items():
                if name not in columns:
                    await connection.execute(text(statement))


async def close_database() -> None:
    await engine.dispose()
