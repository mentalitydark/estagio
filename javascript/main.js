"use strict";
import {GAME_update, GAME_render} from "./function/Playing.js";
import {MENU_update, MENU_render} from "./function/StartMenu.js";
import {PAUSED_update, PAUSED_render} from "./function/Paused.js";
import {addToLoad, loadEvent, loadedAssets, assetsToLoad} from "./function/LoadImgs.js";
import Player from "./class/player.js";
import Camera from "./class/Camera.js";
import World from "./class/World.js";
import {load} from "./function/IndexedDB.js";
import {keyMap, changeKey} from "./util/KeyMap.js";
import {Blocks} from "./util/Variables.js";
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
world_bg.src = "./img/world/Mapa.png";
sprites.src = "./img/sprites/Player.png";
addToLoad(world_bg);
addToLoad(sprites);
loadEvent();
// -----------

// objetos
const player = new Player("Maou", sprites);
const camera = new Camera((player.Position.x-canvas.width+16)/2, (player.Position.y-canvas.height+16)/2, canvas.width, canvas.height);
const world = new World(2000, 1500, world_bg);
// TODO Organizar em um arquivo separado
Blocks.forEach( block => {
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
// context.imageSmoothingEnabled = false;
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
            GAME_render(timeStamp, context, world, player, camera, blocks_renderGame, canvas);
            break;
        case PAUSED:
            PAUSED_update(context);
            PAUSED_render(context, canvas);
            break;
        }
    }
}
