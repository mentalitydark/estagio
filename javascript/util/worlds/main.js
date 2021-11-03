import World from "./../../class/World.js";
import Block from "./../../class/Block.js";
import {addToLoad} from "./../../function/LoadAssets.js";

const background = new Image();
background.src = "./img/world/Mapa.png";
addToLoad(background);
const village = [
    new Block(1695, 1152, 1696, 1344),
    new Block(1695, 1344, 1759 , 1345),
    new Block(1695, 1375, 1759, 1376),
    new Block(1695, 1375, 1696 , 1500),
    new Block(1695, 1152, 2000, 1153),
    new Block(1933, 1407, 1982, 1408, "home_master", false, "door"),
];
export const main = new World("main", 2000, 1500, background, {x: 1930, y: 1415});
main.add_blocks(village);