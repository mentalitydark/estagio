import {Variables} from "./../util/Variables.js";
let i = 1;
let color = true;
export function GameOver_update() {
    //TODO Resetar todas variáveis e recarregar o jogo
}
export function GameOver_render() {
    Variables.context.fillStyle = "#383838";
    Variables.context.fillStyle = "#383838";
    Variables.context.save();
    Variables.context.fillRect(0, 0, 400, 225);
    if(i >= 1) color = false;
    if(i <= 0) color = true;
    if(color) i+=0.01; else i-=0.01;
    Variables.context.fillStyle = `rgba(255, 255, 255, ${i})`;
    Variables.context.font = "12px Free Pixel";
    Variables.context.fillText("Aperte ENTER para carregar o último save.", 200-Variables.context.measureText("Aperte ENTER para carregar o último save.").width/2, 122.5);
    Variables.context.font = "30px Free Pixel";
    Variables.context.fillStyle = "#fff";
    Variables.context.fillText("Game Over", 200-Variables.context.measureText("Game Over").width/2, 48);
    Variables.context.restore();
}