let time = 15;
let color = true;
export function PAUSED_update() {

}
export function PAUSED_render(context, canvas) {
    context.fillStyle = "#383838";
    context.save();
    context.fillRect(0, 0, canvas.width, canvas.height);
    if(color) {
        context.fillStyle = "#fff";
        context.fillRect(300, 225, 200, 30);
        context.fillStyle = "#383838";
        context.font = "1000 24px Free Pixel";
        context.fillText("Esc para voltar", 310, 245);
        time--;
    }
    if(!color) {
        context.fillStyle = "#585858";
        context.fillRect(300, 225, 200, 30);
        context.fillStyle = "#fff";
        context.font = "1000 24px Free Pixel";
        context.fillText("Esc para voltar", 310, 245);
        time++;
    }
    if(time == -15 || time == 15) {
        color = !color;
    }
    context.font = "60px Free Pixel";
    context.fillStyle = "#fff";
    context.fillText("Jogo pausado.", 200, 96);
    context.restore();
}