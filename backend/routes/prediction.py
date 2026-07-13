from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from schemas.device import PredictionRequest
from ml.predictor import predict_device

router = APIRouter()


# Existing endpoint (keep this for Swagger/manual testing)
@router.post("/")
def predict(request: PredictionRequest):

    return predict_device(
        cpu_usage=request.cpu_usage,
        memory_usage=request.memory_usage,
        latency=request.latency,
        packet_loss=request.packet_loss,
        bandwidth=request.bandwidth,
        device_type=request.device_type,
        location=request.location,
    )


# Optional quick prediction endpoint
class QuickPredictionRequest(BaseModel):
    cpu_usage: float
    memory_usage: float
    latency: float
    packet_loss: float


@router.post("/quick")
def quick_predict(request: QuickPredictionRequest):

    return predict_device(
        cpu_usage=request.cpu_usage,
        memory_usage=request.memory_usage,
        latency=request.latency,
        packet_loss=request.packet_loss,
        bandwidth=70,
        device_type="Router",
        location="HQ",
    )