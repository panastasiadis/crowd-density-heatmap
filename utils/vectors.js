/* Vector Operations
        ----
   Included: 
      Normalization, 
      Dot Product,
      Cross Product,
      Addition, 
      Subtraction,
      Division with Number,
      Multiplication with Number
        ----
*/

const normalize = (a) => {
  return Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2) + Math.pow(a.z, 2));
};

const dot = (a, b) => {
  return a.x * b.x + a.y * b.y + a.z * b.z;
};

const subtract = (a, b) => {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
    z: a.z - b.z,
  };
};

const add = (a, b) => {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
    z: a.z + b.z,
  };
};

const divide = (a, b) => {  
  return {
    x: a.x / b,
    y: a.y / b,
    z: a.z / b,
  };
};

const multiply = (a, b) => {
  return {
    x: a.x * b,
    y: a.y * b,
    z: a.z * b,
  };
};

const cross = (a, b) => {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
};

export default { normalize, dot, subtract, add, divide, multiply, cross };
