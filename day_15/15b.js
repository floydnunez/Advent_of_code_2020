"use strict";
console.log('hello advent! 15 b');

const input = [0,6,1,7,2,19,20];
const input_example = [0,3,6];
const input_example2 = [1,3,2];
const input_example3 = [2,1,3];
const input_example4 = [1,2,3];
const input_example5 = [2,3,1];
const input_example6 = [3,2,1];
const input_example7 = [3,1,2];

const initial = input;

const sequence = [...initial];

let mentioned = new Map();
for (let ii = 0; ii < initial.length; ii++) {
    mentioned.set(initial[ii], [ii, ii]);
}
console.log('mentioned:', mentioned);

function add_to_mentioned(ment, diff, pos) {
    if (ment.has(diff)) {
        const positions = ment.get(diff);
        positions.push(pos); //it's not necessary to re-set it as it is passed as reference
    } else {
        ment.set(diff, [pos, pos]);
    }
}

function get_repeats_last(sequence) {
    const length = sequence.length;
    const last = sequence[length - 1];

    const positions = mentioned.get(last);
    const last_pos = positions[positions.length - 1];
    const next_to_last_pos = positions[positions.length - 2];

    const diff = last_pos - next_to_last_pos;
    add_to_mentioned(mentioned, diff, length);
    return diff;
}

const max = 30000000;
for (let count = 0; count < max; count++) {
    if (count % 1_000_000 === 0) {
        console.log('at', count);
    }
    sequence.push(get_repeats_last(sequence));
}

console.log(sequence);
console.log('answer:', sequence[max-1]);
//answer: 19331