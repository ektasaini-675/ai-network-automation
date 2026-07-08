from sqlalchemy import Column, Integer, String
from database.database import Base


class DeviceDB(Base):
    __tablename__ = "devices"

    id = Column(Integer, primary_key=True, index=True)
    hostname = Column(String, index=True)
    ip_address = Column(String, unique=True)
    device_type = Column(String)
    location = Column(String)
    status = Column(String)