from fastapi import APIRouter
import random
from datetime import datetime

router = APIRouter()


def build_response(device_id: int, action: str):

    return {
        "device_id": device_id,
        "action": action,
        "status": "Success",
        "execution_time": round(random.uniform(0.2, 1.5), 2),
        "timestamp": datetime.now().strftime("%d-%m-%Y %H:%M:%S")
    }


@router.post("/ping/{device_id}")
def ping_device(device_id: int):

    response = build_response(device_id, "Ping Device")
    response["message"] = "Device is reachable."

    return response


@router.post("/restart/{device_id}")
def restart_device(device_id: int):

    response = build_response(device_id, "Restart Device")
    response["message"] = "Device restarted successfully."

    return response


@router.post("/backup/{device_id}")
def backup_device(device_id: int):

    response = build_response(device_id, "Backup Configuration")
    response["message"] = "Configuration backup completed."

    return response


@router.post("/diagnostics/{device_id}")
def diagnostics(device_id: int):

    response = build_response(device_id, "Run Diagnostics")
    response["message"] = "No hardware or network issues detected."

    return response