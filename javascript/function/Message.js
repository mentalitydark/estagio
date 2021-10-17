import {Variables, changeVariable} from "./../util/Variables.js";
let i = 0;
let alpha = 0;
let change = true;
export default function Message() {
    Variables.context.font = "10px Free Pixel";
    Variables.context.lineWidth = 1.2;
    Variables.context.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    Variables.context.strokeStyle = `rgb(0, 0, 0, ${alpha})`;
    Variables.context.strokeText(Variables.message.text, 398 - Variables.context.measureText(Variables.message.text).width, 10);
    Variables.context.fillText(Variables.message.text, 398 - Variables.context.measureText(Variables.message.text).width, 10);
    i++;
    if(change) alpha += 0.01; else alpha -= 0.01;
    if(i >= 120) change = false;
    if(i === 240) {
        i = 0;
        alpha = 0;
        change = true;
        changeVariable(["message", "bool"], false);
        changeVariable(["message", "text"], "");
    }
}