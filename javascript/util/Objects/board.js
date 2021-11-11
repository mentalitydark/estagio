import Object from "../../class/Object.js";
import Quest from "../../class/Quest.js";
import {addToLoad} from "../../function/LoadAssets.js";

const sprite = new Image();
sprite.src = "./img/sprites/char.png";
addToLoad(sprite);

const quest_drop = {
    target: "player",
    itens: []
};
const quest_dialogs = [
    {text: "Para conectar um lado ao outro em uma linha\nreta, é necessário uma ponte de quantos\nmetros? Sabendo que uma ponte mede 15 metros\ne a outra mede 20 metros."}
];
const quest_options = [
    {
        correct: "25 metros",
        incorrect: [
            "20 metros",
            "35 metros",
            "5 metros"
        ]
    }
];
const quest_callback = (answer, question, quest = null, world = null) => {
    if(world !== null && quest !== null && world.name === "main") {
        if(quest.success) {
            world.blocks.splice(0, 1);
        }
    }
    if(answer === question.correct) {
        return 1;
    } else {
        return 0;
    }
};
const quest = new Quest("Penhasco do Caído", "questions", quest_dialogs, quest_options, quest_callback, quest_drop);

const board_position = {x: 1980, y: 1480};
const board_text = {
    first: {
        text: "Para que seja possível construir uma ponte\nem linha reta até o outro lado, é necessário\nsaber quantos metros há. Quer resolver o\nproblema matemático para saber?"
    },
    end: {
        text: "A ponte de um lado ao outro tem 25 metros.\nGraças à sua ajuda foi possível construí-la"
    }
};
const board_collision_mask = {
    width: 16,
    height: 4
};
export const board = new Object("Penhasco do Caído", "board", "main", sprite, board_position, board_collision_mask, true, null, quest, board_text);