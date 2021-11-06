import NPC from "../../class/NPC.js";
import Quest from "../../class/Quest.js";
import {addToLoad} from "../../function/LoadAssets.js";
import {player} from "./player.js";

const sprite = new Image();
sprite.src = "./img/sprites/char.png";
addToLoad(sprite);
const dialog = {
    "start": {
        "text": `Preciso daquela flor para o remédio! Oi, ${player.name}. Nem reparei que estava\naí.`,
        "options": "Conversar\nSair"
    },
    "Conversar": {
        "text": "Estou precisando urgente da sua ajuda! Você poderia pegar a flor vermelha que\nestá no penhasco do Caído?",
        "options": "Sim\nSair",
        "text_2": {
            "false": "Essa é a flor? Espero que dê para fazer o remédio. Obrigado.",
            "true": `Muito obrigado, ${player.name}. Agora vou conseguir fazer o remédio para curar\no meu amigo.`,
            "options": "Sair"
        },
        "mission_accepted": {
            "true":"Você já conseguiu a flor?",
            "options": "Entregar itens\nSair"
        },
    },
};
const quest_dialogs = [];
const quest_options = [];
const quest_callback = (player) => {
    const flower = player.inventory_quests.findIndex( i => i.name === "Flor vermelha");
    if(flower !== -1) {
        player.quests.findIndex( i => {
            if(i.name === "Flor Vermelha") {
                player.recover(i.drop.itens[0].type, i.drop.itens[0].value);
                i.completed = true;
                i.success = true;
            }
        });
        return "true";
    }
    else {
        player.quests.findIndex(i => {
            if(i.name === "Flor Vermelha") {
                i.completed = true;
                i.success = false;
            }
        });
        return "false";
    }
};
const drop = {
    target: "player",
    itens: [
        {type: "gold", value: 50}
    ]
};
const quest = new Quest("Flor Vermelha", "delivery", quest_dialogs, quest_options, quest_callback, drop);
const inventory = [];
export const medicine_quest = new NPC("Pessoa querendo ajuda", {x: 1700, y: 1450}, "main", sprite, quest, dialog, inventory);