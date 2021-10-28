import Player from "./../../class/Player.js";
import Item from "./../../class/Item.js";
import {addToLoad} from "./../../function/LoadAssets.js";

const sprites = new Image();
sprites.src = "./img/sprites/Player.png";
addToLoad(sprites);
export const player = new Player("MentalityDark", sprites);
const a = new Item("Poção de HP", "Potion", 10, "", {type: "life", value: 10});
const b = new Item("Teste 2", "Weapon", 1, "", {type: "damage", value: 5});
const c = new Item("Teste 3", "Weapon", 1, "", {type: "damage", value: 10});
const d = new Item("Teste 4", "Armor", 1, "", {type: "defense", value: 10});
const e = new Item("Poção de MP", "Potion", 1, "", {type: "mp", value: 10});
player.addItem(a);
player.addItem(b);
player.addItem(c);
player.addItem(d);
player.addItem(e);
