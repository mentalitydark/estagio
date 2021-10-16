import NPC from "./../../class/NPC.js";
import {addToLoad} from "./../../function/LoadAssets.js";
import {player} from "./player.js";

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
export const mestre = new NPC("Mestre", {x: 50, y: 100}, "home_mestre", mestreSprite, "", Mestre_dialogs);
