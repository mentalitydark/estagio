import Player from "./../../class/Player.js";
import Item from "./../../class/Item.js";
import {addToLoad} from "./../../function/LoadAssets.js";

const sprites = new Image();
sprites.src = "./img/sprites/Player.png";
addToLoad(sprites);
export const player = new Player("MentalityDark", sprites);
const a = new Item("Poção de HP", "Poção", 10, "", {type: "hp", value: 10});
const b = new Item("Teste 2", "Cajado", 1, "", {type: "damage", value: 5});
const c = new Item("Teste 3", "Cajado", 1, "", {type: "damage", value: 10});
const d = new Item("Teste 4", "Túnica", 1, "", {type: "defense", value: 10});
const e = new Item("Poção de MP", "Poção", 1, "", {type: "mp", value: 10});
player.add_item(a);
player.add_item(b);
player.add_item(c);
player.add_item(d);
player.add_item(e);
