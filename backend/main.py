from fastapi import FastAPI
from routes.health import router as health_router
from routes.devices import router as device_router
from database.database import engine
from database.models import Base
from routes.monitoring import router as monitoring_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Network Automation API",
    version="1.0.0"
)

app.include_router(
    health_router,
    prefix="/health",
    tags=["Health"]
)

app.include_router(
    device_router,
    prefix="/devices",
    tags=["Devices"]
)

app.include_router(
    monitoring_router,
    prefix="/monitoring",
    tags=["Monitoring"]
)

@app.get("/")
def home():
    return {
        "message": "Welcome to AI Network Automation API"
    }