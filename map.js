// Initialize the map
const map = L.map('map').setView([45.560524, 5.346462], 8)

// Load OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map)

const ColorIcon =  L.Icon.extend({
    options: {
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        iconSize: [25, 41],
        shadowSize: [41, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
 }
})
const redIcon = new ColorIcon({iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png'})
const blueIcon = new ColorIcon({iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png'})
const greenIcon = new ColorIcon({iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png'})

// Party location marker
const partyLocation = [45.060524, 5.346462]
const partyMarker = L.marker(partyLocation, {icon: redIcon}).addTo(map)
partyMarker.bindPopup("<b>🎉 Party Location 🎉</b>").openPopup()


// People data
const people = [
  { name: "Adèle"    , path: null },
  { name: "Berenice" , path: null },
  { name: "Chloé"    , path: null },
  { name: "Caro"     , path: null },
  { name: "Corentin" , path: null },
  { name: "Dorian"   , path: null },
  { name: "Ekewoli"  , path: null },
  { name: "Felix"    , path: [{transport: 'voiture', with: [], startDate: new Date("2025-09-12,17:30"), endDate: new Date("2025-09-12,19:30"), fromCoord: [46.060524, 5.346462], toCoord: partyLocation}] },
  { name: "Florian"  , path: null },
  { name: "Gabrielle", path: null },
  { name: "Hugo"     , path: null },
  { name: "Jana"     , path: null },
  { name: "Joachim"  , path: null },
  { name: "Maéva"    , path: null },
  { name: "Mel"      , path: null },
  { name: "Théo"     , path: null },
  { name: "Yann"     , path: null }
]

// Plot each person
people.forEach(person => {
  if (person.path != null) {
    person.path.forEach(node => {
      const color = node.transport === 'voiture' ? 'blue' : 'green'
      const icon = node.transport === 'voiture' ? blueIcon : greenIcon
      const marker = L.marker(node.fromCoord, {icon: icon}).addTo(map)
      marker.bindPopup(`<b>${person.name}</b><br>${node.startDate.toLocaleDateString()} ${node.startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}<br>${node.transport}`)


      L.polyline([node.fromCoord, node.toCoord], {
        color: color,
        weight: 2,
        dashArray: '4, 6'
      }).addTo(map)
    })
    
  }
})

const template = document.getElementById("person-template")
const listContainer = document.getElementById("participant-list")
people.forEach(person => {
  const clone = template.content.cloneNode(true)
  clone.querySelector(".name").textContent = person.name
  if (person.path != null) {
    const pathContainer = clone.querySelector(".path-container")
    person.path.forEach(node => {
      const start = new Date("2025-09-12,12:00")
      const end = new Date("2025-09-15,00:00")

      const div = document.createElement("div")
      div.className = 'event'
      const color = node.transport === 'voiture' ? 'blue' : 'green'

      div.style.left = `${Math.max(0, 100 * (node.startDate.valueOf() - start.valueOf()) / (end.valueOf() - start.valueOf()))}%`
      div.style.right = `${Math.max(0, 100 - 100 * (node.endDate.valueOf() - start.valueOf()) / (end.valueOf() - start.valueOf()))}%`

      div.style.backgroundColor = color
      
      const tooltip = document.createElement('span')
      tooltip.className = 'tooltip'
      tooltip.innerHTML = `${node.transport}<br>${node.startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${node.endDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
      div.appendChild(tooltip)

      pathContainer.appendChild(div)
    })
  }
  listContainer.appendChild(clone)
})

// Toggle panel open/closed
const calendar = document.getElementById("calendar")
const handle = document.getElementById("handle")

let opened = false
handle.addEventListener("click", () => {
  opened = !opened
  if (opened) {
    handle.textContent = "▼ Participants"
  } else {
    handle.textContent = "▲ Participants"
  }
  calendar.classList.toggle("open")
})
