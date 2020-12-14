"use strict";
console.log('hello advent! 14 b');

const fs = require('fs');
const sscanf = require('scanf').sscanf;

const rawinst = fs.readFileSync('14.txt', 'utf8').split('\n');

const rules = [];

for (const line of rawinst) {
    if (line.startsWith('mask')) {
        rules.push({ mask: line.split('=')[1].trim() });
    } else {
        const item = sscanf(line, 'mem[%d] = %d', 'addr', 'val');
        rules.push(item);
    }
}

function dec2bin(dec){
    return (dec >>> 0).toString(2);
}

function rs(str) {//REVERSE STRING
    return str.split('').reverse().join('');
}

function rev_app_mask(mask, value) {//it's easier to reason backwards and just reverse everything
    return rs(apply_mask(rs(mask), rs(value)));
}

function apply_mask(mask, value) {
    let result = '0'.repeat(36).split('');
    for (let ii = 0; ii < mask.length; ii++) {
        switch (mask[ii]) {
            case 'X':
                result[ii] = 'X';
                break;
            case '1':
                result[ii] = '1';
                break;
            case '0':
                result[ii] = ii < value.length? value[ii] : result[ii];
        }
    }
    // console.log('am: ', rs(mask), rs(value), '=>', rs(result.join('')));
    return result.join('');
}

console.log(rules);

function multiply_x(masked) {
    const result = [];
    for (let ii = 0; ii < masked.length; ii++) {
        const copy = masked.repeat(1).split('');
        if (masked[ii] === 'X') {
            if ( ii === masked.length - 1 || masked.substring( ii + 1 ).indexOf('X') < 0 ) {
                copy[ii] = 0;
                result.push( copy.join('') );
                copy[ii] = 1;
                result.push( copy.join('') );
                break;
            } else {
                copy[ii] = 0;
                result.push(...multiply_x(copy.join(''))); //...flattens the list
                copy[ii] = 1;
                result.push(...multiply_x(copy.join('')));
                break;
            }
        }
    }
    return result;
}

const memory = new Map();

let mask;
for (const rr of rules) {
    if (rr.mask) {
        mask = rr.mask;
    } else {
        const addr_bin = dec2bin(rr.addr);
        const addresses = multiply_x(rev_app_mask(mask, addr_bin));
        for (const addr of addresses) {
            memory.set(parseInt(addr, 2), dec2bin(rr.val));
        }
    }
}

console.log(memory.size);

let total = 0;
for (const mem of memory.values()) {
    total += parseInt(mem, 2);
}
console.log('total 14b:', total);
//answer: 5272149590143
//this code breaks for 14.harder.txt. It's just too much recursion

