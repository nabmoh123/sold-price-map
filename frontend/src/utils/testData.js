const { addPoint } = require('./api');

const testData = [];

for (let i=0; i<=100; i++) {
  for (let j=0; j<=100; j++) {
    const price = Math.floor(Math.random() * 9990000) + 10000;
    testData.push({x:i, y:j, price: price})
  }
}

testData.forEach((elem) => {
  addPoint(elem.x, elem.y, elem.price);
});