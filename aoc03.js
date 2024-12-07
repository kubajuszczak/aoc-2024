import { product, readInput, sum } from "./utils.js";

const input = readInput("input03.txt");

const part1 = () => {

    // const cleaned = input.replace(/[^mul,0-9\(\)]/g, "");
    const matches = input.matchAll(/mul\((\d+?,\d+?)\)/g);

    const numbers = Array.from(matches)
        .map(it => {
            const split = it[1].split(",").map(it => parseInt(it));
            if (split.length > 2) {
                console.log(it);
            }
            return split.reduce(product);
        }).reduce(sum);

    console.log(numbers);
}

const part2 = () => {
    let index = 0;
    let sum = 0;
    let state = "";
    let aStart, bStart = 0;
    let a, b = "";
    let enabled = true;

    while (true) {
        if (index > input.length) {
            break;
        }
        if (input.slice(index).startsWith("don't()")) {
            enabled = false;
            state = "";
        }
        if (input.slice(index).startsWith("do()")) {
            enabled = true;
            state = "";
        }
        if (enabled && input.slice(index).startsWith("mul(")) {
            index = index + 4;
            state = "mul";
            aStart = index;
            continue;
        }
        if (state === "mul" && input.charAt(index) === ",") {
            a = input.slice(aStart, index);
            state = "a";
            index++;
            aStart = 0;
            bStart = index;
            continue;
        }
        if (state === "a" && input.charAt(index) === ")") {
            b = input.slice(bStart, index);
            state = "";
            index++;
            bStart = 0;

            sum = sum + parseInt(a) * parseInt(b);
            continue;
        }
        if ((state === "mul" || state === "a") && (input.charCodeAt(index) < 48 || input.charCodeAt(index) > 57)) {
            state = "";
            aStart = 0;
            bStart = 0;
            continue;
        }
        index++;
    }
    console.log(sum);
}


part1();
part2();