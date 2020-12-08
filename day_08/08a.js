console.log('hello advent! 08 a\n');

const fs = require('fs');

const raw_program = fs.readFileSync('08a.txt', 'utf8').split('\n');
const sscanf = require('scanf').sscanf;

const full_program = [];
for (const lin of raw_program) {
    const ins = sscanf(lin, '%s %d', 'opp', 'val');
    console.log(lin, ins);
    full_program.push(ins);
}
console.log('\n');
function execute_one(code, state) {
    const ins = code[state.line];
    const next_state = {
        line: 0,
        acc: state.acc
    };
    if (ins.opp === 'acc') {
        next_state.acc += ins.val;
        next_state.line = state.line + 1;
    } else if (ins.opp === 'jmp') {
        next_state.line += state.line + ins.val;
    } else if (ins.opp === 'nop') {
        next_state.line = state.line + 1;
    }
    console.log('executing: ', ins, 'with', state, '=', next_state);
    return next_state;
}

const initial_state = { line: 0, acc: 0 };

function run_until_loop(program, ini_state) {
    const visited = new Set();
    let state = ini_state;
    while(true) {
        console.log('loop:', state, visited);
        if (visited.has(state.line)) {//already visited!
            break;
        }
        visited.add(state.line);
        state = execute_one(program, state);
    }
    return state;
}

console.log(run_until_loop(full_program, initial_state));
//answer: 1709