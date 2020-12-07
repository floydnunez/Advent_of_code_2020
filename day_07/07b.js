console.log('hello advent! 07 b\n');

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
        vals.push(singularize(part)); //numbers begone
    }
    rules.set(key, vals);
}

// console.log(rules);


function recursive_find(rules, objective, pre) {
    console.log(pre, objective);
    const contained = rules.get(objective);
    if (!contained) {
        console.log(pre, 1, 'for', objective);
        return 1;
    }
    var total = 0;
    console.log(pre, contained);
    for (const bag of contained) {
        const parts = bag.split(' ');
        const submult = parseInt(parts[0]);
        const subbag = parts[1] + ' ' + parts[2] + ' ' + parts[3];
        const rf = recursive_find(rules, subbag, pre + ' - ');
        // console.log(pre, 'total: ', submult * rf, 'for', objective);
        total += submult * rf;
    }
    console.log(pre, total, 'for', objective);
    return total;
}

const find_all = recursive_find(rules, 'shiny gold bag', '');
console.log(find_all);