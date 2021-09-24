"use strict";
// import
import fps from "./function/fps.js";
import Player from "./class/player.js";
// -----------

// const
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
const player = new Player("Maou");
// -----------

// let
let keys = {
};
// -----------

// resources

// -----------

// inputs
document.addEventListener("keydown", (event) => {
    keys[event.key] = true;
});
document.addEventListener("keyup", (event) => {
    keys[event.key] = false;
});
// ----------
document.addEventListener("DOMContentLoaded", () => {
    window.requestAnimationFrame(gameLoop);
});
function gameLoop(timeStamp) {
    window.requestAnimationFrame(gameLoop, canvas);
    update();
    render(timeStamp);
}
function update() {
    if(keys.ArrowUp) player.moveY(-1);
    if(keys.ArrowDown) player.moveY(1);
    if(keys.ArrowRight) player.moveX(1);
    if(keys.ArrowLeft) player.moveX(-1);
    player.sprint(keys.Shift);
    
    // Colisões
    player.PositionX = Math.max(0, player.Position.x);
    player.PositionX = Math.max(0, Math.min(canvas.width - player.Mask.width, player.Position.x));
    player.PositionY = Math.max(0, player.Position.y);
    player.PositionY = Math.max(0, Math.min(canvas.height - player.Mask.height, player.Position.y));
}
function render(timeStamp) {
    context.fillStyle = "#383838";
    context.font = "25px Free Pixel";
    context.save();
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Código
    player.draw(context);

    // ----------
    context.restore();
    // FPS Render
    context.fillText("FPS: "+ fps(timeStamp), 10, 30);
    // ----------
}
