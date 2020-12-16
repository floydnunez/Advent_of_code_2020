"use strict"
console.log('hello advent! 16 a');

const fs = require('fs');
const sscanf = require('scanf').sscanf;

const data = fs.readFileSync('16.txt', 'utf8').split('\n');
const length = data.length;

const rules = [];
let my_ticket;
const all_tickets = [];

let state = 0;
for (const line of data) {
    if (line.trim() === 'your ticket:' || line.trim() === 'nearby tickets:') {
        state++;
        continue;
    }
    if (line === '') {
        continue;
    }
    console.log('state:', state, 'line:', line);
    if (state === 0) {
        let rule = sscanf(line, '%s %s: %d-%d or %d-%d', 'name1', 'name2', 'min1', 'max1', 'min2', 'max2');
        rule.name = rule.name1 + ' ' + rule.name2;
        delete rule.name1;
        delete rule.name2;
        if (rule.max2 === null) {
            rule = sscanf(line, '%s: %d-%d or %d-%d', 'name', 'min1', 'max1', 'min2', 'max2');
        }
        rules.push(rule);
    } else if (state === 1) {
        my_ticket = line.split(',').map( n => parseInt(n) );
    } else if (state === 2) {
        const parts = line.split(',').map( n => parseInt(n) );
        all_tickets.push(parts);
    }
}
console.log('rules:', rules);
console.log('my_ticket:', my_ticket);
console.log('tickets:', all_tickets[all_tickets.length-1]);

const all_invalid = [];
for (const ticket of all_tickets) {
    for (const elem of ticket) {
        let any_valid = false;
        for (const rule of rules) {
            if ((elem >= rule.min1 && elem <= rule.max1) || (elem >= rule.min2 && elem <= rule.max2)) {
                any_valid = true;
                break;
            }
        }
        if (!any_valid) {
            all_invalid.push(elem);
        }
    }
}

console.log('all invalid: ', all_invalid);
let total = 0;
all_invalid.map( n => total += n );
console.log(total);