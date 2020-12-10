console.log('hello advent! 09 a');

const fs = require('fs');

const preamble = 25;
const raw_numbers = fs.readFileSync('09a.txt', 'utf8').split('\n');
const length = raw_numbers.length;

const numbers = [];
for (let index = 0; index < raw_numbers.length; index++) {
    numbers[index] = parseInt(raw_numbers[index]);
}

function check_sum(issum, data, before, current) {
    const pre_adders = data.slice(current - before, current);
    // console.log('checking', issum, 'is sum of', pre_adders);
    for (let first = 0; first < pre_adders.length; first++) {
        for (let second = first + 1; second < pre_adders.length; second++) {
            if (second === first) {
                continue;
            }
            // console.log(pre_adders[first], '+', pre_adders[second], '=', pre_adders[first] + pre_adders[second],
            //     '===', issum, '?', pre_adders[first] + pre_adders[second] === issum);
            if (issum === pre_adders[first] + pre_adders[second]) {
                // console.log('is actual sum');
                return data[first];
            }
        }
    }
    return -1;
}

let invalid = -1;
for (let index = preamble; index < length; index++) {
    const candidate = numbers[index];
    if (check_sum(candidate, numbers, preamble, index) < 0) {
        invalid = candidate;
        break;
    }
}
console.log('invalid:', invalid);
let slice = [];
outer: for (let index = 0; index < numbers.length; index++) {
    var total = 0;
    for (let sub = index; sub < numbers.length; sub++) {
        total += numbers[sub];
        if (sub === index) {
            continue;
        }
        // console.log('checking from', index, 'to', sub, '=', total, '=?', total === invalid);
        if (total === invalid) {
            slice = numbers.slice(index, sub+1);
            break outer;
        }
    }
}
if (slice === []) {
    console.log('no sum!');
} else {
    console.log('slice =', slice);
}
let max = 0, min = 9999999999999999;
for (let index = 0; index < slice.length; index++) {
    const num = slice[index];
    if (max < num) {
        max = num;
    }
    if (min > num) {
        min = num;
    }
}
console.log('answer: ', min, max, '=', min + max);
//answer: 23278925