console.log('hello advent! 01 a');

const fs = require('fs');

const all_numbers = fs.readFileSync('01a.txt', 'utf8');

console.log(typeof all_numbers);

const arr = all_numbers.split('\n');

const length = arr.length;
for (var index = 0; index < length; index++) {
    const first = parseInt(arr[index]);
    console.log('procesando ', first)
    for (var subindex = 0; subindex < length; subindex++) {
        const second = parseInt(arr[subindex]);
        for (var subsub = 0; subsub < length; subsub++) {
            const third = parseInt(arr[subsub]);
            if (first + second + third === 2020) {
                console.log('result = ', (first * second * third), first, second, third);
                return;
            }
        }
    }
}

