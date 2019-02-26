#!/usr/bin/env node

const input = require('./input');
const printeResult = require('../printResult');

const result = input.reduce((sum, number) => {
  const operator = number.slice(0, 1);
  const integer = parseInt(number.slice(1, number.length));

  if (operator === '+') {
    sum += integer;
  } else if (operator === '-') {
    sum -= integer;
  }

  return sum;
}, 0);

printeResult(result);
