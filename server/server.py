from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask("blabla")
CORS(app)

data = {}


LAT_MIN = 42.25
LAT_MAX = 42.38
LON_MIN = 69.50
LON_MAX = 69.67

STEP = 0.01

def make_grid():
    grid = []
    lat = LAT_MIN
    while lat <= LAT_MAX:
        lon = LON_MIN
        while lon <= LON_MAX:
            key = f"{round(lat,4)}_{round(lon,4)}"
            grid.append({"key": key, "lat": lat, "lon": lon})
            lon += STEP
            lat += STEP
    return grid

GRID = make_grid()

@app.route("/data", methods=["POST"])
def receive():
    item = request.json


    lat = round(item["lat"], 2)
    lon = round(item["lon"], 2)
    key = f"{lat}_{lon}"

    data[key] = {
    "lat": lat,
    "lon": lon,
    "value": item["value"],
    "location": key
}

    return {"status": "ok"}

@app.route("/points")
def points():
    return jsonify(list(data.values()))

app.run(host="0.0.0.0", port=5000)