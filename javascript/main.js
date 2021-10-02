"use strict";
import {GAME_update, GAME_render} from "./function/Playing.js";
import {MENU_update, MENU_render} from "./function/StartMenu.js";
import {PAUSED_update, PAUSED_render} from "./function/Paused.js";
import {addToLoad, loadEvent, loadedAssets, assetsToLoad} from "./function/LoadImgs.js";
import Player from "./class/player.js";
import Block from "./class/Block.js";
import Camera from "./class/Camera.js";
import World from "./class/World.js";
import {load} from "./function/IndexedDB.js";
import {keyMap, changeKey} from "./util/KeyMap.js";
// -----------

// const
// TODO Organizar em um arquivo separado
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
const world_bg = new Image();
const sprites = new Image();
const START_MENU = 1;
const PAUSED = 2;
const PLAYING = 3;
// -----------

// let
// TODO Organizar em um arquivo separado
let LOADING = true;
let keys = {};
let blocks_renderGame = [];
let blocks_Collision = [];
let gameState = 1;
// -----------

// Image Load
world_bg.src = "../img/world/map.png";
sprites.src = "../img/sprites/char.png";
addToLoad(world_bg);
addToLoad(sprites);
loadEvent();
// -----------

// objetos
const player = new Player("Maou");
const camera = new Camera((player.Position.x-canvas.width+16)/2, (player.Position.y-canvas.height+16)/2, canvas.width, canvas.height);
const world = new World(1500, 1500, world_bg);
// TODO Organizar em um arquivo separado
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
    blocks_renderGame.push(block);
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
    case keyMap.Escape:
        gameState = gameState === PLAYING ? PAUSED : PLAYING;
        break;
    case keyMap.Enter:
        gameState = PLAYING;
        changeKey("Enter", null);
        load(player);
        break;
    case keyMap.p:
        if(gameState === PLAYING)
            keys["p"] = true;
        break;
    case keyMap.o:
        if(gameState === PLAYING)
            keys["o"] = true;
        break;
    }
});
// ----------

document.addEventListener("DOMContentLoaded", () => {
    window.requestAnimationFrame(gameLoop);
});
function gameLoop(timeStamp) {
    window.requestAnimationFrame(gameLoop, canvas);
    if(loadedAssets === assetsToLoad.length) LOADING = true;
    if(LOADING) {
        switch (gameState) {
        case START_MENU:
            MENU_update(context);
            MENU_render(context, canvas);
            break;
        case PLAYING:
            GAME_update(player, keys, camera, blocks_Collision, world);
            GAME_render(timeStamp, context, player, camera, blocks_renderGame, canvas);
            break;
        case PAUSED:
            PAUSED_update(context);
            PAUSED_render(context, canvas);
            break;
        }
    }
}
