// The Earth radius in meters
const EARTH_RADIUS = 6371000;

/* converts Geodetic coordinates (Lat, Long) to 
cartesian ECEF coordinates (x, y, z) */
function geodeticToEcef(latitude, longitude) {
  const latInRads = latitude * (Math.PI / 180);
  const lonInRads = longitude * (Math.PI / 180);
  return {
    x: EARTH_RADIUS * Math.cos(latInRads) * Math.cos(lonInRads),
    y: EARTH_RADIUS * Math.cos(latInRads) * Math.sin(lonInRads),
    z: EARTH_RADIUS * Math.sin(latInRads),
  };
}

/* converts cartesian ECEF coordinates (x, y, z) to 
Geodetic coordinates (Lat, Long) */
function ecefToGeodetic(x, y, z) {
  const latInRads = Math.asin(z / EARTH_RADIUS);
  const lonInRads = Math.atan2(y, x);
  const latitude = latInRads * (180 / Math.PI);
  const longitude = lonInRads * (180 / Math.PI);
  return { latitude, longitude };
}

/* formula for converting RSSI to distance
 based on https://stackoverflow.com/a/65124579
*/
function rssiToDistance(signalRSSI) {
  const MEASURED_POWER = -30;
  const N = 4;
  return +Math.pow(10, (MEASURED_POWER - signalRSSI) / (10 * N));
}

/* gets a cartesian sphere (x, y, z, radius) given lat, long and RSSI */
function getCartesianSphere(latitude, longitude, RSSI) {
  return {
    ...geodeticToEcef(latitude, longitude),
    r: rssiToDistance(RSSI),
  };
}

export default {
  getCartesianSphere,
  ecefToGeodetic,
  geodeticToEcef,
};
