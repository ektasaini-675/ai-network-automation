from database.database import SessionLocal
from database.models import DeviceDB

db = SessionLocal()

devices = [
    ("Core-Router-Delhi", "10.0.0.1", "Router", "Delhi", "Online"),
    ("Edge-Router-Mumbai", "10.0.0.2", "Router", "Mumbai", "Online"),
    ("Core-Switch-Bengaluru", "10.0.0.3", "Switch", "Bengaluru", "Online"),
    ("Firewall-Chennai", "10.0.0.4", "Firewall", "Chennai", "Online"),
    ("Access-Switch-Pune", "10.0.0.5", "Switch", "Pune", "Online"),
    ("Core-Router-Hyderabad", "10.0.0.6", "Router", "Hyderabad", "Online"),
    ("Firewall-Kolkata", "10.0.0.7", "Firewall", "Kolkata", "Offline"),
    ("Distribution-Switch-Noida", "10.0.0.8", "Switch", "Noida", "Online"),
    ("Edge-Router-Jaipur", "10.0.0.9", "Router", "Jaipur", "Online"),
    ("Firewall-Ahmedabad", "10.0.0.10", "Firewall", "Ahmedabad", "Online"),
    ("Access-Switch-Lucknow", "10.0.0.11", "Switch", "Lucknow", "Online"),
    ("Core-Router-Indore", "10.0.0.12", "Router", "Indore", "Online"),
    ("Edge-Router-Bhopal", "10.0.0.13", "Router", "Bhopal", "Offline"),
    ("Firewall-Nagpur", "10.0.0.14", "Firewall", "Nagpur", "Online"),
    ("Core-Switch-Kochi", "10.0.0.15", "Switch", "Kochi", "Online"),
    ("Router-Chandigarh", "10.0.0.16", "Router", "Chandigarh", "Online"),
    ("Firewall-Surat", "10.0.0.17", "Firewall", "Surat", "Online"),
    ("Distribution-Switch-Goa", "10.0.0.18", "Switch", "Goa", "Online"),
    ("Core-Router-Patna", "10.0.0.19", "Router", "Patna", "Offline"),
    ("Edge-Router-Vizag", "10.0.0.20", "Router", "Visakhapatnam", "Online"),
]

added = 0

for hostname, ip, dtype, location, status in devices:

    exists = db.query(DeviceDB).filter(
        DeviceDB.ip_address == ip
    ).first()

    if not exists:
        db.add(
            DeviceDB(
                hostname=hostname,
                ip_address=ip,
                device_type=dtype,
                location=location,
                status=status,
            )
        )
        added += 1

db.commit()
db.close()

print(f"✅ {added} devices added successfully.")