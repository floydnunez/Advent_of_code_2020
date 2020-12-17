"use strict"
console.log('hello advent! 17 b');

const fs = require('fs');

const test = false;
const data = fs.readFileSync( test? '17.e.txt': '17.txt', 'utf8').split('\n');
const length = data.length;


const size = test? 20: 50;

function create_space(side) {
    const space = new Array(side);
    for (let xx = 0; xx < side; xx++) {
        space[xx] = new Array(side);
        for (let yy = 0; yy < side; yy++) {
            space[xx][yy] = new Array(side);
            for (let zz = 0; zz < side; zz++) {
                space[xx][yy][zz] = new Array(side);
                for (let ww = 0; ww < side; ww++) {
                    space[xx][yy][zz][ww] = '.';
                }
            }
        }
    }
    return space;
}

const space = create_space(size);

function set_data_in_middle(init, size_param, cube) {
    const initial_x_y = Math.floor(size_param/2);
    const initial_z_w = Math.floor(size_param/2) - Math.floor(init.length/2 );
    for (let zz = 0; zz < init.length; zz++) {
        for (let ww = 0; ww < init.length; ww++) {
            cube[initial_x_y][initial_x_y][zz + initial_z_w][ww + initial_z_w] = data[zz][ww];
        }
    }
}

function print_layer(cube, number) {
    number = Math.floor(number);
    for (let zz = 0; zz < cube.length; zz++) {
        const line = cube[number][number][zz].join('');
        let neighbourhood = '';
        if (test) {
            for (let ww = 0; ww < cube.length; ww++) {
                neighbourhood += count_neighbours(cube, number, number, zz, ww);
            }
        }
        console.log(line + ' ' + neighbourhood);
    }
    console.log('--------------');
}

set_data_in_middle(data, size, space);

print_layer(space, size/2);

function count_neighbours(cube, xx_pos, yy_pos, zz_pos, ww_pos) {
    let neighbours = 0;
    for (let xx = xx_pos - 1; xx <= xx_pos + 1; xx++) {
        if (xx < 0 || xx >= cube.length)
            continue;
        for (let yy = yy_pos - 1; yy <= yy_pos + 1; yy++) {
            if (yy < 0 || yy >= cube.length)
                continue;
            for (let zz = zz_pos - 1; zz <= zz_pos + 1; zz++) {
                if (zz < 0 || zz >= cube.length)
                    continue;
                for (let ww = ww_pos - 1; ww <= ww_pos + 1; ww++) {
                    if (ww < 0 || ww >= cube.length)
                        continue;
                    if (xx === xx_pos && yy === yy_pos && zz === zz_pos && ww === ww_pos)
                        continue;
                    if (cube[xx][yy][zz][ww] === '#') {
                        neighbours++;
                    }
                }
            }
        }
    }
    return neighbours > 9 ? 9: neighbours;
}

function apply_rules(cube) {
    let total = 0;
    const side = cube.length;
    const next = create_space(side);
    for (let xx = 0; xx < side; xx++) {
        for (let yy = 0; yy < side; yy++) {
            for (let zz = 0; zz < side; zz++) {
                for (let ww = 0; ww < side; ww++) {
                    const neighbours = count_neighbours(cube, xx, yy, zz, ww);
                    const tile = cube[xx][yy][zz][ww];
                    if (tile === '#' && (neighbours === 2 || neighbours === 3)) {
                        next[xx][yy][zz][ww] = '#';
                        total++;
                    } else if (tile === '#') {
                        next[xx][yy][zz][ww] = '.';
                    }
                    if (tile === '.' && neighbours === 3) {
                        next[xx][yy][zz][ww] = '#';
                        total++;

                    } else if (tile === '.') {
                        next[xx][yy][zz][ww] = '.';
                    }
                }
            }
        }
    }
    return { cube:next, total: total };
}

let curr_space = space;
const steps = 6;
for (let i = 0; i < steps; i++) {
    const next_space_total = apply_rules(curr_space);
    curr_space = next_space_total.cube;
    print_layer(curr_space, size/2);
    console.log('total:', next_space_total.total);
}
//answer: 211
