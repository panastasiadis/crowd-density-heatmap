// alert('Here goes the heatmap');

var map = L.map('map').setView([48.99862, 8.37519], 100);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([48.99862, 8.37519])
  .addTo(map)
  .bindPopup('Raspberry Pi #1')

L.marker([48.99854, 8.37502])
  .addTo(map)
  .bindPopup('Raspberry Pi #2')

L.marker([48.99874, 8.3752])
  .addTo(map)
  .bindPopup('Raspberry Pi #3')

L.marker([48.99852, 8.37606])
  .addTo(map)
  .bindPopup('Raspberry Pi #4')

L.marker([48.99874, 8.37592])
  .addTo(map)
  .bindPopup('Raspberry Pi #5')

L.marker([48.99884, 8.37593])
  .addTo(map)
  .bindPopup('Raspberry Pi #6')

L.marker([48.9989, 8.37524])
  .addTo(map)
  .bindPopup('Raspberry Pi #8')

L.marker([48.99898, 8.37521])
  .addTo(map)
  .bindPopup('Raspberry Pi #9')

L.marker([48.99906, 8.37511])
  .addTo(map)
  .bindPopup('Raspberry Pi #10')

L.marker([48.99893, 8.37417])
  .addTo(map)
  .bindPopup('Raspberry Pi #11')

  L.marker([48.99865, 8.37415])
  .addTo(map)
  .bindPopup('Raspberry Pi #14')

  L.marker([48.99912, 8.37405])
  .addTo(map)
  .bindPopup('Raspberry Pi #15')

  L.marker([48.9984, 8.37466])
  .addTo(map)
  .bindPopup('Raspberry Pi #16')


  L.marker([48.99833, 8.3746])
  .addTo(map)
  .bindPopup('Raspberry Pi #17')


  L.marker([48.99846, 8.37449])
  .addTo(map)
  .bindPopup('Raspberry Pi #18')


  L.marker([48.99837, 8.37435])
  .addTo(map)
  .bindPopup('Raspberry Pi #19')


  L.marker([48.99903, 8.37411])
  .addTo(map)
  .bindPopup('Raspberry Pi #21')


  L.marker([48.9982, 8.37567])
  .addTo(map)
  .bindPopup('Raspberry Pi #22')


  L.marker([48.99815,8.37563])
  .addTo(map)
  .bindPopup('Raspberry Pi #23')


  L.marker([48.99817, 8.37554])
  .addTo(map)
  .bindPopup('Raspberry Pi #24')


  L.marker([48.99917, 8.37446])
  .addTo(map)
  .bindPopup('Raspberry Pi #25')

  L.marker([48.99925, 8.37455])
  .addTo(map)
  .bindPopup('Raspberry Pi #26')

  L.marker([48.99929, 8.37449])
  .addTo(map)
  .bindPopup('Raspberry Pi #27')
