import { readInputLines, sum } from "./utils.js";

const lines = readInputLines("input01.txt");

const part1 = () => {
    const lists = lines.map(line => line.split("   "));

    const list1 = lists.map((it => parseInt(it[0])));
    const list2 = lists.map((it => parseInt(it[1])));

    list1.sort();
    list2.sort();

    const diffs = list1.map((n, index) => {
        return Math.abs(n - list2[index]);
    })

    console.log(diffs.reduce(sum));
}
const part2 = () => {
    const lists = lines.map(line => line.split("   "));

    const list1 = lists.map((it => parseInt(it[0])));
    const list2 = lists.map((it => parseInt(it[1])));


    const sim = list1.map((n) => {
        return n * list2.filter((it) => it === n).length;
    });

    console.log(sim.reduce(sum));
}


part1();
part2();