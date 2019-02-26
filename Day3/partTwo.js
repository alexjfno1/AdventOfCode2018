#!/usr/bin/env node

const input = require('./input');
const printResult = require('../printResult');

let fabric = [];
for (let x = 0; x < 10000; x++) {
  fabric[x] = [];

  for (let y = 0; y < 10000; y++) {
    fabric[x][y] = 'E';
  }
}

const parseClaim = (claim) => {
  const id = claim.split(' ')[0];
  const [x, y] = claim.split(' ')[2].split(',');
  const [w, h] = claim.split(' ')[3].split('x');

  return {
    id,
    x: parseInt(x),
    y: parseInt(y.replace(':', '')),
    w: parseInt(w),
    h: parseInt(h),
  };
};

input.forEach((claim) => {
  const { id, x, y, w, h } = parseClaim(claim);

  for (let iw = 0; iw < w; iw++) {
    for (let ih = 0; ih < h; ih++) {
      if (fabric[x + iw][y + ih] === 'F' || fabric[x + iw][y + ih] === 'X') {
        fabric[x + iw][y + ih] = 'X';
      } else {
        fabric[x + iw][y + ih] = 'F';
      }
    }
  }
});

let nonOverlappedId;

input.forEach((claim) => {
  const { id, x, y, w, h } = parseClaim(claim);

  let isOverlapped = false;

  for (let iw = 0; iw < w; iw++) {
    for (let ih = 0; ih < h; ih++) {
      if (!isOverlapped && fabric[x + iw][y + ih] === 'X') {
        isOverlapped = true;
      }
    }
  }

  if (!isOverlapped) {
    nonOverlappedId = id;
  }
});

printResult(nonOverlappedId);
