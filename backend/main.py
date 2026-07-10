from fastapi import FastAPI
from routes.health import router as health_router
from routes.devices import router as device_router
from database.database import engine
from database.models import Base
from routes.monitoring import router as monitoring_router
from fastapi.middleware.cors import CORSMiddleware
from routes.dashboard import router as dashboard_router
from routes.alerts import router as alerts_router
from routes.automation import router as automation_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Network Automation API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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

app.include_router(
    dashboard_router,
    prefix="/dashboard",
    tags=["Dashboard"]
)

app.include_router(
    alerts_router,
    prefix="/alerts",
    tags=["Alerts"]
)

app.include_router(
    automation_router,
    prefix="/automation",
    tags=["Automation"]
)

@app.get("/")
def home():
    return {
        "message": "Welcome to AI Network Automation API"
    }