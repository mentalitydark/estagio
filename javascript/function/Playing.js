import {movePlayer} from "./Events.js";
import {Collision, BorderCollision} from "./Collision.js";
import Dialog from "./Dialog.js";
import {load, save} from "./IndexedDB.js";
import {Variables} from "./../util/Variables.js";
import fps from "./fps.js";
let Vignette = true;
let i = 0;
export async function GAME_update(player, keys, camera, blocks_Collision, world) {
    movePlayer(player, keys);
    // Movimentação da Camera
    if(player.Position.y < camera.topBorder()) camera.y = player.Position.y-camera.height * 0.25;
    if(player.Position.x > camera.rightBorder()) camera.x = player.Position.x-camera.width * 0.25;
    if(player.Position.y > camera.bottomBorder()) camera.y = player.Position.y-camera.height * 0.25;
    if(player.Position.x < camera.leftBorder()) camera.x = player.Position.x-camera.width * 0.25;
    // Colisões
    BorderCollision(player, world);
    blocks_Collision.forEach( block => {
        Collision(player, block);
    });
    Variables.NPCs.forEach( NPC => {
        Collision(player, NPC);
        Dialog(player, NPC);
    });
    // Save & Load
    if(keys.p) {
        keys.p = false;
        save(player);
    }
    if(keys.o) {
        keys.o = false;
        Vignette = true;
        load(player);
        
    }
}
export function GAME_render(timeStamp, context, world, player, camera, blocks_renderGame, canvas) {
    if(Vignette) {
        i = vignette(context, canvas, i);
    } else {
        context.fillStyle = "#383838";
        context.save();
        context.translate(-camera.x, -camera.y);
        context.clearRect(player.Position.x-canvas.width/2, player.Position.y-canvas.height/2, 900, 600);
        // Código
        world.draw(context);
        player.draw(context);
        blocks_renderGame.forEach( block => {
            block.draw(context);
        });
        Variables.NPCs.forEach(NPC => {
            NPC.draw(context);
        });
        // ----------
        context.restore();
        // FPS renderGame
        const fpsText = fps(timeStamp);
        context.fillStyle = "#e5ed04";
        context.strokeStyle = "rgb(0, 0, 0)";
        context.lineWidth = 1.5;
        context.font = "12px Free Pixel";
        context.strokeText("FPS: "+ fpsText, 2, 10);
        context.stroke();
        context.fillText("FPS: "+ fpsText, 2, 10);
        context.fill();
        // ----------
    }
}

function vignette(context, canvas, i) {
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, i*15);
    i++;
    if(i == 20) {
        Vignette = false;
        i = 0;
    }
    return i;
}
