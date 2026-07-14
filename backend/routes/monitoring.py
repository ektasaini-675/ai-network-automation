from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.dependencies import get_db
from database.models import DeviceDB
from ml.predictor import predict_device
from services.telemetry import generate_metrics

router = APIRouter()


@router.get("/")
def monitor_all_devices(db: Session = Depends(get_db)):

    devices = db.query(DeviceDB).all()

    monitoring_data = []

    for device in devices:

        metrics = generate_metrics(device.id)

        prediction = predict_device(
            cpu_usage=metrics["cpu"],
            memory_usage=metrics["memory"],
            latency=metrics["latency"],
            packet_loss=metrics["packet_loss"],
            bandwidth=metrics["bandwidth"],
            device_type=device.device_type,
            location=device.location,
        )

        monitoring_data.append({

            "id": device.id,

            "hostname": device.hostname,

            "ip_address": device.ip_address,

            "device_type": device.device_type,

            "location": device.location,

            "cpu_usage": metrics["cpu"],

            "memory_usage": metrics["memory"],

            "latency": metrics["latency"],

            "packet_loss": metrics["packet_loss"],

            "bandwidth": metrics["bandwidth"],

            "health_score": prediction["health_score"],

            "status": prediction["prediction"],

            "risk": prediction["risk"],

            "confidence": prediction["confidence"],

            "recommendation": prediction["recommendation"]

        })

    return monitoring_data