"use strict"
console.log('hello advent! 18 b');

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

function modify_before(result, pos) {
    let paren_count = 0;
    for (let ii = pos - 1; ii >= 0; ii--) {
        let char = result[ii];
        test && console.log('modify_before: result[', ii, ']=', char, '.');
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
                if (paren_count === 0) {
                    result.splice(ii, 0, '(');
                    return;
                }
                break;
            case ')':
                paren_count++;
                break;
            case '(':
                paren_count--;
                if (paren_count === 0) {
                    result.splice(ii, 0, '(');
                    return;
                }
                break;
        }
    }
    result.splice(0, 0, '(');
    test && console.log('mb:', result, pos);
}

function modify_after(result, pos) {
    let paren_count = 0;
    for (let ii = pos + 1; ii < result.length; ii++) {
        let char = result[ii];
        test && console.log('modify_after: result[', ii, ']=', char, '.');
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
                if (paren_count === 0) {
                    result.splice(ii+1, 0, ')');
                    return;
                }
                break;
            case '(':
                paren_count++;
                break;
            case ')':
                if (paren_count === 0) {
                    result.splice(ii+1, 0, ')');
                    return;
                }
                paren_count--;
                break;
        }
    }
    result.splice(result.length, 0, ')');
    test && console.log('ma:', result, pos);}

function apply_parens(line) {
    let result = line.split('');
    let index_plus = [];
    for (let ii = 0; ii < line.length; ii++) {
        if (line[ii] === '+') {
            index_plus.push(ii);
        }
    }
    test && console.log(index_plus);
    let accumulated_extra = 0;
    for (const index of index_plus) {
        test && console.log('applying parens at', index + accumulated_extra, 'to', result.join(''));
        modify_before(result, index + accumulated_extra);
        accumulated_extra++;
        modify_after(result, index + accumulated_extra);
        accumulated_extra++;
    }
    return result.join('');
}

for (const line of data) {
    test && console.log(line);
    const paren_line = apply_parens(line);
    console.log(paren_line, '\n');
    total += parseLine(' ', paren_line)[0];
}
console.log(total);
//wrong: 32715860779828
