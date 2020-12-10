console.log('hello advent! 09 a');

const fs = require('fs');

const preamble = 5;
const raw_numbers = fs.readFileSync('09example.txt', 'utf8').split('\n');
const length = raw_numbers.length;

const numbers = [];
for (let index = 0; index < raw_numbers.length; index++) {
    numbers[index] = parseInt(raw_numbers[index]);
}


function check_sum(issum, data, before, current) {
    const pre_adders = data.slice(current - before, current);
    console.log('checking', issum, 'is sum of', pre_adders);
    for (let first = 0; first < pre_adders.length; first++) {
        for (let second = first + 1; second < pre_adders.length; second++) {
            if (second === first) {
                continue;
            }
            console.log(pre_adders[first], '+', pre_adders[second], '=', pre_adders[first] + pre_adders[second],
                '===', issum, '?', pre_adders[first] + pre_adders[second] === issum);
            if (issum === pre_adders[first] + pre_adders[second]) {
                console.log('is actual sum');
                return data[first];
            }
        }
    }
    return -1;
}

for (let index = preamble; index < length; index++) {
    const candidate = numbers[index];
    if (check_sum(candidate, numbers, preamble, index) < 0) {
        console.log('answer: ', candidate);
        break;
    }
}
//answer: 23278925