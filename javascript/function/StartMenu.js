import {Variables, changeVariable} from "./../util/Variables.js";
import {load} from "./IndexedDB.js";
let i = 1;
let color = true;
export function MENU_update() {
    if(Variables.keys.enter) {
        changeVariable("gameState", Variables.PLAYING);
        load(Variables.player);
    }
}
export function MENU_render() {
    Variables.context.fillStyle = "#383838";
    Variables.context.save();
    Variables.context.fillRect(0, 0, 400, 225);
    if(i >= 1) color = false;
    if(i <= 0) color = true;
    if(color) i+=0.01; else i-=0.01;
    Variables.context.fillStyle = `rgba(255, 255, 255, ${i})`;
    Variables.context.font = "12px Free Pixel";
    Variables.context.fillText("Aperte ENTER para jogar.", 130, 122.5);
    Variables.context.font = "30px Free Pixel";
    Variables.context.fillStyle = "#fff";
    Variables.context.fillText("O Herói do Vilarejo", 60, 48);
    Variables.context.restore();
}