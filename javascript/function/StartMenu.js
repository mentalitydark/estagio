let time = 15;
let color = true;
export function MENU_update() {

}
export function MENU_render(context, canvas) {
    context.fillStyle = "#383838";
    context.save();
    context.fillRect(0, 0, canvas.width, canvas.height);
    if(color) {
        context.fillStyle = "#fff";
        context.fillRect(150, 112.5, 100, 15);
        context.fillStyle = "#383838";
        context.font = "1000 12px Free Pixel";
        context.fillText("Enter para jogar", 150, 122.5);
        time--;
    }
    if(!color) {
        context.fillStyle = "#585858";
        context.fillRect(150, 112.5, 100, 15);
        context.fillStyle = "#fff";
        context.font = "1000 12px Free Pixel";
        context.fillText("Enter para jogar", 150, 122.5);
        time++;
    }
    if(time == -15 || time == 15) {
        color = !color;
    }
    context.font = "30px Free Pixel";
    context.fillStyle = "#fff";
    context.fillText("O Herói do Vilarejo", 60, 48);
    context.restore();
}