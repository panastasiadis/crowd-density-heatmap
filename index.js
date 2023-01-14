import trilateration from './utils/trilateration.js';
import map from './components/map.js';
import arrayCombinations from './utils/array_combinations.js';
import conversions from './utils/conversions.js';
import url from './utils/url.js';

/* Sends a GET request to fetch the location info 
   of all the RPIs in DAS FEST */
const getRPIdevices = async () => {
  try {
    const response = await fetch(url.rpis);
    return await response.json();
  } catch (err) {
    console.error(err.message);
  }
};

/* Removes devices older than 5 minutes from the map and
   returns a filtered array of devices without the old data*/
const removeAgedDevices = (devices) => {
  /* only for logging */
  let numOfDevicesBeforeRemoval = devices.length;

  /* Filter devices older than two minutes */
  const updatedDevices = devices.filter((device) => {
    const currTime = new Date();
    /* Get the timestamp of the located device  */
    const deviceTime = new Date(device.timestamp);
    /* calculate the located device's age in minutes */
    const timeDiff = (currTime.getTime() - deviceTime.getTime()) / 60000;
    /* Drop the ones older than the specified threshold */
    return timeDiff.toFixed(2) < 5;
  });

  /* Add the updated data to the map */
  map.addDevices(updatedDevices);

  /* log the results */
  console.log(
    `${numOfDevicesBeforeRemoval - updatedDevices.length} devices were removed! New length: ${
      updatedDevices.length
    }, Old length: ${numOfDevicesBeforeRemoval}`
  );

  return updatedDevices;
};

getRPIdevices().then((rpiDevices) => {
  /* Display the RPIs on map with RPI icons */
  for (const device of rpiDevices) {
    /* extract device id from name to a new attribute "id" */
    device.id = parseInt(device.Name.replace(/^\D+/g, ''));
    /* add RPI on the Map */
    map.addRPI(device.Latitude, device.Longitude, device.Name);
  }


  const ws = new WebSocket(url.stream);

  /* Attempts a connection to the Web Socket
      that streams the devices found by the RPIs */
  ws.addEventListener('open', (event) => {
    console.log('Connection opened');
  });

  /* Array holding the displayed devices. Empty at first.*/
  let devices = [];

  /* Set an interval to check every 5+ minutes for aged data on map */
  setInterval(() => {
    devices = removeAgedDevices(devices);
  }, 300100);

  /* listens for fetched devices from the RPIs */
  ws.addEventListener('message', (event) => {
    const foundDevices = JSON.parse(event.data);

    console.log('<///------------------------');

    /* search for possible aged data on the array */
    devices = removeAgedDevices(devices);

    /* counter for the total trilateration points. Only for logging. */
    let i = 0;

    /* iterate through every fetched device */
    for (const foundDevice of foundDevices) {
      /* every incoming device was measured by some RPIs.
        get every possible combination of three RPIs to
        increase the chances of finding trilateration points below */
      const rpiCombinations = arrayCombinations.getCombinations(
        foundDevice.measurements,
        3
      );

      if (rpiCombinations.length >= 1) {
        /* iterate through every combination of RPIs
                until you find a trilateration point or reach the end */
        for (const combination of rpiCombinations) {
          /* Get the RPIs' coordinates (Lat, Lon) from the RPIs' array */
          const rpi1 = rpiDevices.find((rpi) => rpi.id === combination[0].rpi);
          const rpi2 = rpiDevices.find((rpi) => rpi.id === combination[1].rpi);
          const rpi3 = rpiDevices.find((rpi) => rpi.id === combination[2].rpi);

          /* create the cartesian spheres
                      from the 3 RPIs coordinates and their measured signals */
          const sphere1 = conversions.getCartesianSphere(
            rpi1.Latitude,
            rpi1.Longitude,
            combination[0].signal_strength
          );
          const sphere2 = conversions.getCartesianSphere(
            rpi2.Latitude,
            rpi2.Longitude,
            combination[1].signal_strength
          );
          const sphere3 = conversions.getCartesianSphere(
            rpi3.Latitude,
            rpi3.Longitude,
            combination[2].signal_strength
          );

          /* Calculate trilateration */
          const trilPoint = trilateration.calculate(sphere1, sphere2, sphere3);

          /* check if trilateration produced a result */
          if (trilPoint) {
            /* Convert the trilateration point from cartesian to (Lat, Lon) */
            const trilCoords = conversions.ecefToGeodetic(
              trilPoint.x,
              trilPoint.y,
              trilPoint.z
            );

            /* Add the located device on map with count of 1 */
            map.addSingleDevice({
              lat: trilCoords.latitude,
              lng: trilCoords.longitude,
              count: 1,
            });

            /* Push the located device into the devices array along with a timestamp */
            devices.push({
              lat: trilCoords.latitude,
              lng: trilCoords.longitude,
              count: 1,
              timestamp: Date.now(),
            });

            i++;
            /* at least one combination of RPIs produced a trilateration point.
            We can skip the rest of the combinations */
            break;
          }
        }
      }
    }

    /* Log the results */
    console.log('New Fetched Devices: ' + foundDevices.length);
    console.log('Located Devices (Successful Trilateration): ' + i);
    console.log(
      `Number of devices displayed on map: (now) => ${devices.length}`
    );
    console.log('------------------------///>');
  });

  /* Print a closing message on closing of the Web Socket */
  ws.addEventListener('close', (event) => {
    console.log('Connection closed.');
  });

  /* Print an error message if something goes wrong with the Web Socket */
  ws.addEventListener('error', (event) => {
    console.log(`WebSocket error: ${event}.`);
  });
});
