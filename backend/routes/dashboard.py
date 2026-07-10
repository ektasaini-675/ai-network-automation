from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import random

from database.dependencies import get_db
from database.models import DeviceDB

router = APIRouter()


@router.get("/")
def dashboard_stats(db: Session = Depends(get_db)):

    devices = db.query(DeviceDB).all()

    total_devices = len(devices)

    online_devices = len(
        [d for d in devices if d.status == "Online"]
    )

    offline_devices = total_devices - online_devices

    cpu_values = [
        random.uniform(20, 90)
        for _ in devices
    ]

    memory_values = [
        random.uniform(30, 85)
        for _ in devices
    ]

    alerts = len(
        [cpu for cpu in cpu_values if cpu > 80]
    )

    return {

        "total_devices": total_devices,

        "online_devices": online_devices,

        "offline_devices": offline_devices,

        "average_cpu": round(
            sum(cpu_values) / total_devices,
            1
        ) if total_devices else 0,

        "average_memory": round(
            sum(memory_values) / total_devices,
            1
        ) if total_devices else 0,

        "alerts": alerts

    }