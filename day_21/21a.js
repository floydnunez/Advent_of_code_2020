"use strict"
console.log('hello advent! 21 a');

const fs = require('fs');

const test = true;
const data = fs.readFileSync( test? '21.e.txt': '21.txt', 'utf8').split('\n');
const length = data.length;
