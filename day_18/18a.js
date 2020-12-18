"use strict"
console.log('hello advent! 18 a');

const fs = require('fs');

const test = false;
const data = fs.readFileSync( test? '18.e2.txt': '18.txt', 'utf8').split('\n');
const length = data.length;

let total = 0;

function apply_oper(pre, prev_number, curr_oper, number) {
    test && console.log(pre, 'apply:', prev_number, curr_oper, number);
    if (curr_oper === '+') {
        return prev_number + number;
    } else if (curr_oper === '*') {
        return prev_number * number;
    }
    return number;
}

function parseLine(pre, str) {
    test && console.log(pre, 'parseLine:', str);
    let total = 0;
    let curr_oper = '';
    for(let ii = 0; ii < str.length; ii++) {
        let char = str[ii];
        test && console.log(pre, 'parseLine: str[', ii, ']=', char, '.');
        switch (char) {
            case ' ':
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                if (total === 0) {
                    total = parseInt(char);
                } else {
                    total = apply_oper(pre, total, curr_oper, parseInt(char));
                }
                test && console.log(pre, 'raw number: total:', total);
                break;
            case '+':
            case '*':
                curr_oper = char;
                test && console.log(pre, 'current operation:', char);
                break;
            case '(':
                test && console.log(pre, 'recursive call: current total', total, 'oper', curr_oper);
                const subtotal = parseLine(pre + '  ',  str.substring(ii + 1) );
                total = apply_oper(pre, total, curr_oper, subtotal[0]);
                test && console.log(pre, 'skipping from', ii, 'to', ii + subtotal[1] + 1);
                ii += subtotal[1] + 1;
                break;
            case ')':
                test && console.log(pre, 'end recursive call:', total, 'at', ii);
                return [total, ii];
        }
    }
    return [total, str.length];
}

for (const line of data) {
    total += parseLine(' ', line)[0];
}
console.log(total);

