import NPC from "../../class/NPC.js";
import Item from "../../class/Item.js";
import Quest from "../../class/Quest.js";
import {addToLoad} from "../../function/LoadAssets.js";

const sprite = new Image();
sprite.src = "./img/sprites/char.png";
addToLoad(sprite);
const dialog = {
    "start": {
        "text": "Oi, senhor. Estou fazendo minhas lições da escola!",
        "options": "Conversar\nSair"
    },
    "Conversar": {
        "text": "Você pode me ajudar nas minhas lições da escola? Elas são muito difíceis!",
        "options": "Sim\nSair",
        "text_2": {
            "false": "Não conseguimos a nota máxima, mas mesmo assim obrigado pela ajuda.",
            "true": "Conseguimos tirar a nota máxima! Muito obrigado! Espero que o item que lhe dei\nseja útil.",
            "options": "Sair"
        }
    },
};
const quest_dialogs = [
    {text: "A primeira questão é de matemática.\nQuanto é 5 x 9?"},
    {text: "A segunda questão também é de matemática.\nQuanto é 123 x 11?"},
    {text: "A terceira questão é de biologia.\nQual é a espécie do ser humano?"},
    {text: "A quarte, e última, é de química.\nQual a sigla e o número atômico do oxigênio?"},
];
const quest_options = [
    {
        correct: "45",
        incorrect: [
            "54",
            "13",
            "40"
        ]
    },
    {
        correct: "1353",
        incorrect: [
            "134",
            "12311",
            "12300"
        ]
    },
    {
        correct: "Homo sapiens sapiens",
        incorrect: [
            "Humano",
            "Homo",
            "Humano Homo"
        ]
    },
    {
        correct: "O e 8",
        incorrect: [
            "O e 16",
            "Oxi e 20",
            "Oxi e 8"
        ]
    },
];
const quest_callback = (answer, question) => {
    if(answer === question.correct) {
        return 1;
    } else {
        return 0;
    }
};
const drop = {
    target: "player",
    itens: [
        new Item("Colar do sacrifício", "Item passivo", 1, "", {type: "", value: 0})
    ]
};
const quest = new Quest("Tarefas da escola", "questions", quest_dialogs, quest_options, quest_callback, drop);
const inventory = [];
export const children_1 = new NPC("Criança querendo ajuda", {x: 1900, y: 1400}, "main", sprite, quest, dialog, inventory);
