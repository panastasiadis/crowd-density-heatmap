import vectors from './vectors.js';
const convertRSSItoDistance = (signalRSSI) => {
  const measuredPower = -44;
  const N = 2.4;
  return +Math.pow(10, (measuredPower - signalRSSI) / (10 * N)).toFixed(4);
};

console.log(convertRSSItoDistance(-61));

const convertGeoToCartesian = (Latitude, Longitude) => {
  const earthR = 6371;
  const LatInRads = Latitude * (Math.PI / 180);
  const LongInRads = Longitude * (Math.PI / 180);
  const x = earthR * Math.cos(LatInRads) * Math.cos(LongInRads);
  const y = earthR * Math.cos(LatInRads) * Math.sin(LongInRads);
  const z = earthR * Math.sin(LatInRads);
  return { x, y, z };
};

const convertCartesianToGeo = (x, y, z) => {
  const earthR = 6371;
  const latInRads = Math.asin(z / earthR);
  const lonInRads = Math.atan2(y, x);
  const latitude = latInRads * (180 / Math.PI);
  const longitude = lonInRads * (180 / Math.PI);
  return { latitude, longitude };
};

const trilaterate = (p1, p2, p3) => {
  const ex = vectors.divide(
    vectors.subtract(p2, p1),
    vectors.normalize(vectors.subtract(p2, p1))
  );

  const i = vectors.dot(ex, vectors.subtract(p3, p1));
  const numeratorEy = vectors.subtract(
    vectors.subtract(p3, p1),
    vectors.multiply(ex, i)
  );

  const ey = vectors.divide(numeratorEy, vectors.normalize(numeratorEy));
  const ez = vectors.cross(ex, ey);

  const distance = vectors.normalize(vectors.subtract(p2, p1));

  const j = vectors.dot(ey, vectors.subtract(p3, p1));

  const x =
    (Math.pow(p1.r, 2) - Math.pow(p2.r, 2) + Math.pow(distance, 2)) /
    (2 * distance);

  const y =
    (Math.pow(p1.r, 2) - Math.pow(p3.r, 2) + Math.pow(i, 2) + Math.pow(j, 2)) /
      (2 * j) -
    (i / j) * x;

  let z = Math.pow(p1.r, 2) - Math.pow(x, 2) - Math.pow(y, 2);

  if (Math.abs(z) < 0.0000000001) {
    z = 0;
  }

  // no solution found
  if (isNaN(z)) {
    return null;
  }

  const trilPointTemp = vectors.add(
    p1,
    vectors.add(vectors.multiply(ex, x), vectors.multiply(ey, y))
  );

  const trilPoint = vectors.add(trilPointTemp, vectors.multiply(ez, z));

  return trilPoint;
};

export default {
  trilaterate,
  convertCartesianToGeo,
  convertGeoToCartesian,
  convertRSSItoDistance,
};
