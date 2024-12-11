import fs from "node:fs";

export const readInput = (filename) => {
    return fs.readFileSync(filename, { encoding: 'utf8' });
}

export const readInputIntArray = (filename) => {
    return readInput(filename).split(" ").map(it => parseInt(it));
}

export const readInputLines = (filename) => {
    return readInput(filename).split("\n");
}

export const sum = (a, b) => (a + b);
export const product = (a, b) => (a * b);
export const median = (array) => array[(array.length - 1) / 2]; // gotta make sure the number of elements is odd

// https://stackoverflow.com/a/17445322
export const gcd = (a, b) => {
    a = Math.abs(a);
    b = Math.abs(b);
    if (b > a) { var temp = a; a = b; b = temp; }
    while (true) {
        if (b == 0) return a;
        a %= b;
        if (a == 0) return b;
        b %= a;
    }
}