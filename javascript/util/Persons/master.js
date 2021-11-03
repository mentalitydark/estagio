import NPC from "../../class/NPC.js";
import {addToLoad} from "../../function/LoadAssets.js";
import {player} from "./player.js";

const dialogs = {
    "start": {
        "text": `Como você está, ${player.name}?\nEstá treinando bastante para derrotar o Rei Monstro?`,
        "options": "Conversar\nSair"
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
    }
};

const sprite = new Image();
sprite.src = "./img/sprites/char.png";
addToLoad(sprite);
export const master = new NPC("Mestre", {x: 55.5, y: 25}, "home_master", sprite, "", dialogs);
