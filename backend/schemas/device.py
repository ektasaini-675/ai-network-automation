from pydantic import BaseModel


# -----------------------------
# Device Schemas
# -----------------------------

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
        from_attributes = True


# -----------------------------
# AI Prediction Schema
# -----------------------------

class PredictionRequest(BaseModel):
    cpu_usage: float
    memory_usage: float
    latency: float
    packet_loss: float
    bandwidth: float
    device_type: str
    location: str