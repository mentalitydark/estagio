"use strict";
// import
import fps from "./function/Fps.js";
import Player from "./class/Player.js";
import Block from "./class/Block.js";
import Collision from "./function/Collision.js";
// -----------

// const
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
// -----------

// let
let keys = {};
let blocks_Render = [];
let blocks_Collision = [];
// -----------

// objetos
const player = new Player("Maou");

const block1 = new Block(50, 300, 100, 50);
blocks_Render.push(block1);
blocks_Collision.push(block1);

const block2 = new Block(400, 100, 100, 200);
blocks_Render.push(block2);
blocks_Collision.push(block2);

const block3 = new Block(300, 100, 100, 10);
blocks_Render.push(block3);
blocks_Collision.push(block3);

const block4 = new Block(600, 400, 1, 1);
blocks_Render.push(block4);
blocks_Collision.push(block4);
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
    player.position.x = Math.max(0, player.Position.x);
    player.position.x = Math.max(0, Math.min(canvas.width - player.Mask.width, player.Position.x));
    player.position.y = Math.max(0, player.Position.y);
    player.position.y = Math.max(0, Math.min(canvas.height - player.Mask.height, player.Position.y));
    blocks_Collision.forEach( block => {
        Collision(player, block);
    });
}
function render(timeStamp) {
    context.fillStyle = "#383838";
    context.font = "25px Free Pixel";
    context.save();
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Código
    player.draw(context);
    blocks_Render.forEach( block => {
        block.draw(context);
    });
    // ----------
    context.restore();
    // FPS Render
    context.fillText("FPS: "+ fps(timeStamp), 10, 30);
    // ----------
}
