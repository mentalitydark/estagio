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
export function PAUSED_update(keysUp, player) {
    if(keysUp.arrowup) {
        keysUp.arrowup = false;
        showControllers = false;
        select--;
        if(select < 0)
            select = 3;
    }
    if(keysUp.arrowdown) {
        keysUp.arrowdown = false;
        showControllers = false;
        select++;
        if(select > 3)
            select = 0;
    }
    if(keysUp.enter) {
        keysUp.enter = false;
        switch (select) {
        case 0:
            save(player);
            changeVariable(["message", "bool"], true);
            changeVariable("gameState", Variables.PLAYING);
            break;
        case 1:
            load(player);
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
}
export function PAUSED_render(context) {
    context.save();
    if(bg) {
        bg = false;
        context.fillStyle = "rgba(0,0,0,0.2)";
        context.fillRect(0, 0, 400, 225);
    }
    context.fillStyle = "#383838";
    context.font = "12px Free Pixel";
    context.fillRect(0, 0, 100, 225);
    context.fillStyle = "#fff";
    context.fillRect(10, 50, 80, 10);
    context.fillRect(10, 70, 80, 10);
    context.fillRect(10, 90, 80, 10);
    context.fillRect(10, 110, 80, 10);
    context.fillStyle = "#383838";
    context.fillText("Salvar", 11, 58);
    context.fillText("Carregar", 11, 78);
    context.fillText("Controles", 11, 98);
    context.fillText("Retomar", 11, 118);
    context.strokeStyle = "red";
    context.strokeRect(9, 49 + 20*select, 82, 12);
    if(showControllers) {
        context.fillRect(0, 0, 100, 225);
        context.fillStyle = "#fff";
        context.fillText("Movimentação:", 10.85, 79);
        context.fillText("WASD ou Setas", 10.85, 93);
        context.fillRect(10.85, 99, 78, 1);
        context.fillText("Ações:", 10.85, 112);
        context.fillText("Enter", 10.85, 124);
        context.fillRect(10.85, 130, 78, 1);
        context.fillText("Correr:", 10.85, 142);
        context.fillText("Shift", 10.85, 154);
    }
    context.restore();
}