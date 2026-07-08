from fastapi import APIRouter
import random

router = APIRouter()

@router.get("/{device_id}")
def monitor_device(device_id: int):

    cpu = round(random.uniform(5, 95), 2)
    memory = round(random.uniform(20, 90), 2)
    latency = round(random.uniform(1, 100), 2)
    packet_loss = round(random.uniform(0, 5), 2)

    status = "Healthy"

    if cpu > 80:
        status = "High CPU"

    elif packet_loss > 2:
        status = "Packet Loss"

    elif latency > 70:
        status = "High Latency"

    return {
        "device_id": device_id,
        "cpu_usage": cpu,
        "memory_usage": memory,
        "latency": latency,
        "packet_loss": packet_loss,
        "status": status
    }