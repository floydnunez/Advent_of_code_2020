"use strict"
console.log('hello advent! 19 a');

const fs = require('fs');

const test = true;
const data = fs.readFileSync( test? '19.e.txt': '19.txt', 'utf8').split('\n');
const length = data.length;

const rules = new Map();
const strings = [];

function parse_rule(str) {
    if (str.includes('"')) {
        return { opt_1: false, opt_2: false, char: str.substring(1,2) };
    }
    if (str.includes('|')) {
        const partes = str.split(' | ');
        return { opt_1: partes[0].split(' '), opt_2: partes[1].split(' '), char: false };
    }
    return { opt_1: str.split(' '), opt_2: false, char: false };
}

let rules_section = true;
for (const line of data) {
    console.log(line);
    if (line === '') {
        rules_section = false;
        continue;
    }
    if (rules_section) {
        const partes = line.split(':');
        rules.set(partes[0], parse_rule(partes[1].trim()));
    } else {
        strings.push(line);
    }
}

const reverse_rules = new Map();

function add_all(list, key) {
    for (const opt of list) {
        if (reverse_rules.has(opt)) {
            const list = reverse_rules.get(opt);
            if (!list.includes(key)) {
                list.push(key);
            }
        } else {
            reverse_rules.set(opt, [key]);
        }
    }
}

for (const entry of rules.entries()) {
    const key = entry[0];
    const val = entry[1];
    if (val.char) {
        reverse_rules.set(val.char, [key]);
    }
    if (val.opt_1) {
        add_all(val.opt_1, key);
    }
    if (val.opt_2) {
        add_all(val.opt_2, key);
    }
}

console.log(rules);

console.log(strings);

const rights = [], wrongs = [];

console.log('reverse rules:', reverse_rules);

function check_line(line) {
    let result = true;
    let rules_applied = line.split('');

    console.log('rules_applied:', rules_applied);
    return rules_applied[0] === '0';
}

for (const line of strings) {
    const is_line_in_rules = check_line(line);
    if (is_line_in_rules) {
        rights.push(line);
    } else {
        wrongs.push(line);
    }
}
console.log('rights', rights);
console.log('wrongs', wrongs);
