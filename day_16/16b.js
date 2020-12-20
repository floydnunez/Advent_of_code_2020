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
const wrong_tickets = [];
let index = 0;
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
            wrong_tickets.push(index);
        }
    }
    index++;
}
console.log('wrong tickets', wrong_tickets);
const good_tickets = [];
for (let ii = 0; ii < all_tickets.length; ii++) {
    const ticket = all_tickets[ii];
    if (wrong_tickets.indexOf(ii) < 0) {
        good_tickets.push(ticket);
    }
}

function val_rule(rule, elem) {
    if ((elem >= rule.min1 && elem <= rule.max1) || (elem >= rule.min2 && elem <= rule.max2)) {
        return true;
    }
    return false;
}

console.log('all invalid: ', all_invalid);
let total = 0;
all_invalid.map( n => total += n );
console.log(all_tickets.length);
console.log(good_tickets.length);

const bad_index_sets = [];
for (const rule of rules) {
    const incorrect_indexes = new Set();
    for (const ticket of good_tickets) {
        for (let ii = 0; ii < ticket.length; ii++) {
            const elem = ticket[ii];
            if (!val_rule(rule, elem)) {
                incorrect_indexes.add(ii);
            }
        }
    }
    bad_index_sets.push( { rule: rule, wrongs: incorrect_indexes } );
}

bad_index_sets.sort( (n,m) => m.wrongs.size - n.wrongs.size );
console.log('bad_index_sets:', bad_index_sets);

function arrayRemove(arr, value) {
    return arr.filter(function(ele){
        return ele !== value;
    });
}

const rule_order = [];
let possibilities = []
for (let ii = 0; ii < rules.length; ii++) {
    possibilities.push(ii);
}
console.log('ordering:', possibilities);
for (const rule_bads of bad_index_sets) {
    console.log('processing', rule_bads)
    for (let ii = 0; ii < possibilities.length; ii++) {
        const possible = possibilities[ii];
        console.log('checking', possible, 'in', rule_bads.wrongs);
        if (!rule_bads.wrongs.has(possible)) {
            rule_order[possible] = rule_bads.rule;
            console.log('removing element', ii, 'from', possibilities)
            possibilities = arrayRemove(possibilities, possible);
            console.log('removed: new possibilities: ', possibilities)
            break;
        }
    }
}

console.log(rule_order);
console.log('-----------\n');
console.log('my ticket:', my_ticket);
let mult_total = 1;
const totals = [];
for (let ii = 0; ii < rule_order.length; ii++) {
    const rule = rule_order[ii];
    if (rule.name1 === 'departure') {
        console.log('multiplying', rule.name, 'val:', my_ticket[ii], rule);
        const val = my_ticket[ii];
        mult_total *= val;
        totals.push(val);
    }
}
console.log(totals.join(' * '));
console.log('ANSWER:', mult_total);