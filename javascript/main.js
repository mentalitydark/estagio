"use strict";
import {GAME_update, GAME_render} from "./function/Playing.js";
import {MENU_update, MENU_render} from "./function/StartMenu.js";
import {PAUSED_update, PAUSED_render, resetVariables_PAUSED} from "./function/Paused.js";
import {addToLoad, loadEvent, loadedAssets, assetsToLoad} from "./function/LoadAssets.js";
import Player from "./class/player.js";
import Camera from "./class/Camera.js";
import World from "./class/World.js";
import {load} from "./function/IndexedDB.js";
import {keyMap} from "./util/KeyMap.js";
import {Variables, changeVariable} from "./util/Variables.js";
// -----------

// const
// TODO Organizar em um arquivo separado
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
const world_bg = new Image();
const sprites = new Image();
const FreePixel = new FontFace("Free Pixel", "url('./font/FreePixel.ttf')");
// -----------

// let
// TODO Organizar em um arquivo separado
let keys = {};
let keysUp = {};
let blocks_renderGame = [];
let blocks_Collision = [];
let loadFont = true;
// -----------

// Image Load
world_bg.src = "./img/world/Mapa.png";
sprites.src = "./img/sprites/Player.png";
addToLoad(world_bg);
addToLoad(sprites);
addToLoad(FreePixel);
loadEvent();
// -----------

// objetos
const player = new Player("Maou", sprites);
const camera = new Camera((player.Position.x-canvas.width)/4, (player.Position.y-canvas.height)/4, canvas.width, canvas.height);
const world = new World(2000, 1500, world_bg);
// TODO Organizar em um arquivo separado
Variables.Blocks.forEach( block => {
    blocks_renderGame.push(block);
    blocks_Collision.push(block);
});
// -----------

// inputs
document.addEventListener("keydown", (event) => {
    keys[event.key.toLowerCase()] = true;
});
document.addEventListener("keyup", (event) => {
    const key = event.key.toLowerCase();
    keys[key] = false;
    if(Variables.gameState === Variables.PAUSED) keysUp[key] = true;
    switch (key) {
    case keyMap.escape:
        if(Variables.gameState === Variables.PLAYING || Variables.gameState === Variables.PAUSED)
            Variables.gameState === Variables.PLAYING ? changeVariable("gameState", Variables.PAUSED) : changeVariable("gameState", Variables.PLAYING);
        break;
    case keyMap.enter:
        if(Variables.gameState === Variables.START_MENU) {
            Variables.gameState = Variables.PLAYING;
            load(player);
        }
        break;
    }
});
// ----------

document.addEventListener("DOMContentLoaded", () => {
    window.requestAnimationFrame(gameLoop);
    context.imageSmoothingEnabled = false;
    context.scale(2, 2);
});
function gameLoop(timeStamp) {
    window.requestAnimationFrame(gameLoop, canvas);
    if(loadedAssets === assetsToLoad.length) {
        if(loadFont) {
            document.fonts.add(FreePixel);
            loadFont = false;
        }
        Variables.LOADING = true;
    }
    if(Variables.LOADING) {
        switch (Variables.gameState) {
        case Variables.START_MENU:
            MENU_update(context);
            MENU_render(context, canvas);
            break;
        case Variables.PLAYING:
            GAME_update(player, keys, camera, blocks_Collision, world);
            GAME_render(timeStamp, context, world, player, camera, blocks_renderGame, canvas);
            resetVariables_PAUSED();
            break;
        case Variables.PAUSED:
            PAUSED_update(keysUp, player);
            PAUSED_render(context);
            break;
        }
    }
}
