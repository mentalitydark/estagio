import Block from "../class/Block.js";
import NPC from "../class/NPC.js";
import Player from "./../class/player.js";
import World from "./../class/world.js";
import {addToLoad} from "./../function/LoadAssets.js";

const sprites = new Image();
sprites.src = "./img/sprites/Player.png";
addToLoad(sprites);
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

const mestreSprite = new Image();
mestreSprite.src = "./img/sprites/char.png";
addToLoad(mestreSprite);
const Mestre = new NPC("Mestre", {x: 1900, y: 1450}, "home_mestre", mestreSprite, "", Mestre_dialogs);

const VPSprite = new Image();
VPSprite.src = "./img/sprites/char.png";
addToLoad(VPSprite);
const Vendedor_Potions = new NPC("Vendedor de Poções", {x: 1900, y: 1250}, "map", VPSprite, "quest", "dialogs");

const main_bg = new Image();
main_bg.src = "./img/world/Mapa.png";
addToLoad(main_bg);
const main = new World("main", 2000, 1500, main_bg);
const villageMain = [
    new Block(1695, 1152, 1696, 1344),
    new Block(1695, 1344, 1759 , 1345),
    new Block(1695, 1375, 1759, 1376),
    new Block(1695, 1375, 1696 , 1500),
    new Block(1695, 1152, 2000, 1153),
    new Block(1933, 1407, 1982, 1408, "home_mestre", false, "door"),
];
main.addBlocks(villageMain);

const home_mestre = new World("Home Mestre", 200, 150, sprites);
home_mestre.addBlocks([
    new Block(0, 0, 100, 2, "main", false, "door")
]);

export let Variables = {
    "gameState": 1,
    "START_MENU": 1,
    "PAUSED": 2,
    "PLAYING": 3,
    "LOADING": true,
    "Blocks": Array(),
    "NPCs": Array(),
    "keys": {
        "escape": "escape",
        "enter": "enter",
    },
    "dialog": false,
    "player": player,
    "Worlds": {
        "select": "main",
        "main": main,
        "home_mestre": home_mestre
    }
};
export function changeVariable(variable, value) {
    if(Array.isArray(variable))
        Variables[variable[0]][variable[1]] = value;
    else
        Variables[variable] = value;
}
Variables.NPCs.push(Mestre);
Variables.NPCs.push(Vendedor_Potions);
// Variables.Blocks = Variables.Blocks.concat(Variables.Blocks, limits, village);