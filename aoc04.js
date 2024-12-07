import { readInputLines, sum } from "./utils.js";

const lines = readInputLines("input04.txt");

const part1 = () => {
    let horizontalCount = lines.map(line => {
        let c = 0;
        for (let i = 0; i < line.length; i++) {
            if (line.slice(i).startsWith("XMAS") || line.slice(i).startsWith("SAMX")) {
                c++;
            }
        }
        return c;
    }).reduce(sum);

    let verticalCount = 0;
    const rowCount = lines.length;
    const colCount = lines[0].length;
    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
            if ((row + 3 <= rowCount - 1) && lines[row][col] === "X" && lines[row + 1][col] === "M" && lines[row + 2][col] === "A" && lines[row + 3][col] === "S") {
                verticalCount += 1;
            }
            if ((row + 3 <= rowCount - 1) && lines[row][col] === "S" && lines[row + 1][col] === "A" && lines[row + 2][col] === "M" && lines[row + 3][col] === "X") {
                verticalCount += 1;
            }
        }
    }

    let diagonalCount1 = 0; // down and right
    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
            if ((row + 3 <= rowCount - 1) && (col + 3 <= colCount - 1) && lines[row][col] === "X" && lines[row + 1][col + 1] === "M" && lines[row + 2][col + 2] === "A" && lines[row + 3][col + 3] === "S") {
                diagonalCount1 += 1;
            }
            if ((row + 3 <= rowCount - 1) && (col + 3 <= colCount - 1) && lines[row][col] === "S" && lines[row + 1][col + 1] === "A" && lines[row + 2][col + 2] === "M" && lines[row + 3][col + 3] === "X") {
                diagonalCount1 += 1;
            }
        }
    }

    let diagonalCount2 = 0; // down and left
    for (let row = 0; row < rowCount; row++) {
        for (let col = 3; col < colCount; col++) {
            if ((row + 3 <= rowCount - 1) && lines[row][col] === "X" && lines[row + 1][col - 1] === "M" && lines[row + 2][col - 2] === "A" && lines[row + 3][col - 3] === "S") {
                diagonalCount2 += 1;
            }
            if ((row + 3 <= rowCount - 1) && lines[row][col] === "S" && lines[row + 1][col - 1] === "A" && lines[row + 2][col - 2] === "M" && lines[row + 3][col - 3] === "X") {
                diagonalCount2 += 1;
            }
        }

    }

    // console.log({ horizontalCount, verticalCount, diagonalCount1, diagonalCount2 });
    console.log(horizontalCount + verticalCount + diagonalCount1 + diagonalCount2);
}

// M.S M.M S.S S.M
// .A. .A. .A. .A.
// M.S S.S M.M S.M
const part2 = () => {
    let count = 0;
    const rowCount = lines.length;
    const colCount = lines[0].length;

    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
            if ((row + 2 <= rowCount - 1) && (col + 2 <= colCount - 1) &&
                lines[row][col] === "M" && lines[row + 1][col + 1] === "A" && lines[row + 2][col + 2] === "S" &&
                lines[row + 2][col] === "M" && lines[row][col + 2] === "S"
            ) {
                count += 1;
            }
            if ((row + 2 <= rowCount - 1) && (col + 2 <= colCount - 1) &&
                lines[row][col] === "M" && lines[row + 1][col + 1] === "A" && lines[row + 2][col + 2] === "S" &&
                lines[row + 2][col] === "S" && lines[row][col + 2] === "M"
            ) {
                count += 1;
            }
            if ((row + 2 <= rowCount - 1) && (col + 2 <= colCount - 1) &&
                lines[row][col] === "S" && lines[row + 1][col + 1] === "A" && lines[row + 2][col + 2] === "M" &&
                lines[row + 2][col] === "M" && lines[row][col + 2] === "S"
            ) {
                count += 1;
            }
            if ((row + 2 <= rowCount - 1) && (col + 2 <= colCount - 1) &&
                lines[row][col] === "S" && lines[row + 1][col + 1] === "A" && lines[row + 2][col + 2] === "M" &&
                lines[row + 2][col] === "S" && lines[row][col + 2] === "M"
            ) {
                count += 1;
            }
        }
    }
    console.log(count);
}

part1();
part2();