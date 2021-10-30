"use strict";
import {GAME_update, GAME_render} from "./function/Playing.js";
import {MENU_update, MENU_render} from "./function/StartMenu.js";
import {GameOver_update, GameOver_render} from "./function/GameOver.js";
import {PAUSED_update, PAUSED_render, PAUSED_reset_variables} from "./function/Paused.js";
import {addToLoad, loadEvent, loadedAssets, assetsToLoad} from "./function/LoadAssets.js";
import Camera from "./class/Camera.js";
import {Variables, change_variable} from "./util/Variables.js";
// -----------
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
const FreePixel = new FontFace("Free Pixel", "url('./font/FreePixel.ttf')");
const camera = new Camera((Variables.player.position.x-canvas.width)/4, (Variables.player.position.y-canvas.height)/4, canvas.width, canvas.height);
change_variable("context", context);
let loadFont = true;

addToLoad(FreePixel);
loadEvent();
// -----------

// inputs
document.addEventListener("keydown", (event) => {
    Variables.keys[event.key.toLowerCase()] = true;
});
document.addEventListener("keyup", (event) => {
    const key = event.key.toLowerCase();
    Variables.keys[key] = false;
    if(Variables.gameState === Variables.PAUSED) Variables.keysUp[key] = true;
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
            MENU_update();
            MENU_render();
            break;
        case Variables.PLAYING:
            GAME_update(camera);
            GAME_render(timeStamp, camera, canvas);
            PAUSED_reset_variables();
            break;
        case Variables.PAUSED:
            PAUSED_update();
            PAUSED_render();
            break;
        case Variables.GAME_OVER:
            GameOver_update();
            GameOver_render();
            break;
        }
    }
}
