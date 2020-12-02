// https://www.reddit.com/r/adventofcode/comments/k52psu/2020_day_02_solutions/gedehb1/?utm_source=reddit&utm_medium=web2x&context=3
const fs = require('fs');
const sscanf = require('scanf').sscanf;

const pass_rules = fs.readFileSync('02a.txt', 'utf8').split('\n');

const rules = [];

pass_rules.forEach(prk => rules.push(sscanf(prk, '%d-%d %s: %s', 'min', 'max', 'char', 'pass')));

var valids_2a = 0;
rules.forEach(rule => {
    const occurrences = rule.pass.split(rule.char).length - 1;
    if (occurrences >= rule.min && occurrences <= rule.max) {
        valids_2a++;
    }
});
console.log('valid passwords: ', valids_2a, 'out of', length);

function validate(rule) {
    if (!(rule.pass[rule.min - 1] === rule.char && rule.pass[rule.max - 1] === rule.char)) {
        if (rule.pass[rule.min - 1] === rule.char || rule.pass[rule.max - 1] === rule.char) {
            return true;
        }
    }
    return false;
}

const valids_2b = rules.filter(rule=> validate(rule));
console.log('valid passwords: ', valids_2b.length, 'out of', length);
console.log('fin 02a');
