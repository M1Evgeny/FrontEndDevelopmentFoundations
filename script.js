class NamedOne {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(str) {
    const arr = str.split(" ");

    if (arr[0] && arr[1]) {
      this.firstName = arr[0];
      this.lastName = arr[1];
    }
  }
};

const namedOne = new NamedOne("Naomi","Wang");