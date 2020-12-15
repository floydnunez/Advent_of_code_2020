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

const initial = input_example7;

const sequence = [...initial];

let mentioned = new Map();
for (let ii = 0; ii < initial.length; ii++) {
    mentioned.set(initial[ii], [ii]);
}
console.log('mentioned:', mentioned);

function add_to_mentioned(ment, diff, pos) {
    // console.log('adding', diff, 'at', pos, 'to', ment);
    if (ment.has(diff)) {
        const positions = ment.get(diff);
        positions.push(pos);
        ment.set(diff, positions);
    } else {
        ment.set(diff, [pos]);
    }
}

function get_repeats_last(sequence) {
    const length = sequence.length;
    const last = sequence[length - 1];
    // console.log('looking for', last, 'in', sequence, mentioned);
    const positions = mentioned.get(last);
    if (positions.length === 1) {
        const last_pos = positions[0];
        const diff = length - last_pos - 1;
        add_to_mentioned(mentioned, diff, length);
        return diff;
    } else {
        const pos_length = positions.length;
        // console.log('positions:', positions, pos_length);
        const last = positions[pos_length - 1];
        const next_to_last = positions[pos_length - 2];
        // console.log('last:', last, 'next to last:', next_to_last);
        const diff = last - next_to_last;
        add_to_mentioned(mentioned, diff, length);
        return diff;
    }
}

const max = 2020;//30_000_001;
for (let count = 0; count < max; count++) {
    if (count % 1_000_000 === 0) {
        console.log('at', count);
    }
    sequence.push(get_repeats_last(sequence));
}

console.log(sequence);
console.log('answer:', sequence[max-1]);
console.log(mentioned);