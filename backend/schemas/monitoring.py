from pydantic import BaseModel

class DeviceMetrics(BaseModel):
    device_id: int
    cpu_usage: float
    memory_usage: float
    latency: float
    packet_loss: float
    status: str