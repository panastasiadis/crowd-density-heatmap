const EARTH_RADIUS = 6371000;

function getCartesianSphere(latitude, longitude, RSSI) {
  return {
    ...convertGeodeticToEcef(latitude, longitude),
    r: convertRSSItoDistance(RSSI),
  };
}

function convertGeodeticToEcef(latitude, longitude) {
  const latInRads = latitude * (Math.PI / 180);
  const lonInRads = longitude * (Math.PI / 180);
  return {
    x: EARTH_RADIUS * Math.cos(latInRads) * Math.cos(lonInRads),
    y: EARTH_RADIUS * Math.cos(latInRads) * Math.sin(lonInRads),
    z: EARTH_RADIUS * Math.sin(latInRads),
  };
}

function convertEcefToGeodetic(x, y, z) {
  const latInRads = Math.asin(z / EARTH_RADIUS);
  const lonInRads = Math.atan2(y, x);
  const latitude = latInRads * (180 / Math.PI);
  const longitude = lonInRads * (180 / Math.PI);
  return { latitude, longitude };
}

function convertRSSItoDistance(signalRSSI) {
  const measuredPower = -30;
  const N = 4;
  return +Math.pow(10, (measuredPower - signalRSSI) / (10 * N));
}

export default {
  getCartesianSphere,
  convertEcefToGeodetic,
  convertGeodeticToEcef,
};
