import NPC from "../../class/NPC.js";
import Item from "../../class/Item.js";
import {addToLoad} from "../../function/LoadAssets.js";
import {player} from "./player.js";

const VPSprite = new Image();
VPSprite.src = "./img/sprites/char.png";
addToLoad(VPSprite);
const dialog = {
    "start": {
        "text": `Como você está, ${player.name}?\nEstá treinando bastante para derrotar o Rei Monstro?`,
        "options": "Conversar\nLoja\nSair"
    },
    "Conversar": {
        "text": `Lembre-se, ${player.name}. O Rei Monstro é extremamente forte. Eu já bata-\nlhei contra ele antigamente e mesmo assim não consegui derrota-lo.`,
        "options": "...",
        "text_2": {
            "false": "Treine bastante para você poder nos livrar do seu reinado.",
            "true": "Você está tão forte! Com certeza já está mais forte que o Rei\nMonstro!",
            "condition": (player) => {
                if(player.level >= 10) return "true"; else return "false";
            },
            "options": "Sair"
        }
    },
    "Loja": "Loja"
};
const inventory = [
    new Item("Arma de Teste", "Weapon", 1, "", {type: "damage", value: 50}, 100),
    new Item("Arma de Teste 2", "Weapon", 1, "", {type: "damage", value: 50}, 100),
    new Item("Arma de Teste 3", "Weapon", 1, "", {type: "damage", value: 50}, 100),
    new Item("Poção de HP", "Potion", 10, "", {type: "life", value: 10}, 5),
];
export const vendedor_potions = new NPC("Vendedor de Poções", {x: 1900, y: 1250}, "main", VPSprite, "quest", dialog, inventory);