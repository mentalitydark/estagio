import Player from "./../../class/Player.js";
import {addToLoad} from "./../../function/LoadAssets.js";

const sprites = new Image();
sprites.src = "./img/sprites/Player.png";
addToLoad(sprites);
export const player = new Player("Maou", sprites);
