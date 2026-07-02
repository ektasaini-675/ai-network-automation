# AI-Powered Network Fault Prediction & Automation Platform

A working prototype built for the Airtel NOC internship project. Everything
here runs on simulated network data today, and is structured so you can
swap in real devices the moment you get access/credentials from your NOC
team — without rewriting anything.

---

## What's actually in this project

```
noc-ai-platform/
│
├── collector/
│   ├── snmp_collector.py     # Polls devices (real SNMP code + simulator)
│   └── run_collector.py      # Main script: registers devices, polls them, saves data
│
├── database/
│   └── db_manager.py         # SQLite storage (devices, metrics, anomalies, alerts, backups)
│
├── ml/
│   └── anomaly_detector.py   # Isolation Forest model — trains + detects faults
│
├── automation/
│   ├── automation_engine.py  # Config backup, threshold alerts, health reports
│   └── scheduler.py          # Runs everything automatically on a schedule
│
├── dashboard/
│   ├── app.py                 # Flask web server (the dashboard backend)
│   └── templates/index.html   # The dashboard UI (NOC-style dark theme)
│
├── data/                      # SQLite database lives here (auto-created)
├── backups/                   # Generated config backups land here
├── reports/                   # Generated HTML health reports land here
└── requirements.txt
```

---

## How to run it (step by step)

### 1. Install Python dependencies

Open a terminal in this folder and run:

```bash
pip install -r requirements.txt
```

If `pip` doesn't work, try `pip3 install -r requirements.txt`.

### 2. Collect some data first

Before the dashboard or ML has anything to show, you need data in the
database. Run:

```bash
python collector/run_collector.py
```

This will:
- Register 5 sample devices (2 routers, 2 switches, 1 firewall)
- Start polling them every 5 seconds with realistic simulated metrics
- Save everything into `data/noc_metrics.db`

**Let this run for at least 2-3 minutes** before stopping it (Ctrl+C), so
you have enough data points for the dashboard and ML model to be
meaningful. The longer you let it run, the better.

### 3. Train the ML model and test anomaly detection

```bash
python ml/anomaly_detector.py
```

This trains one Isolation Forest model per device using whatever data
you've collected so far, then immediately checks the most recent
readings and prints any anomalies it finds.

### 4. Run automation tasks (backup, alerts, report)

```bash
python automation/automation_engine.py
```

This will:
- Generate a simulated config backup file for every device (in `backups/`)
- Check the latest readings against alert thresholds
- Generate an HTML health report (in `reports/`) — open it in any browser

### 5. Launch the live dashboard

```bash
python dashboard/app.py
```

Then open your browser to: **http://127.0.0.1:5000**

You'll see:
- A summary bar (total devices, up/down count, anomalies, alerts)
- A live device table (click any row to see its graphs)
- CPU/Memory and Latency/Packet-loss charts
- A feed of AI-detected anomalies and alerts

The dashboard auto-refreshes every 5 seconds.

### 6. (Optional) Run everything automatically on a schedule

Instead of running steps 3 and 4 manually, you can run:

```bash
python automation/scheduler.py
```

This keeps running in the background and automatically re-runs anomaly
detection + threshold checks every minute, and backups + reports every
10 minutes — simulating what this would look like in 24/7 production.

**For a full demo**, run the collector (step 2) in one terminal, the
scheduler (step 6) in a second terminal, and the dashboard (step 5) in a
third terminal — all at the same time. Then open the dashboard in your
browser and watch it update live.

---

## How each piece maps to your problem statement

| Problem Statement Requirement | Where it's implemented |
|---|---|
| Collect real-time metrics via management protocols | `collector/snmp_collector.py` — real SNMP code included, using simulation today |
| Centralized historical database | `database/db_manager.py` — SQLite (swap for InfluxDB/PostgreSQL later) |
| Interactive dashboard | `dashboard/app.py` + `dashboard/templates/index.html` |
| Threshold-based alerts | `automation/automation_engine.py` → `run_threshold_check_all_devices()` |
| ML-based anomaly detection / fault prediction | `ml/anomaly_detector.py` — Isolation Forest |
| Automated config backups | `automation/automation_engine.py` → `run_backup_all_devices()` |
| Scheduled health reports | `automation/automation_engine.py` → `generate_health_report()` |
| Automation of routine NOC tasks | `automation/scheduler.py` |

---

## Switching from simulated data to real devices (when you get access)

1. In `collector/snmp_collector.py`, change:
   ```python
   SIMULATION_MODE = True
   ```
   to
   ```python
   SIMULATION_MODE = False
   ```

2. In `collector/run_collector.py`, update `DEVICE_INVENTORY` with real
   device IPs and SNMP community strings (ask your NOC mentor for these).

3. For config backups, edit `automation/automation_engine.py` and call
   `backup_device_config_real()` instead of the simulated version —
   you'll need SSH username/password for each device.

Everything else (database, dashboard, ML) stays exactly the same — that's
the whole point of separating these into modules.

---

## If something doesn't work

- **`ModuleNotFoundError`** → you forgot to run `pip install -r requirements.txt`
- **Dashboard shows "No devices registered"** → run `collector/run_collector.py` first
- **ML model says "need at least 30 readings"** → let the collector run longer
- **Port 5000 already in use** → close other programs using that port, or
  change `port=5000` to `port=5050` in `dashboard/app.py`

---

## Suggested order to present this to your manager

1. Show the **problem statement → solution mapping** table above
2. Run the **collector** live for 30 seconds, show data appearing in console
3. Run **anomaly_detector.py**, show it catching a simulated fault
4. Open the **dashboard** in a browser, walk through each panel
5. Open a generated **health report** HTML file
6. Explain the **3-week plan**: Week 1 = collector + DB (done), Week 2 =
   dashboard + alerts (done), Week 3 = ML + automation + polish (done in
   prototype form — production version uses real Airtel devices)
