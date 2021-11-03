import {Variables} from "./../util/Variables.js";
let dialog = 0;
let randomArray = true;
let options = [];
let option_select;
let line = 0;
let column = 0;
export function quest_update(keys, quest, npc) {
    if(randomArray) {
        options = quest.options[dialog].incorrect;
        options.push(quest.options[dialog].correct);
        shuffleArray(options);
        randomArray = false;
    }
    if(keys.arrowup || keys.w) {
        keys.arrowup = keys.w = false;
        line++;
        if(line > 1)
            line = 0;
    }
    if(keys.arrowdown || keys.s) {
        keys.arrowdown = keys.s = false;
        line--;
        if(line < 0)
            line = 1;
    }
    if(keys.arrowleft || keys.a) {
        keys.arrowleft = keys.a = false;
        column--;
        if(column < 0)
            column = 1;
    }
    if(keys.arrowright || keys.d) {
        keys.arrowright = keys.d = false;
        column++;
        if(column > 1)
            column = 0;
    }
    if(keys.enter) {
        keys.enter = false;
        option_select = options[column + 2*line];
        quest.score += quest.callback(option_select, quest.options[dialog]);
        if(dialog < quest.dialogs.length) {
            reset();
            dialog++;
        }
    }
    if(dialog === quest.dialogs.length) {
        quest.completed = true;
        if(quest.score === quest.maxScore) {
            quest.success = true;
            if(quest.score === quest.maxScore) {
                quest.success = true;
                if(quest.drop.target === "npc") {
                    npc.reset_inventory();
                    quest.drop.itens.forEach( item => {
                        npc.add_item(item);
                    });
                }
            }
        }
        return true;
    }
}
export function quest_render(quest) {
    Variables.context.fillStyle = "#383838";
    Variables.context.fillRect(200-250/2, 112.5-100/2, 250, 100);
    Variables.context.fillStyle = "#999";
    Variables.context.fillRect(200-240/2, 112.5-45, 240, 45);
    Variables.context.fillStyle = "#383838";
    Variables.context.font = "200 12pt Free Pixel";
    Variables.context.fillText(quest.dialogs[dialog].text, 200-Variables.context.measureText(quest.dialogs[dialog].text).width/2, 84.5);

    Variables.context.fillStyle = "#fff";
    Variables.context.font = "6pt Free Pixel";
    Variables.context.fillText("Qual a resposta certa?", 80, 123.5);
    
    Variables.context.font = "8pt Free Pixel";
    if(options !== undefined) {
        for(let i = 0; i < 2; i++) {
            Variables.context.fillText(options.slice(0,2)[i], 140 + 95*i, 137.5);
        }
        for(let i = 0; i < 2; i++) {
            Variables.context.fillText(options.slice(2,4)[i], 140 + 95*i, 152.5);
        }
    }

    Variables.context.fillStyle = "red";
    Variables.context.fillRect(140 + 95*column, 138.5 + 15*line, Variables.context.measureText(options[column + 2*line]).width, 1);
}
function reset() {
    randomArray = true;
    options = [];
    option_select;
    line = 0;
    column = 0;
}
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}