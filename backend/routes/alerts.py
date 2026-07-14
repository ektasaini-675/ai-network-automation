from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.dependencies import get_db
from database.models import DeviceDB
from services.telemetry import generate_metrics

router = APIRouter()


@router.get("/")
def get_alerts(db: Session = Depends(get_db)):

    devices = db.query(DeviceDB).all()

    alerts = []

    for device in devices:

        metrics = generate_metrics(device.id)

        cpu = metrics["cpu"]
        memory = metrics["memory"]
        latency = metrics["latency"]
        packet_loss = metrics["packet_loss"]

        if cpu >= 85:

            alerts.append({
                "device": device.hostname,
                "severity": "Critical",
                "message": "High CPU Usage",
                "value": f"{cpu}%"
            })

        if memory >= 85:

            alerts.append({
                "device": device.hostname,
                "severity": "Warning",
                "message": "High Memory Usage",
                "value": f"{memory}%"
            })

        if latency >= 80:

            alerts.append({
                "device": device.hostname,
                "severity": "Warning",
                "message": "High Latency",
                "value": f"{latency} ms"
            })

        if packet_loss >= 3:

            alerts.append({
                "device": device.hostname,
                "severity": "Critical",
                "message": "Packet Loss Detected",
                "value": f"{packet_loss}%"
            })

    return alerts