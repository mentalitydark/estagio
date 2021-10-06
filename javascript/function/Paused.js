import {save, load} from "./IndexedDB.js";
import {Variables, changeVariable} from "./../util/Variables.js";
let bg = true;
let select = 0;
export function backgroundTrue() {
    bg = true;
}
export function PAUSED_update(keysUp, player) {
    if(keysUp.ArrowUp) {
        keysUp.ArrowUp = false;
        select--;
        if(select <= 0)
            select = 0;
    }
    if(keysUp.ArrowDown) {
        keysUp.ArrowDown = false;
        select++;
        if(select >= 3)
            select = 3;
    }
    if(keysUp.Enter) {
        keysUp.Enter = false;
        switch (select) {
        case 0:
            save(player);
            break;
        case 1:
            load(player);
            changeVariable("gameState", Variables.PLAYING);
            break;
        case 2:
            break;
        case 3:
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
    context.restore();
}