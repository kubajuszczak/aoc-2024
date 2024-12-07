import { readInputLines } from "./utils.js";

const lines = readInputLines("input02.txt");

const part1 = () => {
    const reports = lines.map(line => line.split(" "));
    const safe = reports.filter(report => {
        const num = report.map(n => parseInt(n));
        return isSafe(num);
    })

    console.log(safe.length);
}

const isSafe = (num) => {
    const increasing = num[1] > num[0];

    for (let i = 1; i < num.length; i++) {
        const diff = num[i] - num[i - 1];
        if (increasing && diff < 0) {
            return false;
        };
        if (!increasing && diff > 0) {
            return false;
        }
        if (diff === 0 || Math.abs(diff) > 3) {
            return false;
        }
    }
    return true;
}

const part2 = () => {
    const reports = lines.map(line => line.split(" "));
    const safe = reports.filter(report => {
        const parsed = report.map(n => parseInt(n));
        if (isSafe(parsed)) {
            return true;
        }
        for (let i = 0; i < parsed.length; i++) {
            const slice = [...parsed]
            slice.splice(i, 1);
            if (isSafe(slice)) {
                return true;
            }
        }
        return false;
    })
    // console.log(safe);
    console.log(safe.length);
}


part1();
part2();