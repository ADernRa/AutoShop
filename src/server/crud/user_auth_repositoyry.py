from fastapi import FastAPI, Depends, HTTPException, status, APIRouter
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete

from src.server.services import (security, auth)
from src.server.models.UserModel import User
from src.server.schemas.UserSchemas import (
    UserBase,
    UserCreate,
    UserResponse,
    Token
)

class UserAuth:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def user_login(self, form_data: UserBase):
        query = select(User).where(User.login == form_data.login)
        result = await self.db.execute(query)
        user = result.scalar_one_or_none()
        if not user or not security.verify_password(form_data.password, user.hashed_password):
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail={
                        "field": "login", 
                        "message": "Дані введені неправильно"},
                    headers={"WWW-Authenticate": "Bearer"},
                )
            
        access_token = security.create_access_token(data={"sub": user.login})
        return access_token, user

    async def user_register(self, user_data: UserCreate):
        query = select(User).where(User.login == user_data.login)
        result = await self.db.execute(query)
        user = result.scalar_one_or_none()
        if user:
            raise HTTPException(status_code=400,
                detail={
                    "field": "login", 
                    "message": "Користувач вже зареэстрованний"})
             
        hashed_pwd = security.get_password_hash(user_data.password)
             
        new_user = User(login=user_data.login, hashed_password=hashed_pwd)
        self.db.add(new_user)
        await self.db.commit()
        await self.db.refresh(new_user)
        return new_user
