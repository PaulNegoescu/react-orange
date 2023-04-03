'use strict';

if (2) {
  console.log('sadceaf');
} else {
  console.warn('sdasdas');
}

function add(n1, n2) {
  let sum = n1 + n2;
  return sum;
}
const a = 42;
var b = 'Pau;';

function testCallbacks(cb) {
  return cb(4, 5);
}

const func = add;

// console.log(testCallbacks(add));

console.log(
  testCallbacks(function multiply(n1, n2) {
    return n1 * n2;
  })
);

const func2 = function (...$_re3st) {
  console.log({ $_re3st });
};

(function test2() {
  console.log('IIFE');
})();

const add2 = (n1 = 0, n2 = 0, ...nums) => {
  // console.log({ n1, n2, nums });
  let sum = n1 + n2;
  for (const num of nums) {
    sum += num;
  }
  return sum;
};

// for (let i = 0; i < 20; i++) {
//   console.log(i);
// }

// {
//   let i = 0;
//   while (i < 20) {
//     console.log(i);
//     i++;
//   }
// }

// external: for (let i = 0; i < 4; i++) {
//   let line = '';
//   for (let j = 0; j < 4; j++) {
//     line += j + i + ' ';
//     if (j === 2) {
//       console.log(line);
//       continue external;
//     }
//   }
//   console.log(line);
// }

const arr = [1, 2, 'Paul'];
arr.unshift(5);
console.log(arr);

// for (const c of 'Paul') {
//   console.log(c);
// }

// console.log(add2(1, 6, 7, 8, 8));

func2(1, 2, 3, 4, 'Paul');

// console.log(42 == 42);
// console.dir(add);
const o = {
  fName: 'Paul',
  lName: 'Negoescu',
  age: 37,
  height: 1.85,
  weight: 100,
  phoneNumbers: { mobile: '1234567' },
  calculateBmi() {
    console.log(this);
    return (this.weight / this.height ** 2).toFixed(2);
  },
  getName() {
    setTimeout(() => console.log(this), 2000);
  },

  get fullName() {
    return `${this.fName} ${this.lName}`;
  },

  set fullName(name) {
    // const nameParts = name.split(' ');
    // console.log(nameParts);
    // this.fName = nameParts[0];
    // this.lName = nameParts[1];

    // Destructuring Assignment
    [this.fName, this.lName] = name.split(' ');
  },
};

const o2 = {
  weight: 20,
  height: 1.75,
  f2: o.calculateBmi,
};

function test3(obj) {
  const clona = { ...obj };
  clona.weight = 200;
}

test3(o);

console.log(o.fullName);
o.fullName = 'Andrei Oniga';
console.log(o.fName);

// Destructuring Assignment
// Arrays
const arr4 = [3, 4, 5, 6, 7];
const [, unu, doi, , trei] = arr4;
console.log({ unu: unu, doi, trei: trei });

// Objects
const {
  lName: lastName,
  weight: greutate,
  phoneNumbers: { mobile: numarTel },
} = o;
console.log({ lastName, greutate, numarTel });

function destructuringParameters({ weight = 'Paul' }) {
  console.log({ weight });
}
destructuringParameters(o2);

// Spread Operator
// Arrays
const arr5 = [...arr4, 10, 11, 12];

arr5[3] = 9;
console.log(arr4, arr5);

function testSpread(unu, doi, trei, ...rest) {
  console.log({ unu, doi, trei, rest });
}

testSpread('Ioana', ...arr5, 'Paul');
testSpread.apply(this, arr4);

//Objects
const o3 = { ...o };
o3.fName = 'Ioana';
console.log(o3.fName);
o3.phoneNumbers.mobile = 'Andreea';
console.log(o);

Object.freeze(o3);
// o3.fName = 'Somthing';

const altaProp = 'weight';
const o4 = {
  0: 'Test',
  1: 'Ceva',
  'un nume': 'Alrtvet',
  length: 5,
  prop: 'dasdasd',
  [altaProp]: 100,
};

const prop = 'length';
console.log(o4[prop]);

// Closure
function parent(a) {
  let cache = {};

  function child(b) {
    const key = `${a} + ${b}`;
    if (cache[key] === undefined) {
      console.log('We memoize the value');
      const sum = a + b;
      cache[key] = sum;
      return sum;
    }

    return cache[key];
  }

  return child;
}
const addWithFive = parent(5);
const addWithTen = parent(10);
console.log(addWithFive(4), addWithTen(5), addWithFive(10), addWithTen(5));

// for (let i = 0; i < 5; i++) {
//   setTimeout(() => console.log(i), 0);
// }

console.clear();

function User(fName, age) {
  this.fName = fName;
  this.age = age;
}

User.prototype.sayHello = function () {
  return 'Hello ' + this.fName;
};

User.test = 42;

const user1 = new User('Paul', 37);
const user2 = new User('Ioana', 25);

console.log(user1, user2);

class Admin extends User {
  isAdmin = true;
  prop = 'ceva';
  #something = 'dasdadas';
  static test2 = 1042;
  // constructor(fName, age) {
  //   super(fName, age);
  //   this.isAdmin = true;
  // }

  sayHello() {
    return super.sayHello() + ' from Admin!';
  }

  get something() {
    return this.#something;
  }
}

const user3 = new Admin('Andreea', 28);
console.log(User.test);

const date = new Date();
console.log(date, Date.now());
