from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)
model = joblib.load("fraud_detection.pkl")  # Pre-trained ML model

@app.route("/detect", methods=["POST"])
def detect_fraud():
    data = request.json
    prediction = model.predict([data["features"]])
    return jsonify({"fraud": bool(prediction[0])})

if __name__ == "__main__":
    app.run(port=5000)
