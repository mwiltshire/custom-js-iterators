# Custom JS Iterators

Playing around with adding custom Symbol.iterator properties to arrays in order to hijack the default iteration behaviour. Also a good chance to mess around with generator functions and discover the `yield*` expression! While they're fun to write, you'd probably never actually use any of these!

So far iterators.js includes:

iterateFlat - Flatten an array while iterating over it

```
const arr = iterateFlat([[1, 2, [[[[3, [4, 5]]]], [6, 7], 8], 9, [10]]]);
console.log([...arr]); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

iterateBackwards - Iterate backwards over an array

```
const arr = iterateFlat([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
for (const i of arr) {
  console.log(i); // 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
}
```

iterateNthElement - Iterate over every nth item in array

```
const arr = iterateNthElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], 2);
for (const i of arr) {
  console.log(i); // 2, 4, 6, 8, 10, 12, 14, 16
}
```

iterateCallIfFunc - Iterate over array and call every element of type function

```
const arr = iterateCallIfFunc([1, 2, 'a', { b: 'c' }, () => true, [3, 4], () => 'd']);
for (const i of arr) {
  console.log(i); // true, d
}
```

iterateCallValueIfFunc - Iterate over map and call any function value with its key as args

```
const map = new Map([[1, n => n + 2], ['a', 1], [['Hello', 'world'], (a, b) => `${a}, ${b}`]]);
const it = iterateCallValueIfFunc(map);
for (const i of it) {
  console.log(i); // 3, Hello, world
}
```
