import World from "../../class/World.js";
import Block from "../../class/Block.js";

const sprite = {
    file: "map_salesman"
};
const door = [
    new Block(62, 95, 81, 95, "main", false, "door", {x: 1760, y: 1313})
];
const wall = [
    new Block(0, 0, 13, 82, "", true),
    new Block(0, 82, 60, 95, "", true),
    new Block(0, 0, 142, 25, "", true),
    new Block(130, 0, 143, 82, "", true),
    new Block(82, 82, 143, 95, "", true),
];
const decorations = [
    new Block(83, 66, 125, 79, "", true),
    new Block(14, 30, 75, 48, "", true),
];
const blocks = [
    ...door,
    ...wall,
    ...decorations
];
export const potion_home = new World("potion_home", 143, 95, sprite, {x: 63, y: 74});
potion_home.add_blocks(blocks);