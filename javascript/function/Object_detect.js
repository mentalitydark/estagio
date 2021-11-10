import {Variables, change_variable} from "./../util/Variables.js";
import {quest_update, quest_render} from "./Quest.js";
import Message from "./Message.js";
let alpha = 1;
let positive = false;
let object_selected;
let render_quest = false;
function reset() {
    alpha = 1;
    positive = false;
}
export function OD_render() {
    if(object_selected.type === "board") {
        Variables.context.fillStyle = "#383838";
        Variables.context.fillRect(200-250/2, 112.5-100/2, 250, 100);
        Variables.context.fillStyle = "#fff";
        Variables.context.fillRect(200-240/2, 112.5-45, 240, 55);
        Variables.context.fillStyle = "#383838";
        Variables.context.font = "200 8pt Free Pixel";
        if(!object_selected.quest.success) {
            const texts = object_selected.text.first.text.split("\n");
            texts.forEach( (text, index) => {
                const width = Variables.context.measureText(text).width;
                Variables.context.fillText(text, 200-width/2, 72.5+8 + 10*index);
            });
            Variables.context.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            if(positive) alpha += 0.01; else alpha-=0.01;
            if(alpha >= 1 || alpha <= 0) positive = !positive;
            const answer_width = Variables.context.measureText("Resolver").width;
            Variables.context.fillText("Resolver", 200-answer_width/2, 112.5+40);
            if(render_quest)
                quest_render(object_selected.quest);
        } else {
            const texts = object_selected.text.end.text.split("\n");
            texts.forEach( (text, index) => {
                const width = Variables.context.measureText(text).width;
                Variables.context.fillText(text, 200-width/2, 72.5+8 + 10*index);
            });
            Variables.context.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            if(positive) alpha += 0.01; else alpha-=0.01;
            if(alpha >= 1 || alpha <= 0) positive = !positive;
            const answer_width = Variables.context.measureText("Sair").width;
            Variables.context.fillText("Sair", 200-answer_width/2, 112.5+40);
        }
    }
}
export function OD_update(keys) {
    if(object_selected.type === "board") {
        if(!render_quest) {
            if(keys.escape) {
                keys.escape = false;
                change_variable("object_interaction", false);
                reset();
            }
            if(keys.enter) {
                keys.enter = false;
                if(!object_selected.quest.success)
                    render_quest = true;
                else
                    change_variable("object_interaction", false);
            }
        }
        if(render_quest) {
            if(quest_update(keys, object_selected.quest, "")) {
                change_variable("object_interaction", false);
                if(!object_selected.quest.success) {
                    change_variable(["message", "bool"], true);
                    change_variable(["message", "text"], "Você falhou na missão. Tente novamente");
                } else {
                    change_variable(["message", "bool"], true);
                    change_variable(["message", "text"], "Você acertou.");
                    object_selected.quest.callback("", "", object_selected.quest, Variables.Worlds.main);
                    render_quest = false;
                }
            }
        }
    }
    if(object_selected.type === "chest") {
        if(!object_selected.open) {
            let message = "";
            if(object_selected.drop !== null) {
                object_selected.drop.itens.forEach( item => {
                    message += `Item adicionado: ${item.name}\n`;
                    Variables.player.add_item(item);
                });
            }
            change_variable(["message", "bool"], true);
            change_variable(["message", "text"], message);
            change_variable("object_interaction", false);
            object_selected.open = true;
        }
        change_variable("object_interaction", false);
    }
}
export function object_detect(player, object) {
    const catX = player.centerX() - object.detectCenterX();
    const catY = player.centerY() - object.detectCenterY();
    const sumHalfWidth = player.halfWidth() + object.detectHalfWidth();
    const sumHalfHeight = player.halfHeight() + object.detectHalfHeight();
    if(Math.abs(catX) < sumHalfWidth && Math.abs(catY) < sumHalfHeight) {
        object_selected = object;
        return true;
    }
}