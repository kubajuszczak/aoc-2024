import { readInput, sum } from "./utils.js";

const input = readInput("input09.txt");

const input1 = "12345";
const input2 = "2333133121414131402";

const part1 = () => {
    let blocks = [];

    for (let i = 0; i < input.length; i++) {
        if (i % 2 === 0) { // file
            blocks.push(...Array(parseInt(input[i])).fill(`${i / 2}`));
        }
        else { // free space
            blocks.push(...Array(parseInt(input[i])).fill("."));
        }
    }

    // compacting
    for (let i = blocks.length - 1; i >= 0; i--) {
        const block = blocks[i];
        if (block === ".") {
            continue;
        }

        const spaceIndex = blocks.findIndex(it => it === ".");
        if (spaceIndex > i) {
            break;
        }
        blocks[spaceIndex] = block;
        blocks[i] = ".";
    }

    // checksum
    console.log(checksum(blocks));
}

const checksum = (blocks) => blocks.map((it, i) => {
    if (it === ".") {
        return 0;
    }
    return parseInt(it) * i;
}).reduce(sum);

const part2 = () => {
    let blocks = [];

    for (let i = 0; i < input.length; i++) {
        if (i % 2 === 0) { // file
            blocks.push(...Array(parseInt(input[i])).fill(`${i / 2}`));
        }
        else { // free space
            blocks.push(...Array(parseInt(input[i])).fill("."));
        }
    }

    // compacting

    let buffer = [];
    let lastMovedFile = 99999;

    for (let i = blocks.length - 1; i >= 0; i--) {
        const block = blocks[i];

        // console.log({ buffer, i, block })
        if (block !== "." && parseInt(block) >= lastMovedFile) {
            // attempt to move file exactly once
            // console.log(`${i} skip ${block} because last moved is ${lastMovedFile}`)
            continue;
        }
        // find file bounds
        if (buffer.length === 0) {
            if (block === ".") {
                continue;
            }
            buffer.unshift([block, i]);
            continue;
        }

        if (buffer[0][0] === block) {
            buffer.unshift([block, i]);
            continue;
        }

        if (block === "." || block !== buffer[0][0]) {
            // whole file in buffer

            // find a space of the right size
            let spaceStart, spaceLength = 0;
            let inSpace = false;
            for (let j = 0; j < blocks.length; j++) {
                if (blocks[j] === ".") {
                    if (!inSpace) {
                        inSpace = true;
                        spaceStart = j;
                    }
                    spaceLength++;
                } else {
                    if (!inSpace) {
                        continue;
                    }
                    if (spaceLength >= buffer.length) {
                        break;
                    } else {
                        inSpace = false;
                        spaceStart = 0;
                        spaceLength = 0;
                    }
                }
            }
            // console.log(blocks.join(""))
            // console.log({spaceStart, spaceLength, i})

            if (spaceStart > i) { // no room
                buffer = [];
                if (block !== ".") {
                    buffer.push([block, i]);
                }
                continue;
            }

            // swap

            for (const [bufferBlock, index] of buffer) {
                blocks[spaceStart] = bufferBlock;
                spaceStart++;
                blocks[index] = ".";
            }
            lastMovedFile = parseInt(buffer[0][0]);

            // buffer reset
            buffer = [];
            if (block !== ".") {
                buffer.push([block, i]);
            }
        }
    }

    // console.log(blocks.join(""))

    // checksum
    console.log(checksum(blocks));
}


part1();
part2();