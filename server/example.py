import requests
import random
import time

url = "http://127.0.0.1:5000/data"

while True:
    lat = round(random.uniform(42.25, 42.38), 4)
    lon = round(random.uniform(69.50, 69.67), 4)

    value = random.randint(100, 500)

    requests.post(url, json={
    "lat": lat,
    "lon": lon,
    "value": value
})

    time.sleep(0.2)