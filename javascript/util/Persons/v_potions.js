import NPC from "../../class/NPC.js";
import {addToLoad} from "../../function/LoadAssets.js";
// import {player} from "./player.js";

const VPSprite = new Image();
VPSprite.src = "./img/sprites/char.png";
addToLoad(VPSprite);
export const vendedor_potions = new NPC("Vendedor de Poções", {x: 1900, y: 1250}, "map", VPSprite, "quest", "dialogs");