import World from "../../class/World.js";
import Block from "../../class/Block.js";

const sprite = {
    file: "map_master"
};
const door = [
    new Block(62, 95, 81, 95, "main", false, "door", {x: 1919, y: 1409})
];
const wall = [
    new Block(0, 0, 13, 82, "", true),
    new Block(0, 82, 60, 95, "", true),
    new Block(0, 0, 142, 25, "", true),
    new Block(130, 0, 143, 82, "", true),
    new Block(82, 82, 143, 95, "", true),
];
const decorations = [
    new Block(14, 29, 43, 46, "", true),
    new Block(83, 66, 125, 79, "", true),
];
const blocks = [
    ...door,
    ...wall,
    ...decorations
];
export const home_master = new World("home_master", 143, 95, sprite, {x: 63, y: 74});
home_master.add_blocks(blocks);