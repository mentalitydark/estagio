/* eslint-disable no-import-assign */
"use strict";
// import
import fps from "./function/Fps.js";
import {Collision, BorderCollision} from "./function/Collision.js";
import movePlayer from "./function/KeysPress.js";
import LoadHandler from "./function/LoadHandler.js";
import Player from "./class/Player.js";
import Block from "./class/Block.js";
import Camera from "./class/Camera.js";
import World from "./class/World.js";
import * as GLOBAL from "./util/global.js";

// -----------

// const
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
const world_bg = new Image();
// -----------

// let
let keys = {};
let blocks_Render = [];
let blocks_Collision = [];
// -----------

// src
world_bg.src = "../img/world/map.png";
GLOBAL.assetsToLoad.push(world_bg);
GLOBAL.assetsToLoad.forEach(asset => {
    asset.addEventListener("load", LoadHandler(asset));
});
// -----------

// objetos
const player = new Player("Maou");
const camera = new Camera((player.Position.x-canvas.width+16)/2, (player.Position.y-canvas.height+16)/2, canvas.width, canvas.height);
const world = new World(1500, 1500, world_bg);

const blocks = [
    new Block(0, 0, world.width, 1),
    new Block(world.width, 0, 1, world.height),
    new Block(0, world.height, world.width, 1),
    new Block(0, 0, 1, world.height),
    new Block(50, 300, 100, 50),
    new Block(400, 100, 100, 200),
    new Block(300, 100, 100, 10),
    new Block(600, 400, 1, 1),
    new Block(600, 445, 800, 10),
];
blocks.forEach( block => {
    blocks_Render.push(block);
    blocks_Collision.push(block);
});
// -----------

// inputs
document.addEventListener("keydown", (event) => {
    keys[event.key] = true;
});
document.addEventListener("keyup", (event) => {
    keys[event.key] = false;
    switch (event.key) {
    case "Escape":
        GLOBAL.gameState = GLOBAL.gameState == GLOBAL.PLAYING ? GLOBAL.PAUSED : GLOBAL.PLAYING;
        break;
    case "Enter":
        GLOBAL.gameState = GLOBAL.PLAYING;
        break;
    }
});
// ----------
document.addEventListener("DOMContentLoaded", () => {
    window.requestAnimationFrame(gameLoop);
});
function gameLoop(timeStamp) {
    window.requestAnimationFrame(gameLoop, canvas);
    switch (gameState) {
    case LOADING:
        console.log("loading...");
        break;
    case PLAYING:
        update();
        break;
    case PAUSED:
        break;
    }
    render(timeStamp);
}
function update() {
    movePlayer(player, keys);

    // Movimentação da Camera
    if(player.Position.y < camera.topBorder()) camera.y = player.Position.y-camera.height * 0.5;
    if(player.Position.x > camera.rightBorder()) camera.x = player.Position.x-camera.width * 0.5;
    if(player.Position.y > camera.bottomBorder()) camera.y = player.Position.y-camera.height * 0.5;
    if(player.Position.x < camera.leftBorder()) camera.x = player.Position.x-camera.width * 0.5;
    
    // Colisões
    BorderCollision(player, world);
    blocks_Collision.forEach( block => {
        Collision(player, block);
    });
}
function render(timeStamp) {
    context.fillStyle = "#383838";
    context.save();
    context.translate(-camera.x, -camera.y);
    context.clearRect(player.Position.x-canvas.width/2, player.Position.y-canvas.height/2, 900, 600);
    // Código
    player.draw(context);
    blocks_Render.forEach( block => {
        block.draw(context);
    });
    // ----------
    context.restore();
    // FPS Render
    context.fillStyle = "rgba(0,0,0,0.3)";
    context.font = "1000 25px Free Pixel";
    context.fillText("FPS: "+ fps(timeStamp), 10, 30);
    // ----------
}
