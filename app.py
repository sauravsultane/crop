from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib, numpy as np, pandas as pd

app = Flask(__name__)
CORS(app)

model = joblib.load("model/crop_model.pkl")
le    = joblib.load("model/label_encoder.pkl")

@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "running"})

@app.route("/predict", methods=["POST"])
def predict():
    try:
        d = request.json
        df = pd.DataFrame([[d["N"],d["P"],d["K"],d["temperature"],
                            d["humidity"],d["ph"],d["rainfall"]]],
                           columns=["N","P","K","temperature","humidity","ph","rainfall"])
        pred  = model.predict(df)[0]
        proba = model.predict_proba(df)[0]
        top3  = [{"crop": le.classes_[i], "confidence": round(float(proba[i])*100,1)}
                  for i in np.argsort(proba)[::-1][:3]]
        return jsonify({
            "recommended_crop": le.inverse_transform([pred])[0],
            "confidence": round(float(max(proba))*100,1),
            "top_3": top3
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True, port=5000)
