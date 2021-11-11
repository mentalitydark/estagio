import Object from "../../class/Object.js";
import Item from "../../class/Item.js";
import {addToLoad} from "../../function/LoadAssets.js";

const sprite = new Image();
sprite.src = "./img/sprites/char.png";
addToLoad(sprite);

const position = {x: 1880, y: 1480};
const collision_mask = {
    width: 16,
    height: 4
};
const drop = {
    target: "player",
    itens: [
        new Item("Urânio", "quest", 1, sprite, {type: "", value: 0}),
        new Item("Hidrogênio", "quest", 1, sprite, {type: "", value: 0}),
        new Item("Ouro", "quest", 1, sprite, {type: "", value: 0}),
    ]
};
export const chest = new Object("Baú dos Bandidos", "chest", "main", sprite, position, collision_mask, true, drop);