import trilateration from './trilateration.js';
import measurement from './measurement.js';
import map from './map.js';
import arrayUtils from './array_utils.js';

// const p1 = measurement.convertGeodeticToEcef(37.418436, -121.963477);
// p1.r = 265.710701754;

// const p2 = measurement.convertGeodeticToEcef(37.417243, -121.961889);
// p2.r = 234.592423446;

// const p3 = measurement.convertGeodeticToEcef(37.418692, -121.960194);
// p3.r = 548.954278262;

// const trilPoint = trilateration.calculate(p1, p2, p3);

// const trilPointinGeo = measurement.convertEcefToGeodetic(
//   trilPoint.x,
//   trilPoint.y,
//   trilPoint.z
// );

// console.log(p1, p2, p3, trilPointinGeo);

async function getRPIdevices() {
  try {
    const response = await fetch('http://62.217.127.19:8080/rpi');
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err.message);
  }
}

// setInterval(() => {
//   const initData = {
//     max: 100,
//     min: 0,
//     data: [],
//   };
//   map.heatmapLayer.setData(initData);
// }, 2000);

const initData = {
  max: 100,
  min: 0,
  data: [],
};
map.heatmapLayer.setData(initData);

getRPIdevices().then((rpiDevices) => {
  for (const device of rpiDevices) {
    device.id = parseInt(device.Name.replace(/^\D+/g, ''));
    map.addPin(device.Latitude, device.Longitude, device.Name);
  }

  // console.log(rpiDevices);

  const ws = new WebSocket('ws://62.217.127.19:8080/stream/');
  ws.addEventListener('open', (event) => {
    console.log('Connection opened');
  });

  // let isFetchingInitData = true;
  let devices = [];

  // setInterval(() => {
  //   console.log('Updating people...');

  //   const updatedDevices = devices.filter((device) => {
  //     const currTime = new Date();
  //     const deviceTime = new Date(device.timestamp);
  //     const timeDiff = (currTime.getTime() - deviceTime.getTime()) / 60000;
  //     console.log(
  //       currTime.getTime(),
  //       deviceTime.getTime(),
  //       timeDiff.toFixed(2)
  //     );
  //     return timeDiff.toFixed(2) < 1;
  //   });
  //   const updatedData = {
  //     max: 100,
  //     min: 0,
  //     data: updatedDevices,
  //   };
  //   map.heatmapLayer.setData(updatedData);
  //   devices = [...updatedDevices];
  // }, 120100);

  ws.addEventListener('message', (event) => {
    let oldLength = devices.length;
    const foundDevices = JSON.parse(event.data);
    const updatedDevices = devices.filter((device) => {
      const currTime = new Date();
      const deviceTime = new Date(device.timestamp);
      const timeDiff = (currTime.getTime() - deviceTime.getTime()) / 60000;
      // console.log(
      //   currTime.getTime(),
      //   deviceTime.getTime(),
      //   timeDiff.toFixed(2)
      // );
      return timeDiff.toFixed(2) < 2;
    });
    const updatedData = {
      max: 100,
      min: 0,
      data: updatedDevices,
    };
    map.heatmapLayer.setData(updatedData);
    devices = [...updatedDevices];
    console.log(
      `${oldLength - devices.length} devices were removed! New length: ${
        devices.length
      }, Old length: ${oldLength}`
    );
    let i = 0;
    oldLength = devices.length;
    for (const foundDevice of foundDevices) {
      const rpiCombinations = arrayUtils.getArrayElementsCombs(
        foundDevice.measurements,
        3
      );
      for (const combination of rpiCombinations) {
        const rpi1 = rpiDevices.find((rpi) => rpi.id === combination[0].rpi);
        const rpi2 = rpiDevices.find((rpi) => rpi.id === combination[1].rpi);
        const rpi3 = rpiDevices.find((rpi) => rpi.id === combination[2].rpi);

        const sphere1 = measurement.getCartesianSphere(
          rpi1.Latitude,
          rpi1.Longitude,
          foundDevice.measurements[0].signal_strength
        );
        const sphere2 = measurement.getCartesianSphere(
          rpi2.Latitude,
          rpi2.Longitude,
          foundDevice.measurements[1].signal_strength
        );
        const sphere3 = measurement.getCartesianSphere(
          rpi3.Latitude,
          rpi3.Longitude,
          foundDevice.measurements[2].signal_strength
        );

        const trilPoint = trilateration.calculate(sphere1, sphere2, sphere3);
        // console.log(trilPoint);
        if (trilPoint) {
          const trilCoords = measurement.convertEcefToGeodetic(
            trilPoint.x,
            trilPoint.y,
            trilPoint.z
          );

          map.heatmapLayer.addData({
            lat: trilCoords.latitude,
            lng: trilCoords.longitude,
            count: 30,
          });

          //adding all devices
          devices.push({
            lat: trilCoords.latitude,
            lng: trilCoords.longitude,
            count: 30,
            timestamp: Date.now(),
          });
          i++;
          break;
        }
      }
    }
    console.log('New Devices: ' + foundDevices.length);
    console.log('Located Devices: ' + i);
    console.log(`Buffer Length: ${devices.length}, old length: ${oldLength}`);

    // console.log(`Server sent the following message: ${event.data}`);
  });
  ws.addEventListener('close', (event) => {
    console.log('Connection closed.');
  });
  ws.addEventListener('error', (event) => {
    console.log(`WebSocket error: ${event}.`);
  });
});
