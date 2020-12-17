"use strict"
console.log('hello advent! 17 a');

const fs = require('fs');

const test = false;
const data = fs.readFileSync( test? '17.e.txt': '17.txt', 'utf8').split('\n');
const length = data.length;


const size = test? 12: 100;

function create_space(side) {
    const space = new Array(side);
    for (let xx = 0; xx < space.length; xx++) {
        space[xx] = new Array(side);
        for (let yy = 0; yy < space[xx].length; yy++) {
            space[xx][yy] = new Array(side);
            for (let zz = 0; zz < space[xx][yy].length; zz++) {
                space[xx][yy][zz] = '.';
            }
        }
    }
    return space;
}

const space = create_space(size);

function set_data_in_middle(init, size_param, cube) {
    const initial_x = Math.floor(size_param/2);
    const initial_y_z = Math.floor(size_param/2) - Math.floor(init.length/2 );
    for (let yy = 0; yy < init.length; yy++) {
        for (let zz = 0; zz < init.length; zz++) {
            cube[initial_x][yy + initial_y_z][zz + initial_y_z] = data[yy][zz];
        }
    }
}

function print_layer(cube, number) {
    number = Math.floor(number);
    for (let yy = 0; yy < cube.length; yy++) {
        const line = cube[number][yy].join('');
        let neighbourhood = '';
        if (test) {
            for (let zz = 0; zz < cube.length; zz++) {
                neighbourhood += count_neighbours(cube, number, yy, zz);
            }
        }
        console.log(line + ' ' + neighbourhood);
    }
    console.log('--------------');
}

set_data_in_middle(data, size, space);

print_layer(space, size/2);

function count_neighbours(cube, xx_pos, yy_pos, zz_pos) {
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
                if (xx === xx_pos && yy === yy_pos && zz === zz_pos)
                    continue;
                if (cube[xx][yy][zz] === '#') {
                    neighbours++;
                }
            }
        }
    }
    return neighbours > 9 ? 9: neighbours;
}

function apply_rules(cube) {
    let total = 0;
    const next = create_space(cube.length);
    for (let xx = 0; xx < cube.length; xx++) {
        for (let yy = 0; yy < cube[xx].length; yy++) {
            for (let zz = 0; zz < cube[xx][yy].length; zz++) {
                const neighbours = count_neighbours(cube, xx, yy, zz);
                const tile = cube[xx][yy][zz];
                if (tile === '#' && (neighbours === 2 || neighbours === 3)){
                    next[xx][yy][zz] = '#';
                    total++;
                } else if (tile === '#') {
                    next[xx][yy][zz] = '.';
                }
                if (tile === '.' && neighbours === 3) {
                    next[xx][yy][zz] = '#';
                    total++;

                } else if (tile === '.') {
                    next[xx][yy][zz] = '.';
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
