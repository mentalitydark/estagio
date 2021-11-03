import World from "../../class/World.js";
import Block from "../../class/Block.js";
import {addToLoad} from "../../function/LoadAssets.js";

const sprites = new Image();
sprites.src = "./img/sprites/Player.png";
addToLoad(sprites);
const blocks = [
    new Block(57.5, 99, 67.5, 100, "main", false, "door")
];
export const home_master = new World("home_master", 125, 100, sprites, {x: 100, y: 100});
home_master.add_blocks(blocks);