console.log('hello advent! 02 a');

const fs = require('fs');

const all_numbers = fs.readFileSync('02a.txt', 'utf8');
const arr = all_numbers.split('\n');
const length = arr.length;

const passwords = [];

function parse(line) {
    const parts = line.split(':');
    const rules = parts[0].split(' ');
    const limits = rules[0].split('-');
    return {
        min: parseInt(limits[0]),
        max: parseInt(limits[1]),
        char: rules[1],
        pass: parts[1].trim()
    };
}

for (let index = 0; index < length; index++) {
    const line = arr[index];
    passwords[index] = parse(line);
}

var valids = 0;

function validate(rule) {
    if (!(rule.pass[rule.min - 1] === rule.char && rule.pass[rule.max - 1] === rule.char)) {
        if (rule.pass[rule.min - 1] === rule.char || rule.pass[rule.max - 1] === rule.char) {
            return true;
        }
    }
    return false;
}

for (let index = 0; index < length; index++) {
    // console.log('passwords: ', passwords[index]);
    const rule = passwords[index];
    if (validate(rule)) {
        valids++;
        console.log('valid: ', rule);
    }
}
console.log('valid passwords:', valids, 'out of', length);
console.log('fin 02a');
//solution: 335

