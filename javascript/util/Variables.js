import Block from "../class/Block.js";
export let Blocks = [];
const limits = [
    new Block(0, -1, 2000, 0),
    new Block(2000, 0, 2001, 1500),
    new Block(2000, 1500, 0, 1501),
    new Block(0, 1500, -1, 0),
];
const village = [
    new Block(1694, 1152, 1695, 1344),
    new Block(1694, 1343, 1759 , 1344),
    new Block(1694, 1374, 1759, 1375),
    new Block(1694, 1374, 1695 , 1500),
    new Block(1694, 1152, 2000, 1153),
];
Blocks = Blocks.concat(Blocks, limits, village);
