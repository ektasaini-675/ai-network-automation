from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.dependencies import get_db
from database.models import DeviceDB
import random

router = APIRouter()


@router.get("/")
def get_alerts(db: Session = Depends(get_db)):

    devices = db.query(DeviceDB).all()

    alerts = []

    for device in devices:

        cpu = random.randint(10, 95)
        memory = random.randint(20, 90)
        latency = random.randint(5, 100)

        if cpu > 80:

            alerts.append({
                "device": device.hostname,
                "severity": "Critical",
                "message": "High CPU Usage",
                "value": f"{cpu}%"
            })

        elif memory > 80:

            alerts.append({
                "device": device.hostname,
                "severity": "Warning",
                "message": "High Memory Usage",
                "value": f"{memory}%"
            })

        elif latency > 70:

            alerts.append({
                "device": device.hostname,
                "severity": "Warning",
                "message": "High Latency",
                "value": f"{latency} ms"
            })

    return alerts