from pydantic import BaseModel

class DeviceBase(BaseModel):
    hostname: str
    ip_address: str
    device_type: str
    location: str
    status: str

class DeviceCreate(DeviceBase):
    pass

class DeviceResponse(DeviceBase):
    id: int

    class Config:
        from_attributes = True   # Pydantic v2