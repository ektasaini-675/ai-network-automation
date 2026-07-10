from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import random

from database.dependencies import get_db
from database.models import DeviceDB

router = APIRouter()


def calculate_health(cpu, memory, latency, packet_loss):

    score = 100

    score -= cpu * 0.30
    score -= memory * 0.20
    score -= latency * 0.15
    score -= packet_loss * 8

    score = max(0, round(score, 1))

    if score >= 80:
        health = "Healthy"
        recommendation = "No action required."

    elif score >= 60:
        health = "Warning"
        recommendation = "Monitor CPU and Memory."

    elif score >= 40:
        health = "Critical"
        recommendation = "Restart network interface."

    else:
        health = "Failure Risk"
        recommendation = "Immediate maintenance required."

    return score, health, recommendation


@router.get("/")
def monitor_all_devices(db: Session = Depends(get_db)):

    devices = db.query(DeviceDB).all()

    monitoring_data = []

    for device in devices:

        cpu = round(random.uniform(5, 95), 2)
        memory = round(random.uniform(20, 90), 2)
        latency = round(random.uniform(1, 100), 2)
        packet_loss = round(random.uniform(0, 5), 2)

        health_score, health_status, recommendation = calculate_health(
            cpu,
            memory,
            latency,
            packet_loss,
        )

        monitoring_data.append({

            "id": device.id,
            "hostname": device.hostname,
            "ip_address": device.ip_address,
            "device_type": device.device_type,

            "cpu_usage": cpu,
            "memory_usage": memory,
            "latency": latency,
            "packet_loss": packet_loss,

            "health_score": health_score,
            "status": health_status,
            "recommendation": recommendation

        })

    return monitoring_data