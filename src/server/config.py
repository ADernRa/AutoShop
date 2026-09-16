from pydantic_settings import BaseSettings, SettingsConfigDict

class Setting(BaseSettings):
    DATABASE_URL = ""
    PROJECT_NAME = "AutoShop"

    model_config = SettingsConfigDict(
        
    )

setting = Setting()