const STATE = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
};

function isThenable(val) {
  return val instanceof MyPromise;
}
class MyPromise {
  constructor(callback) {
    this.state = STATE.PENDING;
    this.value = undefined;
    this.handlers = [];
    try {
      callback(this.resolve, this.reject);
    } catch (err) {
      this.reject(err);
    }
  }

  resolve(value) {
    this.updateResult(value, STATE.FULFILLED);
  }

  reject(error) {
    this.updateResult(error, STATE.REJECTED);
  }

  updateResult(value, state) {
    setTimeout(() => {
      if (this.state !== STATE.PENDING) {
        return;
      }
      if (isThenable(value)) {
        return value.then(this.resolve, this.reject);
      }

      this.value = value;
      this.state = state;
      this.executeHandlers();
    }, 0);
  }

  addHandlers(handlers) {
    this.handlers.push(handlers);
    this.executeHandlers();
  }

  executeHandlers() {
    if (this.state === STATE.PENDING) {
      return null;
    }

    this.handlers.forEach((handler) => {
      if (this.state === STATE.FULFILLED) {
        return handler.onSuccess(this.value);
      }
      return handler.onFail(this.value);
    });
    this.handlers = [];
    return null;
  }

  then(onSuccess, onFail) {
    return new MyPromise((res, rej) => {
      this.addHandlers({
        onSuccess(value) {
          if (!onSuccess) {
            return res(value);
          }
          try {
            return res(onSuccess(value));
          } catch (err) {
            return rej(err);
          }
        },
        onFail(value) {
          if (!onFail) {
            return rej(value);
          }
          try {
            return res(onFail(value));
          } catch (err) {
            return rej(err);
          }
        },
      });
    });
  }
}

const promise = new MyPromise((resolve) => {
  console.log(1);
  resolve();
})
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  });
console.log(4);
