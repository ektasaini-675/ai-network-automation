from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.dependencies import get_db
from database.crud import (
    create_device,
    get_devices,
    get_device,
    update_device,
    delete_device,
)

from schemas.device import DeviceCreate, DeviceResponse

router = APIRouter()


@router.post("/", response_model=DeviceResponse)
def add_device(device: DeviceCreate, db: Session = Depends(get_db)):
    return create_device(db, device)


@router.get("/", response_model=list[DeviceResponse])
def list_devices(db: Session = Depends(get_db)):
    return get_devices(db)


@router.get("/{device_id}", response_model=DeviceResponse)
def single_device(device_id: int, db: Session = Depends(get_db)):
    device = get_device(db, device_id)

    if not device:
        raise HTTPException(status_code=404, detail="Device not found")

    return device

@router.put("/{device_id}", response_model=DeviceResponse)
def edit_device(
    device_id: int,
    device: DeviceCreate,
    db: Session = Depends(get_db),
):
    updated_device = update_device(db, device_id, device)

    if not updated_device:
        raise HTTPException(
            status_code=404,
            detail="Device not found",
        )

    return updated_device


@router.delete("/{device_id}")
def remove_device(device_id: int, db: Session = Depends(get_db)):
    delete_device(db, device_id)
    return {"message": "Device deleted"}