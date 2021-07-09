function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.introduce = function () {
  // eslint-disable-next-line no-tabs
  return `My	name	is	${this.name}	and	I	am	${this.age}`;
};

function myNew(Person, ...args) {
  const obj = {};
  Object.setPrototypeOf(obj, Person.prototype);
  Person.call(obj, ...args);
  return obj;
}

const john = new Person('John', 30);
const jack = myNew(Person, 'Jack', 40);

console.log(john.introduce());
console.log(jack.introduce());
