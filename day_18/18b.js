"use strict"
console.log('hello advent! 18 b');

const fs = require('fs');

const test = false;
const data = fs.readFileSync( test? '18.e4.txt': '18.txt', 'utf8').split('\n');
const length = data.length;

//instead of fixing part 1's function, let's just add parenthesis where necessary (around +s)
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
                test && console.log('( paren_count:', paren_count, paren_count === 0);
                if (paren_count === 0) {
                    test && console.log('putting open paren before open paren');
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
                paren_count--;
                if (paren_count === 0) {
                    result.splice(ii+1, 0, ')');
                    return;
                }
                break;
        }
    }
    result.splice(result.length, 0, ')');
    test && console.log('ma:', result, pos);}

function find_x_plus(result, which_one) {
    let amount_of_plus = 0;
    for (let ii = 0; ii < result.length; ii++) {
        if (result[ii] === '+') {
            if (amount_of_plus === which_one) {
                return ii;
            }
            amount_of_plus++;
        }
    }
}

function apply_parens(line) {
    let result = line.split('');
    let amount_of_plus = 0;
    for (let ii = 0; ii < line.length; ii++) {
        if (line[ii] === '+') {
            amount_of_plus++;
        }
    }
    test && console.log('amount_of_plus:', amount_of_plus);
    for (let ii = 0; ii < amount_of_plus; ii++) {
        const index = find_x_plus(result, ii)
        test && console.log('applying parens at', index, 'to', result.join(''));
        modify_before(result, index);
        modify_after(result, index + 1); //could be eliminated if we put modify_after first
    }
    return result.join('');
}

let final_total = 0;
let totals = [];
for (const line of data) {
    const paren_line = apply_parens(line);
    console.log(line);
    console.log(paren_line);
    const subtotal = parseLine(' ', paren_line)[0];
    console.log(subtotal);
    totals.push(subtotal);
    final_total += subtotal;
}
console.log('answer:', final_total);
//wrong: 32715860779828
//wrong: 639430447104 (too low?)
//wrong: 14505305253203244 (too high?)
//wrong: 223441367210079 (just wrong)
//answer: 321176691637769