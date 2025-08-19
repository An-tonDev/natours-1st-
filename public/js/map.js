/* eslint-disable */
// public/js/map.js
const displayMap = (locations) => {
  const map = L.map('map', { scrollWheelZoom: false });

  // Set tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const points = [];

  locations.forEach(loc => {
    const [lng, lat] = loc.coordinates;
    points.push([lat, lng]);

    L.marker([lat, lng])
      .addTo(map)
      .bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`);
  });

  if (points.length) {
    const bounds = L.latLngBounds(points);
    map.fitBounds(bounds, { padding: [50, 50] });
  }
};
