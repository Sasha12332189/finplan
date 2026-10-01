from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    bot_token: str = ""
    public_app_url: str = ""
    finnhub_api_key: str = ""
    database_url: str = "sqlite+aiosqlite:///./finplan.db"
    debug: bool = False
    dev_telegram_user_id: int | None = None
    webapp_auth_max_age_seconds: int = 86_400


@lru_cache
def get_settings() -> Settings:
    return Settings()

