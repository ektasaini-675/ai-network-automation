import random

device_state = {}


def generate_metrics(device_id):
    if device_id not in device_state:

        device_state[device_id] = {
            "cpu": random.uniform(30, 70),
            "memory": random.uniform(35, 75),
            "latency": random.uniform(10, 40),
            "packet_loss": random.uniform(0, 1),
            "bandwidth": random.uniform(60, 95),
        }

    state = device_state[device_id]

    state["cpu"] = max(
        5,
        min(95, state["cpu"] + random.uniform(-3, 3)),
    )

    state["memory"] = max(
        10,
        min(95, state["memory"] + random.uniform(-2, 2)),
    )

    state["latency"] = max(
        1,
        min(120, state["latency"] + random.uniform(-5, 5)),
    )

    state["packet_loss"] = max(
        0,
        min(5, state["packet_loss"] + random.uniform(-0.3, 0.3)),
    )

    state["bandwidth"] = max(
        20,
        min(100, state["bandwidth"] + random.uniform(-2, 2)),
    )

    return {
        "cpu": round(state["cpu"], 2),
        "memory": round(state["memory"], 2),
        "latency": round(state["latency"], 2),
        "packet_loss": round(state["packet_loss"], 2),
        "bandwidth": round(state["bandwidth"], 2),
    }