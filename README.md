# NetVision AI

**AI-Powered Network Operations Center**

NetVision AI is a full-stack AI-powered Network Operations Center (NOC) developed using **React**, **FastAPI**, **SQLite**, and **Machine Learning**. The application provides real-time network monitoring, AI-driven device health prediction, intelligent alert generation, automation, and reporting through a modern web interface.

---

## Project Overview

Modern enterprise networks require continuous monitoring and proactive maintenance to ensure high availability and performance. NetVision AI addresses this challenge by integrating real-time telemetry simulation with a machine learning model to analyze network health and generate actionable recommendations.

The project demonstrates the integration of frontend development, backend APIs, database management, telemetry simulation, and machine learning into a single enterprise-style application.

---

## Features

- Device Management (CRUD Operations)
- Real-time Network Device Monitoring
- AI-Based Health Prediction using Random Forest
- Telemetry Simulation for Live Device Metrics
- Intelligent Alert Generation
- AI Recommendations
- Dashboard with Live Statistics
- Reports Generation
- Automation Module
- RESTful API Architecture
- Responsive User Interface

---

## Tech Stack

| Layer | Technology |
|--------|------------|
| Frontend | React, Vite, Tailwind CSS |
| Backend | FastAPI |
| Database | SQLite |
| Machine Learning | Scikit-learn (Random Forest) |
| Charts | Recharts |
| HTTP Client | Axios |
| Version Control | Git & GitHub |

---

## System Architecture

```
React Frontend
        │
        ▼
 FastAPI REST APIs
        │
        ▼
Telemetry Simulation Engine
        │
        ▼
Random Forest ML Model
        │
        ▼
SQLite Database
```

---

## Project Structure

```
ai-network-automation/
│
├── backend/
│   ├── database/
│   ├── ml/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   ├── main.py
│   └── seed_devices.py
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│
├── README.md
└── requirements.txt
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/ektasaini-675/ai-network-automation.git

cd ai-network-automation
```

### Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux / macOS
source venv/bin/activate

pip install -r requirements.txt

uvicorn main:app --reload
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/devices` | Retrieve all devices |
| POST | `/devices` | Add a new device |
| GET | `/monitoring` | Live monitoring metrics |
| GET | `/dashboard` | Dashboard statistics |
| GET | `/alerts` | Active alerts |
| GET | `/automation` | Automation details |
| POST | `/prediction` | AI health prediction |

---

## Machine Learning Workflow

```
Network Dataset
        │
        ▼
Data Preprocessing
        │
        ▼
Random Forest Model Training
        │
        ▼
Model Serialization (model.pkl)
        │
        ▼
Real-Time Health Prediction
        │
        ▼
Health Score, Risk Level & Recommendations
```

---

## Key Highlights

- Developed a full-stack AI-powered Network Operations Center.
- Implemented RESTful APIs using FastAPI.
- Integrated a Random Forest machine learning model for network health prediction.
- Designed a responsive dashboard using React and Tailwind CSS.
- Implemented telemetry simulation for realistic monitoring.
- Developed intelligent alerts and reporting modules.
- Applied modular architecture for scalability and maintainability.

---

## Future Enhancements

- SNMP-based Live Device Monitoring
- Docker Containerization
- Role-Based Authentication
- Cloud Deployment (AWS/Azure)
- Time-Series Database Integration
- Continuous Model Retraining
- Predictive Failure Analysis
- Real-Time WebSocket Updates

---

## Author

**Ekta**

B.Tech, Indian Institute of Technology (IIT) Jodhpur

---

## License

This project is intended for educational and academic purposes.