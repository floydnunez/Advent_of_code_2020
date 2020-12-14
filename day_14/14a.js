"use strict";
console.log('hello advent! 14 a');

const fs = require('fs');
const sscanf = require('scanf').sscanf;


const rawinst = fs.readFileSync('14.txt', 'utf8').split('\n');

const rules = [];

for (const line of rawinst) {
    if (line.startsWith('mask')) {
        rules.push({ mask: line.split('=')[1].trim() });
    } else {
        rules.push(sscanf(line, 'mem[%d] = %d', 'addr', 'val'));
    }
}

function dec2bin(dec){
    return (dec >>> 0).toString(2);
}

function rs(str) {
    return str.split('').reverse().join('');
}

function rev_app_mask(mask, value) {
    return rs(apply_mask(rs(mask), rs(value)));
}

function apply_mask(mask, value) {
    let result = '';
    for (let ii = 0; ii < mask.length; ii++) {
        if (ii < value.length) {
            result += mask[ii] === 'X' ? value[ii] : mask[ii];
        } else {
            result += mask[ii] === 'X' ? 0 : mask[ii];
        }
    }
    return result;
}

console.log(rules);

const memory = [];

let rmask;
for (const rr of rules) {
    if (rr.mask) {
        rmask = rs(rr.mask);
    } else {
        const val = rs(dec2bin(rr.val));
        console.log('current mask', rmask);
        console.log('rule:', val);
        memory[rr.addr] = parseInt(rs(apply_mask(rmask, val)), 2);
    }
}

let total = 0;
for (const elem of memory) {
    if (elem) {
        total += elem;
    }
}
console.log(total);
//answer: 5875750429995