#!/usr/bin/env node

const input = require('./input');
const printeResult = require('../printResult');

let frequency = 0;
let previousFrequencies = [];
let frequencyToAppearTwice;

const run = () => {
  input.forEach((number) => {
    if (frequencyToAppearTwice) return;

    const operator = number.slice(0, 1);
    const integer = parseInt(number.slice(1, number.length));

    if (operator === '+') {
      frequency += integer;
    } else if (operator === '-') {
      frequency -= integer;
    }

    if (previousFrequencies.includes(frequency)) {
      frequencyToAppearTwice = frequency;
    } else {
      previousFrequencies.push(frequency);
    }
  });

  if (!frequencyToAppearTwice) {
    run();
  }
};

run();

printeResult(frequencyToAppearTwice);
