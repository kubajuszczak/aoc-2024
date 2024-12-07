import { readInputLines, sum } from "./utils.js";

const lines = readInputLines("input07.txt");

const part1 = () => {
    const result = lines.filter((line) => {
        const target = parseInt(line.split(": ")[0]);
        const inputs = line.split(": ")[1].split(" ").map(it => parseInt(it));
        let validCount = 0;

        const permutationCount = Math.pow(2, inputs.length - 1);
        // console.log({ inputs })
        for (let p = 0; p < permutationCount; p++) {
            const permutation = p.toString(2).padStart(inputs.length - 1, "0");

            let out = inputs[0];

            for (let i = 1; i <= inputs.length - 1; i++) {
                if (permutation[i - 1] === "0") { // add
                    out = out + inputs[i];
                }
                if (permutation[i - 1] === "1") { // mul
                    out = out * inputs[i];
                }
            }

            // console.log({ permutation, out, expected: target });
            if (target === out) {
                validCount++;
            }
        }

        return validCount > 0;
    }).map(it => parseInt(it.split(": ")[0])).reduce(sum);

    console.log(result);
}

const part2 = () => {
    const result = lines.filter((line) => {
        const target = parseInt(line.split(": ")[0]);
        const inputs = line.split(": ")[1].split(" ").map(it => parseInt(it));
        let validCount = 0;

        const permutationCount = Math.pow(3, inputs.length - 1);
        // console.log({ inputs })
        for (let p = 0; p < permutationCount; p++) {
            const permutation = p.toString(3).padStart(inputs.length - 1, "0");

            let out = inputs[0];

            for (let i = 1; i <= inputs.length - 1; i++) {
                if (permutation[i - 1] === "0") { // add
                    out = out + inputs[i];
                }
                if (permutation[i - 1] === "1") { // mul
                    out = out * inputs[i];
                }
                if (permutation[i - 1] === "2") { // cat
                    out = parseInt(String(out) + String(inputs[i]));
                }

            }

            // console.log({ permutation, out, expected: target });
            if (target === out) {
                validCount++;
                break;
            }
        }

        return validCount > 0;
    }).map(it => parseInt(it.split(": ")[0])).reduce(sum);

    console.log(result);
}


part1();
part2();