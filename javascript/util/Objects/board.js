import Object from "../../class/Object.js";
import Quest from "../../class/Quest.js";
import {addToLoad} from "../../function/LoadAssets.js";

const sprite = new Image();
sprite.src = "./img/sprites/char.png";
addToLoad(sprite);

const quest_drop = {};
const quest_dialogs = [
    {text: "Para conectar um lado ao outro em uma linha reta. É necessário uma ponte de quantos metros? Sabendo que um ponte mede 10 metro e a outro mede 15 metros."}
];
const quest_options = [
    {
        correct: "18 metros",
        incorrect: [
            "20 metros",
            "15 metros",
            "25 metros"
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
const quest = new Quest("Penhasco do Caído", "questions", quest_dialogs, quest_options, quest_callback, quest_drop);

const board_position = {x: 1980, y: 1480};
const board_text = {
    first: {
        text: "Para "
    }
};
const board_collision_mask = {
    width: 16,
    height: 4
};
export const board = new Object("Penhasco do Caído", "board", "main", sprite, board_position, board_collision_mask, null, quest, board_text);