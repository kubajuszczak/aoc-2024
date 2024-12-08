import { gcd, readInputLines, sum } from "./utils.js";

const lines = readInputLines("input08.txt");

const part1 = () => {
    const maxRow = lines.length - 1;
    const maxCol = lines[0].length - 1;

    let antinodes = new Set();

    // find pairs, get locations
    for (let r1 = 0; r1 < lines.length; r1++) {
        for (let c1 = 0; c1 < lines[r1].length; c1++) {
            const e1 = lines[r1][c1];
            if (e1 === ".") {
                continue;
            }

            for (let r2 = 0; r2 < lines.length; r2++) {
                for (let c2 = 0; c2 < lines[r1].length; c2++) {
                    // skip if the diff is 0
                    if (r1 === r2 && c1 === c2) {
                        continue;
                    }
                    const e2 = lines[r2][c2];

                    if (e2 === ".") {
                        continue;
                    }

                    // match frequency
                    if (e1 !== e2) {
                        continue;
                    }

                    // find the antinode

                    const ra = r2 + (r2 - r1);
                    const ca = c2 + (c2 - c1);

                    // if it's in the bounds, add it to the set
                    if (ra >= 0 && ra <= maxRow &&
                        ca >= 0 && ca <= maxCol) {
                        antinodes.add(`${ra},${ca}`);
                        // console.log({ra,ca})
                    }
                }
            }

        }
    }
    console.log(antinodes.size);
}

const part2 = () => {
    const maxRow = lines.length - 1;
    const maxCol = lines[0].length - 1;

    let antinodes = new Set();

    // find pairs, get locations
    for (let r1 = 0; r1 < lines.length; r1++) {
        for (let c1 = 0; c1 < lines[r1].length; c1++) {
            const e1 = lines[r1][c1];
            if (e1 === ".") {
                continue;
            }

            for (let r2 = 0; r2 < lines.length; r2++) {
                for (let c2 = 0; c2 < lines[r1].length; c2++) {
                    // skip if the diff is 0
                    if (r1 === r2 && c1 === c2) {
                        continue;
                    }
                    const e2 = lines[r2][c2];

                    if (e2 === ".") {
                        continue;
                    }

                    // match frequency

                    if (e1 !== e2) {
                        continue;
                    }

                    // find the gradient
                    const rd = r2 - r1;
                    const cd = c2 - c1;

                    // get greatest common divisor
                    const div = gcd(rd, cd);

                    const rm = rd / div;
                    const cm = cd / div;

                    let ra = r1;
                    let ca = c1;
                    antinodes.add(`${ra},${ca}`);

                    while (true) {
                        ra = ra + rm;
                        ca = ca + cm;

                        // if it's in the bounds, add it to the set
                        if (ra >= 0 && ra <= maxRow &&
                            ca >= 0 && ca <= maxCol) {
                            antinodes.add(`${ra},${ca}`);
                            // console.log({ ra, ca })
                        } else {
                            break;
                        }
                    }
                }
            }

        }
    }
    console.log(antinodes.size);
}


part1();
part2();