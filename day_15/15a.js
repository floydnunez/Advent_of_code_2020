"use strict";
console.log('hello advent! 15 a');

const input = [0,6,1,7,2,19,20];
const input_example = [0,3,6];
const input_example2 = [1,3,2];
const input_example3 = [2,1,3];

const initial = input;

const sequence = [...initial];

function get_repeats_last(sequence) {
    const length = sequence.length;
    const last = sequence[length - 1];
    // console.log('searching for ', last);
    let distance = 1;
    for (let ii = length - 2; ii >= 0; ii--) {
        const elem = sequence[ii];
        if (elem === last) {
            // console.log('last time repeated:', distance);
            return distance;
        }
        distance++;
    }
    // console.log('never repeated');
    return 0;
}
const max = 2020;
for (let count = 0; count < max; count++) {
    sequence.push(get_repeats_last(sequence));
}

console.log(sequence);
console.log('answer:', sequence[max - 1]);
//answer: 706