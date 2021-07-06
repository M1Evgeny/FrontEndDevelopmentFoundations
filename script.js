class Vector {
  constructor(list) {
    this.list = list;
  }

  #nullCheck(lenght1, lenght2) {
    if (lenght1 !== lenght2) {
      throw new Error("Vectors lengths is different");
    }
  }

  add(vector) {
    let secondList = vector.list;
    this.#nullCheck(this.list.length, secondList.length);

    let newList = [];
    for (var i = 0; i < this.list.length; i++) {
      newList.push(this.list[i] + secondList[i]);
    }
    return new Vector(newList);
  }

  subtract(vector) {
    let secondList = vector.list;
    this.#nullCheck(this.list.length, secondList.length);

    let newList = [];
    for (var i = 0; i < this.list.length; i++) {
      newList.push(this.list[i] - secondList[i]);
    }
    return new Vector(newList);
  }

  dot(vector) {
    let secondList = vector.list;
    this.#nullCheck(this.list.length, secondList.length);

    let newList = [];
    for (var i = 0; i < this.list.length; i++) {
      newList.push(this.list[i] * secondList[i]);
    }
    return newList.reduce((a, b) => a + b, 0);
  }

  norm() {
    let newList = this.list.map((item) => Math.pow(item, 2));
    return Math.sqrt(newList.reduce((a, b) => a + b, 0));
  }

  toString() {
    return "(" + this.list.join(",") + ")";
  }
}

var a = new Vector([1, 2, 3]);
var b = new Vector([3, 4, 5]);
var c = new Vector([5, 6, 7, 8]);

console.log(a.add(b).list);
console.log(a.subtract(b).list);
console.log(a.dot(b));
console.log(a.norm());
console.log(a.toString());
console.log(a.toString() === "(1,2,3)");
a.add(c);