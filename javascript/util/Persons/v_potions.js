import NPC from "../../class/NPC.js";
import Item from "../../class/Item.js";
import Quest from "../../class/Quest.js";
import {addToLoad} from "../../function/LoadAssets.js";
import {player} from "./player.js";

const VPSprite = new Image();
VPSprite.src = "./img/sprites/char.png";
addToLoad(VPSprite);
const dialog = {
    "start": {
        "text": `Olá, ${player.name}! Como Você está? Venho comprar algumas poções?`,
        "options": "Conversar\nLoja\nSair"
    },
    "Conversar": {
        "text": "Estou precisando e sua ajuda para resolver essas fórmulas.\nVocê poderia me ajudar?",
        "options": "Sim\nSair",
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
const quest = new Quest("Bhaskara", "questions", quest_dialogs, quest_options, quest_callback);
const inventory = [
    new Item("Arma de Teste", "Weapon", 1, "", {type: "damage", value: 50}, 100),
    new Item("Arma de Teste 2", "Weapon", 1, "", {type: "damage", value: 50}, 100),
    new Item("Arma de Teste 3", "Weapon", 1, "", {type: "damage", value: 50}, 100),
    new Item("Poção de HP", "Potion", 10, "", {type: "life", value: 10}, 5),
];
export const vendedor_potions = new NPC("Vendedor de Poções", {x: 1900, y: 1250}, "main", VPSprite, quest, dialog, inventory);