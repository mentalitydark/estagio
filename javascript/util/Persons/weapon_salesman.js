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
            "false": "Obrigado por ter me ajudado com as fórmulas.",
            "true": `Obrigado por ter me ajudado com as fórmulas. Consegui construir um novo\nequipamento graças a você, ${player.name}!`,
            "options": "Sair"
        }
    },
    "Loja": "Loja"
};
const quest_dialogs = [];
const quest_options = [];
const quest_callback = (player) => {
    const U = player.inventory_quests().findIndex( i => i.name === "Urânio");
    const H = player.inventory_quests().findIndex( i => i.name === "Hidrogênio");
    const Au = player.inventory_quests().findIndex( i => i.name === "Ouro");
    if(U !== -1 && H !== -1 && Au !== -1)
        return true;
    else
        return false;
};
const drop = {
    target: "npc",
    itens: [
        new Item("Cajado do vazio", "Cajado", 1, "", {type: "damage", value: 25}, 50),
        new Item("Cajado do Lich", "Cajado", 1, "", {type: "damage", value: 46}, 75),
        new Item("Túnica de fogo", "Túnica", 1, "", {type: "defense", value: 30}, 75),
        new Item("Túnica de Proteção mágica", "Túnica", 1, "", {type: "defense", value: 50}, 100),
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