console.log('hello advent! 01 a');

const fs = require('fs');
const sscanf = require('scanf').sscanf;


const pass_rules = fs.readFileSync('02a.txt', 'utf8').split('\n');
const length = pass_rules.length;

const rules = [];

pass_rules.forEach(prk => rules.push(sscanf(prk, '%d-%d %s: %s', 'min', 'max', 'char', 'pass')));

function validate(rule) {
    if (!(rule.pass[rule.min - 1] === rule.char && rule.pass[rule.max - 1] === rule.char)) {
        if (rule.pass[rule.min - 1] === rule.char || rule.pass[rule.max - 1] === rule.char) {
            return true;
        }
    }
    return false;
}

const valids = rules.filter(rule=> validate(rule));
console.log('valids: ', valids)
console.log('valid passwords: ', valids.length, 'out of', length);
console.log('fin 02a');
//solution: 335