import joblib
import pandas as pd

from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    classification_report,
)
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder

# Load dataset
df = pd.read_csv("ml/telemetry_dataset.csv")

# Features
X = df.drop("health_status", axis=1)

# Target
y = df["health_status"]

# Categorical columns
categorical_features = [
    "device_type",
    "location",
]

# Numerical columns
numerical_features = [
    "cpu_usage",
    "memory_usage",
    "latency",
    "packet_loss",
    "bandwidth",
]

# Preprocessing
preprocessor = ColumnTransformer(
    transformers=[
        (
            "cat",
            OneHotEncoder(handle_unknown="ignore"),
            categorical_features,
        ),
        (
            "num",
            "passthrough",
            numerical_features,
        ),
    ]
)

# Random Forest Pipeline
model = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        (
            "classifier",
            RandomForestClassifier(
                n_estimators=200,
                random_state=42,
            ),
        ),
    ]
)

# Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
)

# Train
model.fit(X_train, y_train)

# Predict
predictions = model.predict(X_test)

# Accuracy
accuracy = accuracy_score(
    y_test,
    predictions,
)

print("\n==============================")
print("MODEL TRAINED SUCCESSFULLY")
print("==============================")

print(f"\nAccuracy : {accuracy * 100:.2f}%")

print("\nClassification Report:\n")

print(
    classification_report(
        y_test,
        predictions,
    )
)

# Save model
joblib.dump(
    model,
    "ml/model.pkl",
)

print("\nModel saved as ml/model.pkl")