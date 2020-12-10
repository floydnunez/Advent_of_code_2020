console.log('hello advent! 07 b\n');

const fs = require('fs');

const raw_rules = fs.readFileSync('07a.txt', 'utf8').split('\n');
const sscanf = require('scanf').sscanf;

const rules = new Map();
const raw = new Map();
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
    raw.set(key, line[1]);
    const raw_values = line[1].split(',');
    const vals = [];
    for (let vi = 0; vi < raw_values.length; vi++) {
        const part = raw_values[vi];
        vals.push(singularize(part)); //numbers begone
    }
    rules.set(key, vals);
}

function recursive_find(rules, objective, pre, multiplier) {
    const contained = rules.get(objective);
    if (!contained) {
        console.log(pre, multiplier, objective, '(end)');
        return 1;
    }
    var total = 0;
    console.log(pre, multiplier, objective, '->', raw.get(objective));
    for (const bag of contained) {
        const parts = bag.split(' ');
        const submult = parseInt(parts[0]);
        const subbag = parts[1] + ' ' + parts[2] + ' ' + parts[3];
        const rf = recursive_find(rules, subbag, pre + ' - ', submult);
        total += submult * rf;
    }

    console.log(pre, '- ', total, 'subtotal for', objective);
    console.log(pre, multiplier * total, 'total bags for', objective);
    return total + 1;
}

const find_all = recursive_find(rules, 'shiny gold bag', '', 1);
console.log(find_all - 1);
//answer 1664