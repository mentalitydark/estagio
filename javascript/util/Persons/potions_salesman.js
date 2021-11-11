import NPC from "../../class/NPC.js";
// import Item from "../../class/Item.js";
import Quest from "../../class/Quest.js";
import {player} from "./player.js";

const dialog = {
    "start": {
        "text": `Olá, ${player.name}! Como Você está? Venho comprar algumas poções?`,
        "options": "Conversar\nLoja\nSair"
    },
    "Conversar": {
        "text": "Estou precisando e sua ajuda para resolver essas fórmulas.\nVocê poderia me ajudar?",
        "options": "Sim\nSair",
        "text_2": {
            "false": "Obrigado por ter me ajudado com as fórmulas.",
            "true": `Obrigado por ter me ajudado com as fórmulas. Consegui construir um novo\nequipamento graças a você, ${player.name}!`,
            "options": "Sair"
        }
    },
    "Loja": "Loja"
};
const quest_dialogs = [
    {text: "x² - 2x - 3"},
    {text: "2x² + 6x + 8"}
];
const quest_options = [
    {
        correct: "3 e -1",
        incorrect: [
            "1 e -3",
            "-1 e -3",
            "3 e 1"
        ]
    },
    {
        correct: "1 e -4",
        incorrect: [
            "-1 e 4",
            "-4 e -1",
            "1 e 4"
        ]
    }
];
const quest_callback = (answer, question) => {
    if(answer === question.correct) {
        return 1;
    } else {
        return 0;
    }
};
const drop = {
    target: "npc",
    itens: []
};
const quest = new Quest("Bhaskara", "questions", quest_dialogs, quest_options, quest_callback, drop);
const inventory = [];
const sprite = {
    file: "potion_salesman",
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
    width: 30,
    height: 60
};
export const potions_salesman = new NPC("Vendedor de Poções", {x: 50, y: 15}, "potion_home", sprite, quest, dialog, dialog_hitbox,inventory);