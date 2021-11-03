import {Variables, change_variable} from "./../util/Variables.js";
import {quest_render, quest_update} from "./Quest.js";
import {store_update, store_render} from "./Store.js";
let NPCSelect;
let optionSelect = 0;
let dialog;
let options;
let textSelect = "start";
let text = "text";
let conditionResult;

export function reset_dialog() {
    optionSelect = 0;
    textSelect = "start";
    text = "text";
}
export function dialog_detect(player, NPC) {
    const catX = player.centerX() - NPC.dialogCenterX();
    const catY = player.centerY() - NPC.dialogCenterY();
    const sumHalfWidth = player.halfWidth() + NPC.dialogHalfWidth();
    const sumHalfHeight = player.halfHeight() + NPC.dialogHalfHeight();
    if(Math.abs(catX) < sumHalfWidth && Math.abs(catY) < sumHalfHeight) {
        NPCSelect = NPC;
        return true;
    }
}
export function dialog_render() {
    if(textSelect !== "Loja") {
        if(textSelect !== "Sim") {
            Variables.context.fillRect(0, 150, 400, 100);
            Variables.context.fillRect(0, 140, 130, 10);
            Variables.context.fillStyle = "#fff";
            Variables.context.fillText(NPCSelect.name, 5, 148);
            if(text === "text_2") {
                dialog = NPCSelect.dialogs[textSelect][text][conditionResult].split("\n");
                options = NPCSelect.dialogs[textSelect][text].options.split("\n");
            } else {
                dialog = NPCSelect.dialogs[textSelect][text].split("\n");
                options = NPCSelect.dialogs[textSelect].options.split("\n");
            }
            Dialog(dialog, options);
            Variables.context.fillRect(5, 196 + optionSelect*10, Variables.context.measureText(options[optionSelect]).width, 1);
        } else {
            quest_render(NPCSelect.quest);
        }
    } else {
        store_render(NPCSelect);
    }
}
export function dialog_select_options(keys, player) {
    if(textSelect !== "Loja") {
        if(textSelect !== "Sim") {
            if(keys.arrowup || keys.w) {
                keys.arrowup = keys.w =  false;
                optionSelect--;
                if(optionSelect < 0)
                    optionSelect = 0;
            }
            if(keys.arrowdown || keys.s) {
                keys.arrowdown = keys.s = false;
                optionSelect++;
                if(optionSelect > options.length-1)
                    optionSelect = options.length-1;
            }
            if(keys.enter && options[optionSelect] == options[options.length-1] && options[optionSelect] != "...") {
                keys.enter = false;
                change_variable("dialog", false);
            }
            if(keys.enter) {
                keys.enter = false;
                if(options[optionSelect] !== "...")
                    textSelect = options[optionSelect];
                else {
                    text = "text_2";
                    conditionResult = NPCSelect.dialogs[textSelect][text]["condition"](player);
                }
            }
            if(NPCSelect.quest !== null) {
                if(textSelect === "Conversar") {
                    if(NPCSelect.quest.completed) {
                        conditionResult = NPCSelect.quest.success;
                        text = "text_2";
                    }
                }
            }
        } else {
            if(quest_update(keys, NPCSelect.quest, NPCSelect))
                reset_dialog();
        }
    } else {
        store_update(keys, NPCSelect);
    }
    if(keys.escape && textSelect === "Loja") {
        keys.escape = false;
        reset_dialog();
    }
}
function Dialog(dialog, options) {
    for(let i = 0; i < dialog.length; i++) {
        Variables.context.fillText(dialog[i], 5, 165 + i*10);
    }
    for(let i = 0; i < options.length; i++) {
        Variables.context.fillText(options[i], 5, 195 + i*10);
    }
}