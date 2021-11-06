import NPC from "../../class/NPC.js";
import Quest from "../../class/Quest.js";
import {addToLoad} from "../../function/LoadAssets.js";
import {player} from "./player.js";

const sprite = new Image();
sprite.src = "./img/sprites/char.png";
addToLoad(sprite);
const dialog = {
    "start": {
        "text": `Olá, ${player.name}. Estou aqui observando os pássaros e admirando sua\nvelocidade.`,
        "options": "Conversar\nSair"
    },
    "Conversar": {
        "text": "Consegue ver aquela pássaro voando em alta velocidade? Será que você consegue\ncalcular a velocidade? Ele é o mais rápido de todos que eu já vi!",
        "options": "Sim\nSair",
        "text_2": {
            "false": "Acho que ele é mais rápido, mas mesmo assim obrigado pela ajuda.",
            "true": `Ele realmente é muito rápido! Obrigado pela ajuda ${player.name}`,
            "options": "Sair"
        }
    },
};
const quest_dialogs = [
    {text: "Ele percorre 200 metros em 2.5 segundos.\nQual sua velocidade?"},
];
const quest_options = [
    {
        correct: "80 m/s",
        incorrect: [
            "70 m/s",
            "60 m/s",
            "75 m/s"
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
    target: "player",
    itens: []
};
const quest = new Quest("Pássaro", "questions", quest_dialogs, quest_options, quest_callback, drop);
const inventory = [];
export const explorer = new NPC("Explorador", {x: 1800, y: 1400}, "main", sprite, quest, dialog, inventory);