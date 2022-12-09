import trilateration from './trilaterate.js';

const p1 = trilateration.convertGeoToCartesian(37.418436, -121.963477);
p1.r = 0.265710701754;

const p2 = trilateration.convertGeoToCartesian(37.417243, -121.961889);
p2.r = 0.234592423446;

const p3 = trilateration.convertGeoToCartesian(37.418692, -121.960194);
p3.r = 0.0548954278262;

const trilPoint = trilateration.trilaterate(p1, p2, p3);

const trilPointinGeo = trilateration.convertCartesianToGeo(trilPoint.x, trilPoint.y, trilPoint.z)

console.log(p1, p2, p3, trilPointinGeo);

async function getRPIdevices() {
  try {
    const response = await fetch('http://62.217.127.19:8080/rpi');
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err.message);
  }
}
getRPIdevices().then((data) => {
  console.log(data);
});

const ws = new WebSocket('ws://62.217.127.19:8080/stream/');
ws.addEventListener('open', (event) => {
  console.log('Connection opened');
});

let devices = [];
ws.addEventListener('message', (event) => {
  devices = JSON.parse(event.data);
  for (const device of devices) {
    for (const measurement of device.measurements) {
      measurement.distance = trilateration.convertRSSItoDistance(
        measurement.signal_strength
      );
    }
    // console.log(device);
  }
  // console.log(`Server sent the following message: ${event.data}`);
});
ws.addEventListener('close', (event) => {
  console.log('Connection closed.');
});
ws.addEventListener('error', (event) => {
  console.log(`WebSocket error: ${event}.`);
});
