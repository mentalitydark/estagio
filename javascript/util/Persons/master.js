import NPC from "../../class/NPC.js";
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

const sprite = {
    file: "master",
    offset: {
        x: 0,
        y: 0
    },
    size: {
        width: 16,
        height: 32
    },
    frame: 0
};
const dialog_hitbox = {
    width: 25,
    height: 25
};
export const master = new NPC("Mestre", {x: 50, y: 15}, "home_master", sprite, "", dialogs, dialog_hitbox);
