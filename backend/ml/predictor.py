import joblib
import pandas as pd

# Load trained model once when the application starts
model = joblib.load("ml/model.pkl")


def predict_device(
    cpu_usage,
    memory_usage,
    latency,
    packet_loss,
    bandwidth,
    device_type,
    location,
):
    """
    Predict network device health.
    """

    sample = pd.DataFrame(
        [
            {
                "cpu_usage": cpu_usage,
                "memory_usage": memory_usage,
                "latency": latency,
                "packet_loss": packet_loss,
                "bandwidth": bandwidth,
                "device_type": device_type,
                "location": location,
            }
        ]
    )

    prediction = model.predict(sample)[0]

    probabilities = model.predict_proba(sample)[0]

    confidence = round(max(probabilities) * 100, 2)

    if prediction == "Healthy":
        health_score = max(
            90,
            round(
                100
                - (
                    cpu_usage * 0.15
                    + memory_usage * 0.10
                    + latency * 0.05
                    + packet_loss * 2
                )
            ),
        )

        risk = "Low"

        recommendation = (
            "No action required. Device is operating normally."
        )

    elif prediction == "Warning":

        health_score = 75
        
        risk = "Medium"

        recommendation = (
            "Monitor the device and investigate increasing resource usage."
        )

    else:

        health_score = 45

        risk = "High"

        recommendation = (
            "Immediate attention required. Consider diagnostics or restart."
        )

    return {
        "prediction": prediction,
        "health_score": health_score,
        "risk": risk,
        "confidence": confidence,
        "recommendation": recommendation,
    }