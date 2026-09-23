from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.server.routers.AuthRouter import auth_router
from src.server.routers.ProductRouter import product_router
from src.server.config import settings

app = FastAPI(
    title = settings.PROJECT_NAME,
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(product_router)
app.include_router(auth_router)
