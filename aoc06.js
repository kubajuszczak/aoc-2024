import { readInput, median, sum, readInputLines } from "./utils.js";

const input = readInputLines("input06.txt");

const part1 = () => {
    const guardStartRow = input.findIndex(it => it.includes("^"));
    const guardStartCol = input[guardStartRow].indexOf("^");

    let movement = new Set();
    let location = [guardStartRow, guardStartCol];
    movement.add(`${location[0]},${location[1]}`);
    let heading = "up";
    while (true) {
        if (heading === "up") {
            if (location[0] === 0) {
                break;
            }
            if (input[location[0] - 1][location[1]] === "#") {
                heading = "right";
                continue;
            }
            location = [location[0] - 1, location[1]];
            movement.add(`${location[0]},${location[1]}`);
            continue;
        }
        if (heading === "right") {
            if (location[1] === input[0].length - 1) {
                break;
            }
            if (input[location[0]][location[1] + 1] === "#") {
                heading = "down";
                continue;
            }
            location = [location[0], location[1] + 1];
            movement.add(`${location[0]},${location[1]}`);
            continue;
        }
        if (heading === "down") {
            if (location[0] === input.length - 1) {
                break;
            }
            if (input[location[0] + 1][location[1]] === "#") {
                heading = "left";
                continue;
            }
            location = [location[0] + 1, location[1]];
            movement.add(`${location[0]},${location[1]}`);
            continue;
        }
        if (heading === "left") {
            if (location[1] === 0) {
                break;
            }
            if (input[location[0]][location[1] - 1] === "#") {
                heading = "up";
                continue;
            }
            location = [location[0], location[1] - 1];
            movement.add(`${location[0]},${location[1]}`);
            continue;
        }
    }

    console.log(movement.size);
    // debugPrint(movement)
    // console.log({ x: movement });
}

const debugPrint = (movement) => {
    let inputMapped = input.map(it => it.split(""));
    for (const element of movement) {
        const row = parseInt(element.split(",")[0]);
        const col = parseInt(element.split(",")[1]);
        inputMapped[row][col] = "X";
    }
    console.log(inputMapped.map(it => it.join("")).join("\n"));
}

const part2 = () => {
    const guardStartRow = input.findIndex(it => it.includes("^"));
    const guardStartCol = input[guardStartRow].indexOf("^");


    let validObstacleCount = 0;
    for (let r = 0; r < input.length; r++) {
        for (let c = 0; c < input[0].length; c++) {
            
            // cannot be an obstacle already
            if (input[r][c] === "#") {
                continue;
            }

            // cannot be where the guard starts
            if (r === guardStartRow && c === guardStartCol) {
                continue;
            }

            let inputWithObstacle = input.map(it => it.split(""));
            inputWithObstacle[r][c] = "#";

            let movement = new Set();
            let location = [guardStartRow, guardStartCol];
            let heading = "up";
            movement.add(`${location[0]},${location[1]},${heading}`);

            while (true) {
                if (heading === "up") {
                    if (location[0] === 0) {
                        break;
                    }
                    if (inputWithObstacle[location[0] - 1][location[1]] === "#") {
                        heading = "right";
                        continue;
                    }
                    location = [location[0] - 1, location[1]];
                    if (movement.has(`${location[0]},${location[1]},${heading}`)) {
                        validObstacleCount++;
                        break;
                    }
                    movement.add(`${location[0]},${location[1]},${heading}`);
                    continue;
                }
                if (heading === "right") {
                    if (location[1] === input[0].length - 1) {
                        break;
                    }
                    if (inputWithObstacle[location[0]][location[1] + 1] === "#") {
                        heading = "down";
                        continue;
                    }
                    location = [location[0], location[1] + 1];
                    if (movement.has(`${location[0]},${location[1]},${heading}`)) {
                        validObstacleCount++;
                        break;
                    }
                    movement.add(`${location[0]},${location[1]},${heading}`);
                    continue;
                }
                if (heading === "down") {
                    if (location[0] === input.length - 1) {
                        break;
                    }
                    if (inputWithObstacle[location[0] + 1][location[1]] === "#") {
                        heading = "left";
                        continue;
                    }
                    location = [location[0] + 1, location[1]];
                    if (movement.has(`${location[0]},${location[1]},${heading}`)) {
                        validObstacleCount++;
                        break;
                    }
                    movement.add(`${location[0]},${location[1]},${heading}`);
                    continue;
                }
                if (heading === "left") {
                    if (location[1] === 0) {
                        break;
                    }
                    if (inputWithObstacle[location[0]][location[1] - 1] === "#") {
                        heading = "up";
                        continue;
                    }
                    location = [location[0], location[1] - 1];
                    if (movement.has(`${location[0]},${location[1]},${heading}`)) {
                        validObstacleCount++;
                        break;
                    }
                    movement.add(`${location[0]},${location[1]},${heading}`);
                    continue;
                }
            }
        }
    }


    console.log({ validObstacleCount })
}


part1();
part2();