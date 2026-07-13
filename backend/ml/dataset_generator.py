import random
import pandas as pd

NUM_ROWS = 1500

device_types = [
    "Router",
    "Switch",
    "Firewall"
]

locations = [
    "HQ",
    "Datacenter",
    "Branch Office"
]

dataset = []

for _ in range(NUM_ROWS):

    cpu = random.randint(5, 98)

    memory = random.randint(10, 95)

    latency = random.randint(1, 120)

    packet_loss = round(random.uniform(0, 5), 2)

    bandwidth = random.randint(10, 100)

    device_type = random.choice(device_types)

    location = random.choice(locations)

    # AI Label Logic

    if (
        cpu > 85
        or memory > 90
        or latency > 90
        or packet_loss > 3
    ):

        health_status = "Critical"

    elif (
        cpu > 65
        or memory > 70
        or latency > 60
        or packet_loss > 1
    ):

        health_status = "Warning"

    else:

        health_status = "Healthy"

    dataset.append({

        "cpu_usage": cpu,

        "memory_usage": memory,

        "latency": latency,

        "packet_loss": packet_loss,

        "bandwidth": bandwidth,

        "device_type": device_type,

        "location": location,

        "health_status": health_status

    })

df = pd.DataFrame(dataset)

df.to_csv(
    "ml/telemetry_dataset.csv",
    index=False
)

print("Dataset generated successfully!")

print(df.head())