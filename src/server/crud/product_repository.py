from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_

from src.server.models.ProductModel import Product
from src.server.schemas.ProductSchemas import (
    ProductCreate,
    ProductUpdate,
    ProductSearch,
    ProductRespon
)


class ProductRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def search_products(self, data_search: ProductSearch):
        if data_search.category == "all":
            query = select(Product).where(
                and_(Product.price >= data_search.min_price, Product.price <= data_search.max_price),
                Product.promotion == data_search.promotion,
                Product.count > 0
                )
        else:
            query = select(Product).where(
                Product.category == data_search.category,
                and_(Product.price >= data_search.min_price, Product.price <= data_search.max_price),
                Product.promotion == data_search.promotion,
                Product.count > 0
            )
        result = await self.db.execute(query)
        return result.scalars().all()