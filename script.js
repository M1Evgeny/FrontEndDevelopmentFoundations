class MyPromise extends Promise {
  synchThen(func) {
    func();
    return this;
  }
}

class ReversePromise extends Promise {
  constructor(fn) {
    super(() => {});
    this.fn = fn;
    this.stack = [];
  }

  then(fn) {
    this.stack.push(fn);
    return this;
  }

  run() {
    const promise = new Promise(this.fn);
    let current = promise;
    while (this.stack.length) {
      current = current.then(this.stack.pop());
    }
    return current;
  }
}

(function () {
  const myPromise = new MyPromise((resolve) => {
    console.log(1);
    resolve();
  }).synchThen(() => {
    console.log(2);
  }).then(() => {
    console.log(3);
  });
  console.log(4);

  const reversePromise = new ReversePromise((resolve) => {
    console.log(1);
    resolve();
  }).then(() => {
    console.log(2);
  }).then(() => {
    console.log(3);
  }).then(() => {
    console.log(4);
  })
    .run();
}());
