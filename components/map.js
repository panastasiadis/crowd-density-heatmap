const DAS_FEST_LOCATION = {
  lat: 48.99874,
  lng: 8.3752,
};

/* raspberry pi icon configuration */
const rpiIcon = new L.Icon({
  iconUrl: 'img/raspberry-pi.png',
  shadowUrl: 'img/marker-shadow.png',
  iconSize: [20, 20],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [40, 20],
});

/* adds an array of devices to the map */
const addDevices = (devices) => {
  heatmapLayer.setData({
    max: 4,
    min: 0,
    data: devices,
  });
};

/* Add a single device to map */
const addSingleDevice = (device) => {
  heatmapLayer.addData(device);
};

/* Adds an RPI on the map given its coordinates and name */
const addRPI = (lat, lon, name) => {
  L.marker([lat, lon], { icon: rpiIcon }).bindPopup(name).addTo(map);
};

/* configure the base layer of the map */
const baseLayer = L.tileLayer(
  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '...',
    maxZoom: 19,
    minZoom: 18,
  }
);

/* configure the heatmap layer of the map */
const heatmapLayer = new HeatmapOverlay({
  radius: 30,
  useLocalExtremas: true,
  latField: 'lat',
  lngField: 'lng',
  valueField: 'count',
});

/* initialize the map on the center region of DAS FEST */
const map = new L.Map('map-canvas', {
  center: new L.LatLng(DAS_FEST_LOCATION.lat, DAS_FEST_LOCATION.lng),
  zoom: 18,
  layers: [baseLayer, heatmapLayer],
});

/* Initialize the heatmap with an empty array of data */
heatmapLayer.setData({
  max: 4,
  min: 0,
  data: [],
});

export default { addRPI, addDevices, addSingleDevice };
