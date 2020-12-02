console.log('hello advent! 02 a');

const fs = require('fs');
const sscanf = require('scanf').sscanf;


const pass_rules = fs.readFileSync('02a.txt', 'utf8').split('\n');
const length = pass_rules.length;

const rules = [];

pass_rules.forEach(prk => rules.push(sscanf(prk, '%d-%d %s: %s', 'min', 'max', 'char', 'pass')));

var valids = 0;
rules.forEach(rule => {
    const occurrences = rule.pass.split(rule.char).length - 1;
    if (occurrences >= rule.min && occurrences <= rule.max) {
        console.log('rule:', rule);
        valids++;
    }
});
console.log('valid passwords: ', valids, 'out of', length);
console.log('fin 02a');
//solution: 591