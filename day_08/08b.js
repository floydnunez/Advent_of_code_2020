console.log('hello advent! 08 a\n');

const fs = require('fs');

const raw_program = fs.readFileSync('08a.txt', 'utf8').split('\n');
const sscanf = require('scanf').sscanf;

const full_program = [];
for (const lin of raw_program) {
    const ins = sscanf(lin, '%s %d', 'opp', 'val');
    // console.log(lin, ins);
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
    // console.log('executing: ', ins, 'with', state, '=', next_state);
    return next_state;
}

const initial_state = { line: 0, acc: 0 };

function clone(obj){
    return JSON.parse(JSON.stringify(obj));
}

function run_until_loop(visited, program, ini_state) {
    let state = ini_state;
    while(true) {
        // console.log('loop:', state);
        if (visited.has(state.line)) {//already visited!
            break;
        }
        if (state.line >= program.length) {
            state.exit = true;
            break;
        }
        visited.add(state.line);
        state = execute_one(program, state);
    }
    return state;
}

function run_modified_at(original_program, ini_state, line) {
    const program = clone(original_program);
    const initial = clone(ini_state);
    if (program[line].opp === 'acc') {
        return ini_state;
    }
    program[line].opp = program[line].opp === 'nop'? 'jmp' : 'nop';
    return run_until_loop(new Set(), program, initial);
}

for (let index = full_program.length - 1; index >= 0; index--) {
    const result = run_modified_at(full_program, initial_state, index);
    if (result.exit) {
        console.log('exit when modifying line', index, result);
    }
}
//answer: 1976