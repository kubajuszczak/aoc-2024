import { readInputIntArray } from "./utils.js";

const input = readInputIntArray("input11.txt")

const part1 = () => {

    let stones = input;
    console.log({ stones });
    for (let _ = 0; _ < 25; _++) {
        for (let i = 0; i < stones.length; i++) {
            const element = stones[i];

            if (element === 0) {
                stones[i] = 1;
            } else if (element.toString().length % 2 === 0) {
                const len = element.toString().length;
                let left = parseInt(element.toString().slice(0, len / 2))
                let right = parseInt(element.toString().slice(len / 2));

                stones.splice(i, 1, left, right);
                i++;
            } else {
                stones[i] = element * 2024;
            }
        }
    }
    console.log(stones.length);
}

// all numbers with even digits will be reduced to a sequence of single digits
// loops?

// - starting from 0
// 0
// 1
// 2024
// 20     24
// 2      (0)     2     4
// 4048        4048  8096
// 40     48      40    48   80   96
// (4)(0)     (4)     8        (4)   (0) (4) 8 8 (0) 9 6 
// 16192 18216 12144
// 32772608 36869184 24579456
// 3 (2) 7 7 (2) (6) (0) (8) 3 (6) (8) (6) (9) (1) (8) (4) (2) (4) 5 7 (9) (4) 5 (6)
// 6072 14168 10120
// (6) (0) (7) (2) 28676032 20482880
// 2867 6032 2048 2880
// -- all digits represented by this point and everything is looping

// 0
// 1
// 2024
// 20 24
// 2 0 2 4

// count at any iteration = sum of iterating each individual number
// if number is a single digit, it will have a repeating pattern that can be cached
// for those, instead of keeping track of numbers, keep a reference to the digit and interation number
// e.g. 0 after 4 iterations is 2:0 0:0 2:0 4:0
//      0 after 5 iterations is 2:1 (0:1) 2:1 4:1
// converting this to counts
//    - 0 after 25 iterations:  2:21 0:21 2:21 4:21
//                           =  2:21 2:17 0:17 2:17 4:17 2:21 4:21
//                           =  2:21 2:17 2:13 2:9 2:5 2:1 0:1 2:1 4:1 +(2 and 4 at 5, 9, 13, 17, 21)

const part2 = () => {

    // let stones = [125, 17];
    let stones = input;
    const blinks = 75;

    stones = stones.map(it => [it, blinks]);

    const blink = (num) => {
        if (num === 0) {
            return [1];
        } else if (num.toString().length % 2 === 0) {
            const len = num.toString().length;
            let left = parseInt(num.toString().slice(0, len / 2))
            let right = parseInt(num.toString().slice(len / 2));

            return [left, right];
        } else {
            return [num * 2024];
        }
    }

    const map = new Map();
    const recursiveMemoSum = (stoneArray) => {
        let sum = 0;

        for (const [stone, iter] of stoneArray) {
            if (map.has(`${stone}:${iter}`)) {
                sum += map.get(`${stone}:${iter}`);
                continue;
            }
            if (iter === 0) {
                sum += 1;
                continue;
            }
            const blinked = blink(stone).map(it => [it, iter - 1]);
            let blinkSum = recursiveMemoSum(blinked);
            map.set(`${stone}:${iter}`, blinkSum);
            sum += blinkSum;
        }
        return sum;
    };

    console.log(recursiveMemoSum(stones));
}

// part1();
part2();