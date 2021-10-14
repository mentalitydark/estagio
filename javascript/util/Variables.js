import Block from "../class/Block.js";
import NPC from "../class/NPC.js";
import Player from "./../class/player.js";
import {addToLoad} from "./../function/LoadAssets.js";

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

const sprites = new Image();
sprites.src = "./img/sprites/Player.png";
// const spritesNPCs = new Image();
// spritesNPCs.src = "./img/sprites/char.png";
addToLoad(sprites);
// addToLoad(spritesNPCs);
const player = new Player("Maou", sprites);


const Mestre_dialogs = {
    "start": {
        "text": `Como você está, ${player.Name}?\nEstá treinando bastante para derrotar o Rei Monstro?`,
        "options": "Conversar\nSair"
    },
    "Conversar": {
        "text": `Lembre-se, ${player.Name}. O Rei Monstro é extremamente forte. Eu já bata-\nlhei contra ele antigamente e mesmo assim não consegui derrota-lo.`,
        "options": "...",
        "text_2": {
            "false": "Treine bastante para você poder nos livrar do seu reinado.",
            "true": "Você está tão forte! Com certeza já está mais forte que o Rei\nMonstro!",
            "condition": (player) => {
                if(player.Level >= 10) return "true"; else return "false";
            },
            "options": "Sair"
        }
    }
};
const Mestre = new NPC("Mestre", {x: 1900, y: 1450}, "home_mestre", sprites, "", Mestre_dialogs);

export let Variables = {
    "gameState": 1,
    "START_MENU": 1,
    "PAUSED": 2,
    "PLAYING": 3,
    "LOADING": true,
    "Blocks": [],
    "NPCs": [],
    "keys": {
        "escape": "escape",
        "enter": "enter",
    },
    "dialog": false,
    "player": player,
};
export function changeVariable(variable, value) {
    Variables[variable] = value;
}
Variables.NPCs.push(Mestre);
Variables.NPCs.push(new NPC("Vendedor de Poções", {x: 1900, y: 1250}, "map", "sprite", "quest", "dialogs"));
Variables.Blocks = Variables.Blocks.concat(Variables.Blocks, limits, village);