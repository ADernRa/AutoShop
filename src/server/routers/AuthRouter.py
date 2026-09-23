from fastapi import FastAPI, Depends, HTTPException, status, APIRouter
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete

from src.server.models.UserModel import User
from src.server.schemas.UserSchemas import (UserCreate, UserResponse, Token, UserBase) 
from src.server.services import (security, auth)
from src.server.database import engine, get_db
from src.server.crud.user_auth_repositoyry import UserAuth

auth_router = APIRouter(
    prefix="/api/auth", 
    tags=["auth"]
    )

@auth_router.post("/register", response_model=UserResponse, summary="Реєстрація")
async def register(
    user_data: UserCreate, 
    db: AsyncSession = Depends(get_db)):

    repository = UserAuth(db)
    new_user = await repository.user_register(user_data)
    return new_user

@auth_router.post("/login", response_model=Token, summary="Авторизація")
async def login(
    form_data: UserBase, 
    db: AsyncSession = Depends(get_db)):

    repository = UserAuth(db)
    access_token, user = await repository.user_login(form_data)
    return {"access_token": access_token, "token_type": "bearer", "user": user}
