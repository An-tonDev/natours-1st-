/* eslint-disable */
const locations = JSON.parse(document.getElementById('map').dataset);
const map = L.map('map').setView([6.5244, 3.3792], 13); // Lagos

  // Add OpenStreetMap tile layer (free and public)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Add a marker with a popup
  L.marker([6.5244, 3.3792])
    .addTo(map)
    .bindPopup('📍 Hello from Lagos!')
    .openPopup();