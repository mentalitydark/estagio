import Block from "../class/Block.js";
import NPC from "../class/NPC.js";
export let Variables = {
    "gameState": 1,
    "START_MENU": 1,
    "PAUSED": 2,
    "PLAYING": 3,
    "LOADING": true,
    "Blocks": [],
    "NPCs": []
};
export function changeVariable(variable, value) {
    Variables[variable] = value;
}
const limits = [
    new Block(0, -1, 2000, 0),
    new Block(2000, 0, 2001, 1500),
    new Block(2000, 1500, 0, 1501),
    new Block(0, 1500, -1, 0),
];
const village = [
    new Block(1694, 1152, 1695, 1344),
    new Block(1694, 1343, 1759 , 1344),
    new Block(1694, 1374, 1759, 1375),
    new Block(1694, 1374, 1695 , 1500),
    new Block(1694, 1152, 2000, 1153),
];
Variables.Blocks = Variables.Blocks.concat(Variables.Blocks, limits, village);

Variables.NPCs.push(new NPC("Teste", {x: 1900, y: 1450}, "map", "sprite", "quest", "dialogs"));