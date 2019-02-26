#!/usr/bin/env node

const input = require('./input');
const printResult = require('../printResult');

const countOccurancesOfLetter = (chars, char) => {
  return chars.reduce((sum, c) => {
    if (c === char) {
      sum += 1;
    }

    return sum;
  }, 0);
};

let containsTwoOccuraces = 0;
let containsThreeOccuraces = 0;

input.forEach((id) => {
  let charAppearsTwice = false;
  let charAppearsThrice = false;

  const chars = id.split('');

  chars.forEach((char) => {
    const count = countOccurancesOfLetter(chars, char);

    if (!charAppearsTwice && count === 2) {
      charAppearsTwice = true;
    }

    if (!charAppearsThrice && count === 3) {
      charAppearsThrice = true;
    }
  });

  if (charAppearsTwice) {
    containsTwoOccuraces += 1;
  }

  if (charAppearsThrice) {
    containsThreeOccuraces += 1;
  }
});

const result = containsTwoOccuraces * containsThreeOccuraces;

printResult(result);
