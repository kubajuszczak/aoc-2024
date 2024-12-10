import { readInputLines } from "./utils.js";

const input = readInputLines("input10.txt").map(it => it.split("").map(it => parseInt(it)));
const maxRow = input.length - 1;
const maxCol = input[0].length - 1;

const part1 = () => {
    let scoreSum = 0;
    for (let r = 0; r < input.length; r++) {
        for (let c = 0; c < input[0].length; c++) {
            const element = input[r][c];
            if (element === 0) {
                scoreSum += followRecursive(r, c, []);
            }
        }
    }
    console.log(scoreSum);
}

const part2 = () => {
    let scoreSum = 0;
    for (let r = 0; r < input.length; r++) {
        for (let c = 0; c < input[0].length; c++) {
            const element = input[r][c];
            if (element === 0) {
                scoreSum += followRecursive(r, c);
            }
        }
    }
    console.log(scoreSum);
}

const followRecursive = (r, c, peaks) => {
    const value = input[r][c];

    if (peaks) {
        if (value === 9 && !peaks.includes(`${r},${c}`)) {
            peaks.push(`${r},${c}`);
            return 1;
        }
    } else {
        if (value === 9) {
            return 1;
        }
    }

    let result = 0;

    if (c + 1 <= maxCol && input[r][c + 1] === value + 1) { // right
        result += followRecursive(r, c + 1, peaks);
    }
    if (c - 1 >= 0 && input[r][c - 1] === value + 1) { // left
        result += followRecursive(r, c - 1, peaks);
    }
    if (r + 1 <= maxRow && input[r + 1][c] === value + 1) { // down
        result += followRecursive(r + 1, c, peaks);
    }
    if (r - 1 >= 0 && input[r - 1][c] === value + 1) { // up
        result += followRecursive(r - 1, c, peaks);
    }

    return result;
}

part1();
part2();