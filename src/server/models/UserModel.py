from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String

from src.server.models import BaseModel

class User(BaseModel.Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    login: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String, nullable=False)
    role: Mapped[str] = mapped_column(String, default="user")
