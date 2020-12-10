console.log('hello advent! 10 b');

const fs = require('fs');

const preamble = 5;
const joltages = fs.readFileSync('10a.txt', 'utf8').split('\n').map(n => parseInt(n));
joltages.push(0);
joltages.sort((n,m)=> m - n);
console.log(joltages);
const max_joltage = joltages[0] + 3;
console.log('max_joltage', max_joltage);

function get_less_3_2_1(jolts, first) {
    const less_3_2_1 = [];
    for (const jolt of jolts) {
        if (first === jolt + 1) {
            less_3_2_1.push(jolt);
        } else if (first === jolt + 2) {
            less_3_2_1.push(jolt);
        } else if (first === jolt + 3) {
            less_3_2_1.push(jolt);
        } else if (first > jolt + 3) {
            break;
        }
    }
    return less_3_2_1;
}

const output = false;
function permutate(jolts, first) {
    output && console.log('permutate i', jolts, first);
    if (jolts.length === 0) {
        return [[first]];
    }
    const less_3_2_1 = get_less_3_2_1(jolts, first);
    if (less_3_2_1.length === 0) {
        return [[first]];
    }
    const all_results = [];
    output && console.log('less_3_2_1',less_3_2_1);
    for (const next of less_3_2_1) {
        output && console.log('next', next);
        const results = permutate(jolts.slice(1), next);
        output && console.log('results:', results);
        for (const elem of results) {
            all_results.push([first, ...elem]);
        }
    }
    output && console.log('permutate f', jolts, first, all_results);
    return all_results;
}
const answers = permutate(joltages, max_joltage);
// console.log('all:', answers);
console.log('answers:',answers.length)

//THIS IS STUPID AND WON'T EVER FINISH