import {Variables, change_variable} from "./../util/Variables.js";
let i = 0;
let alpha = 0;
let change = true;
export default function Message() {
    const messages = Variables.message.text.split("\n");
    Variables.context.font = "10px Free Pixel";
    Variables.context.lineWidth = 1.2;
    Variables.context.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    Variables.context.strokeStyle = `rgb(0, 0, 0, ${alpha})`;
    messages.forEach((message, index) => {
        if(message !== "") {
            Variables.context.strokeText(message, 398 - Variables.context.measureText(message).width, 10 + 10*index);
            Variables.context.fillText(message, 398 - Variables.context.measureText(message).width, 10 + 10*index);
        }
    });
    i++;
    if(change) alpha += 0.01; else alpha -= 0.01;
    if(i >= 120) change = false;
    if(i === 240) {
        i = 0;
        alpha = 0;
        change = true;
        change_variable(["message", "bool"], false);
        change_variable(["message", "text"], "");
    }
}