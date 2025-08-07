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

// People data
const people = [
  { name: "Adèle"    , goPath: null, backPath: null },
  { name: "Berenice" , goPath: null, backPath: null },
  { name: "Chloé"    , goPath: null, backPath: null },
  { name: "Caro"     , goPath: [
    {transport: 'voiture', with: [], startDate: new Date("2025-09-12,12:00"), endDate: new Date("2025-09-12,13:30"), fromCoord: [45.583909, 5.908755], toCoord: partyLocation}
  ], backPath: [
    {transport: 'voiture', with: [], startDate: new Date("2025-09-14,19:00"), endDate: new Date("2025-09-14,20:30"), fromCoord: partyLocation, toCoord: [45.583909, 5.908755]}
  ]},
  { name: "Corentin" , goPath: null, backPath: null },
  { name: "Dorian"   , goPath: null, backPath: null },
  { name: "Ekewoli"  , goPath: null, backPath: null },
  { name: "Felix"    , goPath: null, backPath: null },
  { name: "Florian"  , goPath: null, backPath: null },
  { name: "Gabrielle", goPath: null, backPath: null },
  { name: "Hugo"     , goPath: null, backPath: null },
  { name: "Jana"     , goPath: null, backPath: null },
  { name: "Joachim"  , goPath: [
    {transport: 'stop', with: [], startDate: new Date("2025-09-12,15:00"), endDate: new Date("2025-09-12,19:00"), fromCoord: [43.582633, 7.118057], toCoord: partyLocation}
  ], backPath: null },
  { name: "Maéva"    , goPath: [
    {transport: 'voiture', with: [], startDate: new Date("2025-09-12,18:00"), endDate: new Date("2025-09-13,02:00"), fromCoord: [50.6016089, 3.080874], toCoord: partyLocation}
  ], backPath: [
    {transport: 'voiture', with: [], startDate: new Date("2025-09-14,16:00"), endDate: new Date("2025-09-15,00:00"), fromCoord: partyLocation, toCoord: [50.6016089, 3.080874]}
  ] },
  { name: "Mel"      , goPath: null, backPath: null },
  { name: "Théo"     , goPath: [
    {transport: 'voiture', with: [], startDate: new Date("2025-09-12,12:00"), endDate: new Date("2025-09-12,13:30"), fromCoord: [45.583909, 5.908755], toCoord: partyLocation}
  ], backPath: [
    {transport: 'voiture', with: [], startDate: new Date("2025-09-14,19:00"), endDate: new Date("2025-09-14,20:30"), fromCoord: partyLocation, toCoord: [45.583909, 5.908755]}
  ]},
  { name: "Yann"     , goPath: [
    {transport: 'stop', with: [], startDate: new Date("2025-09-12,15:00"), endDate: new Date("2025-09-12,19:00"), fromCoord: [43.582633, 7.118057], toCoord: partyLocation}
  ], backPath: null }
]

const pathLayer = L.layerGroup().addTo(map)

function goPath() {
  pathLayer.clearLayers()

  const partyMarker = L.marker(partyLocation, {icon: redIcon})
  partyMarker.bindPopup("<b>🎉 Party Location 🎉</b>").openPopup()
  pathLayer.addLayer(partyMarker)

  // Plot each person
  people.forEach(person => {
    if (person.goPath != null) {
      person.goPath.forEach(node => {
        const color = (node.transport === 'voiture') ? 'blue' : 'green'
        const icon = node.transport === 'voiture' ? blueIcon : greenIcon
        const marker = L.marker(node.fromCoord, {icon: icon})
        marker.bindPopup(`<b>${person.name}</b><br>${node.startDate.toLocaleDateString()} ${node.startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}<br>${node.transport}`)
        pathLayer.addLayer(marker)
  
        const polyline = L.polyline([node.fromCoord, node.toCoord], {
          color: color,
          weight: 2,
          dashArray: '4, 6'
        })
        pathLayer.addLayer(polyline)
      })
      
    }
  })
}

function backPath() {
  pathLayer.clearLayers()

  const partyMarker = L.marker(partyLocation, {icon: redIcon})
  partyMarker.bindPopup("<b>🎉 Party Location 🎉</b>").openPopup()
  pathLayer.addLayer(partyMarker)

  // Plot each person
  people.forEach(person => {
    if (person.backPath != null) {
      person.backPath.forEach(node => {
        const color = (node.transport === 'voiture') ? 'blue' : 'green'
        const icon = node.transport === 'voiture' ? blueIcon : greenIcon
        const marker = L.marker(node.toCoord, {icon: icon})
        marker.bindPopup(`<b>${person.name}</b><br>${node.startDate.toLocaleDateString()} ${node.startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}<br>${node.transport}`)
        pathLayer.addLayer(marker)

        const polyline = L.polyline([node.fromCoord, node.toCoord], {
          color: color,
          weight: 2,
          dashArray: '4, 6'
        })
        pathLayer.addLayer(polyline)
      })
      
    }
  })
}

let state = 'go'
goPath()

const container = document.getElementById('go-back')
const buttons = container.querySelectorAll('.button')
const slider = container.querySelector('.slider')
let selectedIndex = 0

container.addEventListener('click', () => {
  buttons.forEach(btn => btn.classList.toggle('selected'))
  selectedIndex = selectedIndex === 0 ? 1 : 0
  slider.style.top = selectedIndex === 0 ? '0%' : '50%'
  state = state === 'go' ? 'back' : 'go'
  if (state === 'go') {
    goPath()
  } else {
    backPath()
  }
})

const template = document.getElementById("person-template")
const listContainer = document.getElementById("participant-list")
people.forEach(person => {
  const clone = template.content.cloneNode(true)
  clone.querySelector(".name").textContent = person.name
  const pathContainer = clone.querySelector(".path-container")
  if (person.goPath != null) {
    person.goPath.forEach(node => {
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
  if (person.backPath != null) {
    person.backPath.forEach(node => {
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
