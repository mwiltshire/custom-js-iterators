// Flatten while iterating
const array = [[1, 2, [[[[3, [4, 5]]]], [6, 7], 8], 9, [10]]];
const iterateFlat = (arr) => {
  const newArr = arr;
  newArr[Symbol.iterator] = function* it(e = this) {
    let index = 0;
    while (index < e.length) {
      if (Array.isArray(e[index])) {
        yield* it([].concat(...e[index]));
      } else {
        yield e[index];
      }
      index += 1;
    }
  };
  return newArr;
};

console.log([...iterateFlat(array)]); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

for (const i of iterateFlat(array)) {
  console.log(i); // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
}

// Iterate backwards over an array
const array1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const iterateBackwards = (arr) => {
  const newArr = arr;
  newArr[Symbol.iterator] = function* it() {
    let index = this.length;
    while (index > 0) {
      yield this[(index -= 1)];
    }
  };
  return newArr;
};

for (const i of iterateBackwards(array1)) {
  console.log(i); // 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
}

// Iterate over every nth item in array
const array2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const iterateNthElement = (arr, n) => {
  const newArr = arr;
  newArr[Symbol.iterator] = function* it() {
    let index = 0;
    while (index !== this.length) {
      if ((index + 1) % n === 0) yield this[index];
      index += 1;
    }
  };
  return newArr;
};

for (const i of iterateNthElement(array2, 2)) {
  console.log(i); // 2, 4, 6, 8, 10, 12, 14, 16
}

// Iterate over array and call every element of type function
const array3 = [1, 2, 'a', { b: 'c' }, () => true, [3, 4], () => 'd'];
const iterateCallIfFunc = (arr) => {
  const newArr = arr;
  newArr[Symbol.iterator] = function* it() {
    let index = 0;
    while (index !== this.length) {
      if (typeof this[index] === 'function') yield this[index]();
      index += 1;
    }
  };
  return newArr;
};

for (const i of iterateCallIfFunc(array3)) {
  console.log(i); // true, d
}

// Iterate over map and call any function value with its key as args
const map = new Map([[1, n => n + 2], ['a', 1], [['Hello', 'world'], (a, b) => `${a}, ${b}`]]);
const iterateCallValueIfFunc = (m) => {
  const newMap = m;
  newMap[Symbol.iterator] = function* it() {
    let index = 0;
    const keys = this.keys();
    const values = this.values();
    while (index !== this.size) {
      const key = keys.next().value;
      const { value } = values.next();
      if (typeof value === 'function') {
        yield Array.isArray(key) ? value(...key) : value(key);
      }
      index += 1;
    }
  };
  return newMap;
};

for (const i of iterateCallValueIfFunc(map)) {
  console.log(i); // 3, Hello, world
}
