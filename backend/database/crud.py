from sqlalchemy.orm import Session
from database.models import DeviceDB
from schemas.device import DeviceCreate

def create_device(db: Session, device: DeviceCreate):
    db_device = DeviceDB(**device.model_dump())
    db.add(db_device)
    db.commit()
    db.refresh(db_device)
    return db_device

def get_devices(db: Session):
    return db.query(DeviceDB).all()

def get_device(db: Session, device_id: int):
    return db.query(DeviceDB).filter(DeviceDB.id == device_id).first()

def delete_device(db: Session, device_id: int):
    device = db.query(DeviceDB).filter(DeviceDB.id == device_id).first()
    if device:
        db.delete(device)
        db.commit()