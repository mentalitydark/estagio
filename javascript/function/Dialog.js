import {changeVariable} from "./../util/Variables.js";
let NPCSelect;
let optionSelect = 0;
let dialog;
let options;
let textSelect = "start";
let text = "text";
let conditionResult;

export function resetDialog() {
    optionSelect = 0;
    textSelect = "start";
    text = "text";
}
export function DialogDetect(player, NPC) {
    const catX = player.centerX() - NPC.dialogCenterX();
    const catY = player.centerY() - NPC.dialogCenterY();
    const sumHalfWidth = player.halfWidth() + NPC.dialogHalfWidth();
    const sumHalfHeight = player.halfHeight() + NPC.dialogHalfHeight();
    if(Math.abs(catX) < sumHalfWidth && Math.abs(catY) < sumHalfHeight) {
        NPCSelect = NPC;
        return true;
    }
}
export function DialogRender(context) {
    context.fillRect(0, 150, 400, 100);
    context.fillRect(0, 140, 130, 10);
    context.fillStyle = "#fff";
    context.fillText(NPCSelect.Name, 5, 148);
    if(text === "text_2") {
        dialog = NPCSelect.Dialogs[textSelect][text][conditionResult].split("\n");
        options = NPCSelect.Dialogs[textSelect][text].options.split("\n");
    } else {
        dialog = NPCSelect.Dialogs[textSelect][text].split("\n");
        options = NPCSelect.Dialogs[textSelect].options.split("\n");
    }
    Dialog(context, dialog, options);
    context.fillRect(5, 196 + optionSelect*10, 50, 1);
}
export function DialogSelectOptions(keys, player) {
    if(keys.arrowup) {
        keys.arrowup = false;
        optionSelect--;
        if(optionSelect < 0)
            optionSelect = 0;
    }
    if(keys.arrowdown) {
        keys.arrowdown = false;
        optionSelect++;
        if(optionSelect > options.length-1)
            optionSelect = options.length-1;
    }
    if(keys.enter && options[optionSelect] == options[options.length-1] && options[optionSelect] != "...") {
        keys.enter = false;
        changeVariable("dialog", false);
    }
    if(keys.enter) {
        keys.enter = false;
        if(options[optionSelect] !== "...")
            textSelect = options[optionSelect];
        else {
            text = "text_2";
            conditionResult = NPCSelect.Dialogs[textSelect][text]["condition"](player);
        }
    }
}
function Dialog(context, dialog, options) {
    for(let i = 0; i < dialog.length; i++) {
        context.fillText(dialog[i], 5, 165 + i*10);
    }
    for(let i = 0; i < options.length; i++) {
        context.fillText(options[i], 5, 195 + i*10);
    }
}