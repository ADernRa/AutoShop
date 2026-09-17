from fastapi import Depends, HTTPException, status, APIRouter
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_

from src.server.models.ProductModel import Product
from src.server.database import get_db

api_router = APIRouter(
    prefix="/api/search",
    tags="search"
)

from src.server.schemas.ProductSchemas import (
    ProductCreate,
    ProductUpdate,
    ProductSearch,
    ProductRespon
)

# Пошук товарів
@api_router.get("/products", response_model=List[ProductRespon])
async def get_products(
    data_search: ProductSearch,
    db: AsyncSession = Depends(get_db)):

    query = select(Product).where(
        Product.category == data_search.category,
        and_(Product.price >= data_search.min_price, Product.price <= data_search.max_price),
        Product.promotion == data_search.promotion
    )

    result = await db.execute(query)
    products = result.scalars().all()
    print(products)
    return products


