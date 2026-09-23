from pydantic_settings import BaseSettings, SettingsConfigDict

class Setting(BaseSettings):
    DATABASE_URL: str
    PROJECT_NAME: str = "AutoShop"
    SECRET_KEY: str
    ALGORITHM: str
    DEBUG: bool

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
    )

settings = Setting()