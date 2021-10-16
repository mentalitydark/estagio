import World from "./../../class/World.js";
import Block from "./../../class/Block.js";
import {addToLoad} from "./../../function/LoadAssets.js";

const sprites = new Image();
sprites.src = "./img/sprites/Player.png";
addToLoad(sprites);
const blocks = [
    new Block(0, 0, 100, 2, "main", false, "door")
];
export const home_mestre = new World("home_mestre", 200, 150, sprites, {x: 100, y: 100});
home_mestre.addBlocks(blocks);