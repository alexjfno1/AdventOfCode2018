#!/usr/bin/env node

const input = require('./input');
const printResult = require('../printResult');

const getNumberOfMatches = (id, char, index) => {
  const regex = new RegExp(`${id.slice(0, index)}([a-z]+)${id.slice(index + 1, id.length)}`);

  const matches = input.reduce((sum, nextId) => {
    const match = nextId.match(regex);

    if (match) {
      sum += 1;
    }

    return sum;
  }, 0);

  return matches - 1;
};

let matches = [];

input.forEach((id) => {
  const chars = id.split('');

  chars.forEach((char, index) => {
    const numberOfMatches = getNumberOfMatches(id, char, index);
    if (numberOfMatches === 1) {
      matches.push(id);
    }
  });
});

let commonLetters = '';

matches[0].split('').forEach((char, index) => {
  if (char === matches[1][index]) {
    commonLetters += char;
  }
});

printResult(commonLetters);
