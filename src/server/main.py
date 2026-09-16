from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import setting

app = FastAPI(
    title = setting.PROJECT_NAME,
    version="1.0.0"
)

app.middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

