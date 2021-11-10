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
        "text": `Olá, ${player.name}! Está procurando um cajado novo? Chegou uns novos cajados\nque você vai adorar!`,
        "options": "Conversar\nLoja\nSair"
    },
    "Conversar": {
        "text": `${player.name}, alguns bandidos roubaram os elementos químicos necessários para\na criação de um novo cajado! Você poderia pegar eles de volta?`,
        "options": "Sim\nSair",
        "text_2": {
            "false": "Esses são os itens certos? Espero que eu consiga criar um novo cajado agora.",
            "true": "Obrigado por ter me ajudado. Agora conseguirei criar um novo cajado!",
            "options": "Sair"
        },
        "mission_accepted": {
            "true":"Como está indo a missão?",
            "options": "Entregar itens\nSair"
        },
    },
    "Loja": "Loja"
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
const inventory = [];
export const weapon_salesman = new NPC("Vendedor de Cajados", {x: 1700, y: 1250}, "main", sprite, quest, dialog, inventory);