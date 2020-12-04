console.log('hello advent! 04 a');

const fs = require('fs');

const all_numbers = fs.readFileSync('04a.txt', 'utf8');
const arr = all_numbers.split('\n');
const length = arr.length;

const passwords = [];
for (let index = 0; index < length; index++) {
    const line = arr[index];
    const parts = line.split(':');
    const rules = parts[0].split(' ');
    const limits = rules[0].split('-');
    passwords[index] = {
        min: parseInt(limits[0]),
        max: parseInt(limits[1]),
        char: rules[1],
        pass: parts[1].trim()
    };
}
var valids = 0;
for (let index = 0; index < length; index++) {
    const rule = passwords[index];
    const occurrences = rule.pass.split(rule.char).length - 1;
    console.log('occurrences: ', occurrences, 'min:', rule.min, 'max:', rule.max);
    if (occurrences >= rule.min && occurrences <= rule.max) {
        console.log('solution: ', rule);
        valids++;
    }
}
console.log('valid passwords: ', valids, 'out of', length);
console.log('fin 02a');
//solution: 591