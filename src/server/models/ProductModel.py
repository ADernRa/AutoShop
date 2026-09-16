from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, String, Boolean

from src.server.models import BaseModel

class Product(BaseModel.Base):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(primary_key="True", autoincrement=True)
    price: Mapped[int] = mapped_column(Integer, nullable=False)
    count: Mapped[int] = mapped_column(Integer, default=0)
    title: Mapped[str] = mapped_column(String(100), nullable=False)
    category: Mapped[str] = mapped_column(String(100), nullable=False)
    promotion: Mapped[bool] = mapped_column(Boolean, default=False)