function runningAverage() {
  let list = [];
  return function averageValue(item) {
    list.push(item);
    return list.reduce((a, b) => a + b, 0) / list.length;
  };
}

rAvg = runningAverage();
console.log(rAvg(10));
console.log(rAvg(11));
console.log(rAvg(12));



