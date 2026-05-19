var map = L.map('map').setView([42.31, 69.58], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: ''
}).addTo(map);

let markers = {};
let auto = true;
let interval;

function color(value) {
  if (value < 200) return "#9ca3af";
  if (value < 300) return "#6b7280";
  if (value < 400) return "#374151";
  return "#111827";
}

function load() {
  fetch("http://127.0.0.1:5000/points")
    .then(r => r.json())
    .then(data => {

      const seen = new Set();

      data.forEach(p => {
        const id = p.location;
        seen.add(id);

        if (markers[id]) {
          map.removeLayer(markers[id]);
        }

        const size = 0.005;

        const bounds = [
          [p.lat - size, p.lon - size],
          [p.lat + size, p.lon + size]
        ];

        markers[id] = L.rectangle(bounds, {
          color: color(p.value),
          fillColor: color(p.value),
          fillOpacity: 0.25,
          weight: 0.1
        }).addTo(map);
      });

      for (let id in markers) {
        if (!seen.has(id)) {
          map.removeLayer(markers[id]);
          delete markers[id];
        }
      }
    });
}

function toggle() {
  auto = !auto;

  const btn = document.getElementById("toggleBtn");
  btn.innerText = auto ? "Auto ON" : "Auto OFF";

  if (auto) {
    interval = setInterval(load, 3000);
  } else {
    clearInterval(interval);
  }
}

load();
interval = setInterval(load, 3000);