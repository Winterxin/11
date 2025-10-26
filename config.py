# backend/app/config.py
import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

# 以本文件为基准，定位到 backend 目录
BASE_DIR = Path(__file__).resolve().parent.parent      # .../backend
INSTANCE_DIR = BASE_DIR / "instance"
INSTANCE_DIR.mkdir(parents=True, exist_ok=True)        # 确保 instance 目录存在

def _db_url():
    # 1) 优先显式 DATABASE_URL
    db_url = (os.getenv("DATABASE_URL") or "").strip()
    if db_url:
        return db_url
    # 2) 兼容 MYSQL_URL
    mysql_url = (os.getenv("MYSQL_URL") or "").strip()
    if mysql_url:
        return mysql_url
    # 3) 默认用绝对路径的 SQLite（注意使用正斜杠，避免 Windows 反斜杠问题）
    sqlite_path = (INSTANCE_DIR / "dev.db").as_posix()
    return f"sqlite:///{sqlite_path}"   # 绝对路径形式：sqlite:////C:/...

class Config:
    SQLALCHEMY_DATABASE_URI = _db_url()
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET", "dev-secret")
    JSON_AS_ASCII = False
    # 关键：只从请求头取 Token，且不用 CSRF
    JWT_TOKEN_LOCATION = ["headers"]
    JWT_HEADER_NAME = "Authorization"
    JWT_HEADER_TYPE = "Bearer"
    JWT_COOKIE_CSRF_PROTECT = False
