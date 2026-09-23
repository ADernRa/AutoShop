from fastapi import Depends, HTTPException, status, APIRouter
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_

from src.server.models.ProductModel import Product
from src.server.database import get_db
from src.server.schemas.ProductSchemas import (
    ProductCreate,
    ProductUpdate,
    ProductSearch,
    ProductRespon
)
from src.server.crud.product_repository import ProductRepository

product_router = APIRouter(
    prefix="/api/search",
    tags=["search"]
)

# Пошук товарів
@product_router.post("/products", response_model=List[ProductRespon], summary="Отримати список товарів")
async def get_products(
    data_search: ProductSearch,
    db: AsyncSession = Depends(get_db)):
    repository = ProductRepository(db)
    products = await repository.search_products(data_search)
    return products

