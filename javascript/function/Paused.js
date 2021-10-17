import {save, load} from "./IndexedDB.js";
import {Variables, changeVariable} from "./../util/Variables.js";
let bg = true;
let select = 0;
let showControllers = false;
export function resetVariables_PAUSED() {
    bg = true;
    select = 0;
    showControllers = false;
}
export function PAUSED_update() {
    if(Variables.keysUp.arrowup || Variables.keysUp.w) {
        changeVariable(["keysUp", "arrowup"], false);
        changeVariable(["keysUp", "w"], false);
        showControllers = false;
        select--;
        if(select < 0)
            select = 3;
    }
    if(Variables.keysUp.arrowdown  || Variables.keysUp.s) {
        changeVariable(["keysUp", "arrowdown"], false);
        changeVariable(["keysUp", "s"], false);
        showControllers = false;
        select++;
        if(select > 3)
            select = 0;
    }
    if(Variables.keysUp.enter) {
        changeVariable(["keysUp", "enter"], false);
        switch (select) {
        case 0:
            save(Variables.player);
            changeVariable(["message", "bool"], true);
            changeVariable("gameState", Variables.PLAYING);
            break;
        case 1:
            load(Variables.player);
            changeVariable("gameState", Variables.PLAYING);
            break;
        case 2:
            showControllers = true;
            break;
        case 3:
            changeVariable("gameState", Variables.PLAYING);
            break;
        }
    }
    if(Variables.keys.escape) {
        changeVariable(["keys", "escape"], false);
        changeVariable("gameState", Variables.PLAYING);
    }
}
export function PAUSED_render() {
    Variables.context.save();
    if(bg) {
        bg = false;
        Variables.context.fillStyle = "rgba(0,0,0,0.2)";
        Variables.context.fillRect(0, 0, 400, 225);
    }
    Variables.context.fillStyle = "#383838";
    Variables.context.font = "12px Free Pixel";
    Variables.context.fillRect(0, 0, 100, 225);
    Variables.context.fillStyle = "#fff";
    Variables.context.fillRect(10, 50, 80, 10);
    Variables.context.fillRect(10, 70, 80, 10);
    Variables.context.fillRect(10, 90, 80, 10);
    Variables.context.fillRect(10, 110, 80, 10);
    Variables.context.fillStyle = "#383838";
    Variables.context.fillText("Salvar", 11, 58);
    Variables.context.fillText("Carregar", 11, 78);
    Variables.context.fillText("Controles", 11, 98);
    Variables.context.fillText("Retomar", 11, 118);
    Variables.context.strokeStyle = "red";
    Variables.context.strokeRect(9, 49 + 20*select, 82, 12);
    if(showControllers) {
        Variables.context.fillRect(0, 0, 100, 225);
        Variables.context.fillStyle = "#fff";
        Variables.context.fillText("Movimentação:", 10.85, 79);
        Variables.context.fillText("WASD ou Setas", 10.85, 93);
        Variables.context.fillRect(10.85, 99, 78, 1);
        Variables.context.fillText("Ações:", 10.85, 112);
        Variables.context.fillText("Enter", 10.85, 124);
        Variables.context.fillRect(10.85, 130, 78, 1);
        Variables.context.fillText("Correr:", 10.85, 142);
        Variables.context.fillText("Shift", 10.85, 154);
    }
    Variables.context.restore();
}