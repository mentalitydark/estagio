import NPC from "../../class/NPC.js";
import Item from "../../class/Item.js";
import Quest from "../../class/Quest.js";
import {addToLoad} from "../../function/LoadAssets.js";
import {player} from "./player.js";

const sprite = new Image();
sprite.src = "./img/sprites/char.png";
addToLoad(sprite);
const dialog = {
    "start": {
        "text": `Preciso daquela flor para o remédio! Oi, ${player.name}. Nem reparei que estava aí.`,
        "options": "Conversar\nSair"
    },
    "Conversar": {
        "text": "Estou precisando urgente da sua ajuda! Você poderia pegar a flor vermelha que está no penhasco do Caído?",
        "options": "Sim\nSair",
        "text_2": {
            "false": "Essa é a flor? Espero que dê para fazer o remédio. Obrigado.",
            "true": "Obrigado por ter me ajudado. Agora conseguirei criar um novo cajado!",
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
const quest_callback = (player, npc) => {
    const U = player.inventory_quests.findIndex( i => i.name === "Urânio");
    const H = player.inventory_quests.findIndex( i => i.name === "Hidrogênio");
    const Au = player.inventory_quests.findIndex( i => i.name === "Ouro");
    if(U !== -1 && H !== -1 && Au !== -1) {
        player.quests.findIndex( i => {
            if(i.name === "Cajado Químico") {
                i.drop.itens.forEach(item => {
                    npc.add_item(item);
                });
                i.completed = true;
                i.success = true;
            }
        });
        return "true";
    }
    else {
        player.quests.findIndex(i => {
            if(i.name === "Cajado Químico") {
                i.completed = true;
                i.success = false;
            }
        });
        return "false";
    }
};
const drop = {
    target: "npc",
    itens: [
        new Item("Cajado Químico", "Cajado", 1, "", {type: "damage", value: 60}, 100)
    ]
};
const quest = new Quest("Cajado Químico", "delivery", quest_dialogs, quest_options, quest_callback, drop);
const inventory = [
    new Item("Cajado do vazio", "Cajado", 1, "", {type: "damage", value: 25}, 50),
    new Item("Cajado do Lich", "Cajado", 1, "", {type: "damage", value: 46}, 75),
    new Item("Túnica de fogo", "Túnica", 1, "", {type: "defense", value: 30}, 75),
    new Item("Túnica de Proteção mágica", "Túnica", 1, "", {type: "defense", value: 50}, 100),
];
export const weapon_salesman = new NPC("Vendedor de Cajados", {x: 1700, y: 1250}, "main", sprite, quest, dialog, inventory);