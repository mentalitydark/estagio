import Player from "./../../class/Player.js";
import Item from "./../../class/Item.js";
import {addToLoad} from "./../../function/LoadAssets.js";

const sprites = new Image();
sprites.src = "./img/sprites/Player.png";
addToLoad(sprites);
export const player = new Player("Maou", sprites);
const a = new Item("Teste", "Potion", 1, "", {type: "life", value: 10});
const b = new Item("Teste 2", "Weapon", 1, "", "");
player.addItem(a);
player.addItem(b);
player.addItem(b);
