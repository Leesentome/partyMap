// map.js

// Initialize the map centered on NYC (adjust to your city)
const map = L.map('map').setView([40.7128, -74.0060], 11);

// Load OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Party location marker
const partyLocation = [45.060524, 5.346462];
const partyMarker = L.marker(partyLocation).addTo(map);
partyMarker.bindPopup("<b>🎉 Party Location 🎉</b>").openPopup();

// People data
const people = [
  { name: "Alice", from: "", to: "", transport: "", color: "", coords: [45.7527, 5] },
  { name: "Bob", from: "", to: "", transport: "", color: "", coords: [45.6782, 5.5] },
  { name: "Charlie", from: "", to: "", transport: "", color: "", coords: [45.7122, 6] }
];

// Plot each person
people.forEach(person => {
  const marker = L.marker(person.coords).addTo(map);
  marker.bindPopup(`<b>${person.name}</b><br>Home Location`);

  // Line to party
  L.polyline([person.coords, partyLocation], {
    color: 'blue',
    weight: 2,
    dashArray: '4, 6'
  }).addTo(map);
});

const listContainer = document.getElementById("participant-list");
people.forEach(person => {
  const line = document.createElement("div");
  line.className = "participant";
  line.textContent = `${person.name} — [${person.coords[0].toFixed(4)}, ${person.coords[1].toFixed(4)}]`;
  listContainer.appendChild(line);
});

// Toggle panel open/closed
const calendar = document.getElementById("calendar");
const handle = document.getElementById("handle");

let opened = false;
handle.addEventListener("click", () => {
  opened = !opened
  if (opened) {
    handle.textContent = "▼ Participants"
  } else {
    handle.textContent = "▲ Participants"
  }
  calendar.classList.toggle("open");
});
