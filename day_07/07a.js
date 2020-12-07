console.log('hello advent! 07 a\n');

const fs = require('fs');

const raw_rules = fs.readFileSync('07a.txt', 'utf8').split('\n');
const sscanf = require('scanf').sscanf;

const rules = new Map();

function singularize(string) {
    let ss = string.trim();
    if ('.' === ss[ss.length - 1]) {
        ss = ss.slice(0, ss.length - 1);
    }
    if ('s' === ss[ss.length - 1]) {
        ss = ss.slice(0, ss.length - 1);
    }
    return ss;
}

function unmultiply(string) {
    let ss = string.split(' ');
    return ss[1] + ' ' + ss[2] + ' ' + ss[3];
}

for (let rr = 0; rr < raw_rules.length; rr++) {
    const line = raw_rules[rr].split('contain');
    const key = singularize(line[0]);
    if (line[1].trim() === 'no other bags.') {//endpoints are eliminated
        continue;
    }
    const raw_values = line[1].split(',');
    const vals = [];
    for (let vi = 0; vi < raw_values.length; vi++) {
        const part = raw_values[vi];
        vals.push(unmultiply(singularize(part))); //numbers begone
    }
    rules.set(key, vals);
}

function recursive_find(rules, objective) {
    // console.log('entries:', rules.entries());
    const result = new Set();
    const container = new Set();
    for (const [key, val] of rules.entries()) {
        if (val.includes(objective)) {
            container.add(key);
            result.add(key);
        }
    }
    for (const bag of container) {
        const subset = recursive_find(rules, bag);
        subset.forEach(result.add, result);
    }
    return result;
}

const find_all = recursive_find(rules, 'shiny gold bag');

console.log(find_all);
