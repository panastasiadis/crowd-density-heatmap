var baseLayer = L.tileLayer(
  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '...',
    maxZoom: 19,
    minZoom: 18

  }
);

var cfg = {
  // radius should be small ONLY if scaleRadius is true (or small radius is intended)
  // if scaleRadius is false it will be the constant radius used in pixels
  radius: 30,
  // maxOpacity: 0.8,
  // scales the radius based on map zoom
  // scaleRadius: true,
  // if set to false the heatmap uses the global maximum for colorization
  // if activated: uses the data maximum within the current map boundaries
  //   (there will always be a red spot with useLocalExtremas true)
  "useLocalExtremas": true,
  // which field name in your data represents the latitude - default "lat"
  latField: 'lat',
  // which field name in your data represents the longitude - default "lng"
  lngField: 'lng',
  // which field name in your data represents the data value - default "value"
  valueField: 'count',
};

var heatmapLayer = new HeatmapOverlay(cfg);

var map = new L.Map('map-canvas', {
  center: new L.LatLng(48.99874, 8.3752),
  zoom: 18,
  layers: [baseLayer, heatmapLayer],
});

var goldIcon = new L.Icon({
  iconUrl: 'img/wifi_icon.png',
  shadowUrl: 'img/marker-shadow.png',
  iconSize: [20, 15],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [40, 20],
});
const addPin = (lat, lon, name) => {
  L.marker([lat, lon], { icon: goldIcon }).bindPopup(name).addTo(map);
};

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution:
//     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// }).addTo(map);


export default { heatmapLayer, addPin };
