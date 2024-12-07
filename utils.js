import fs from "node:fs";

export const readInput = (filename) => {
    return fs.readFileSync(filename, { encoding: 'utf8' });
}

export const readInputLines = (filename) => {
    return readInput(filename).split("\n");
}

export const sum = (a, b) => (a + b);
export const product = (a, b) => (a * b);
export const median = (array) => array[(array.length - 1) / 2]; // gotta make sure the number of elements is odd