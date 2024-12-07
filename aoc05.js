import { readInput, median, sum } from "./utils.js";

const input = readInput("input05.txt");

const [r, p] = input.split("\n\n");
const rules = r.split("\n").map(x => x.split("|"));
const pages = p.split("\n").map(x => x.split(","));

const part1 = () => {
    const valid = pages.filter(pageOrder => isValid(pageOrder, rules));
    console.log(valid.map(median).map(it => parseInt(it)).reduce(sum));
}

const isValid = (pageOrder, rules) => {
    // x | y, x must be before y
    for (let i = pageOrder.length - 1; i >= 0; i--) {
        let invalidPages = rules.filter(it => it[0] === pageOrder[i]).map(it => it[1]);

        for (let j = 0; j < i; j++) {
            if (invalidPages.includes(pageOrder[j])) {
                return false;
            }
        }
    }
    return true;
}

// x | y, x must be before y
// assume 29 | 13; and input 75, 13, 29
// go from the right and swap a pair if wrong, then go again
// 
const part2 = () => {
    const invalid = pages.filter(pageOrder => !isValid(pageOrder, rules));

    const result = invalid.map(pageOrderOriginal => {
        let pageOrder = pageOrderOriginal;
        outer:
        while (!isValid(pageOrder, rules)) {
            for (let i = pageOrder.length - 1; i >= 0; i--) {
                let invalidPages = rules.filter(it => it[0] === pageOrder[i]).map(it => it[1]);
                // console.log({ index: i, invalidPages });

                if (invalidPages.includes(pageOrder[i - 1])) {
                    const tmp = pageOrder[i - 1];
                    pageOrder[i - 1] = pageOrder[i];
                    pageOrder[i] = tmp;
                    // console.log({ pageOrder })
                    continue outer;
                }

            }
        }
        return pageOrder;
    }).map(median).map(it => parseInt(it)).reduce(sum);

    console.log(result);
}


part1();
part2();