let i = 1;
let color = true;
export function MENU_update() {

}
export function MENU_render(context, canvas) {
    context.fillStyle = "#383838";
    context.save();
    context.fillRect(0, 0, canvas.width, canvas.height);
    if(i >= 1) color = false;
    if(i <= 0) color = true;
    if(color) i+=0.01; else i-=0.01;
    context.fillStyle = `rgba(255, 255, 255, ${i})`;
    context.font = "12px Free Pixel";
    context.fillText("Aperte ENTER para jogar.", 130, 122.5);
    context.font = "30px Free Pixel";
    context.fillStyle = "#fff";
    context.fillText("O Herói do Vilarejo", 60, 48);
    context.restore();
}