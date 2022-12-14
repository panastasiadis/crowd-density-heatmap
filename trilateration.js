import vectors from './vectors.js';

const calculate = (p1, p2, p3) => {
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

  z = Math.sqrt(z);

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
  calculate,
};
