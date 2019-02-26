#!/usr/bin/env node

const input = require('./input');
const printResult = require('../printResult');

const parseEntry = (entry) => {
  const match = entry.match(/\[(.+)\]\s(.+)/);
  
  return {
    dateTime: new Date(match[1]),
    data: match[2]
  };
}

const addMinutes = (dt, minutes) => new Date(dt.getTime() + minutes*60000);

const parsedEntries = input.map(parseEntry);
const sortedByDate = parsedEntries.sort((a, b) => b.dateTime - a.dateTime).reverse();

let schedule = {};
let currentId;
let sleepStartTime;

sortedByDate.forEach(entry => {
  if (entry.data.includes('begins shift')) {
    currentId = entry.data.split(' ')[1];

    if (!schedule[currentId]) {
      schedule[currentId] = {
        totalTimeSlept: 0,
        minutesSlept: [],
      }
    }
  }

  if (entry.data.includes('falls asleep')) {
    sleepStartTime = entry.dateTime;
  }

  if (entry.data.includes('wakes up')) {
    const timeAsleep = entry.dateTime.getTime() - sleepStartTime.getTime();
    schedule[currentId].totalTimeSlept = schedule[currentId].totalTimeSlept + timeAsleep;
    
    let currentTime = sleepStartTime;
    while(currentTime.getTime() < entry.dateTime.getTime()) {
      schedule[currentId].minutesSlept.push(entry.dateTime.getMinutes());
      currentTime = addMinutes(currentTime, 1);
    }
  }
});

const guardWithMostSleep = Object.keys(schedule).sort((a, b) => {
  return schedule[b].totalTimeSlept - schedule[a].totalTimeSlept;
}).reverse().pop();

let currentLargestMinute = 0;
let currentLargestCount = 0;;

const mostCommonMinutesSlept = schedule[guardWithMostSleep].minutesSlept.forEach(minute => {
  const count = schedule[guardWithMostSleep].minutesSlept.reduce((count, m) => {
    if (m === minute) {
      count += 1;
    }
    return count;
  });

  if (count > currentLargestCount) {
    currentLargestMinute = minute;
    currentLargestCount = count;
  }
});

const guardId = parseInt(guardWithMostSleep.replace('#', ''));

printResult(guardId + ' * ' + currentLargestMinute + ' = ' + guardId * currentLargestMinute);
