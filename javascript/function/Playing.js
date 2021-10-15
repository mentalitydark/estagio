import {movePlayer} from "./Events.js";
import {Collision, BorderCollision} from "./Collision.js";
import {DialogDetect, DialogRender, DialogSelectOptions, resetDialog} from "./Dialog.js";
import {Variables, changeVariable} from "./../util/Variables.js";
import fps from "./fps.js";
let Vignette = true;
let i = 0;
let worldSelect = Variables.Worlds.select;
let world = Variables.Worlds[worldSelect];
export async function GAME_update(player, keys, camera) {
    worldSelect = Variables.Worlds.select;
    world = Variables.Worlds[worldSelect];
    changeVariable("Blocks", world.blocks);
    if(!Variables["dialog"]){
        movePlayer(player, keys);
        // Movimentação da Camera
        if(player.Position.y < camera.topBorder()) camera.y = player.Position.y-camera.height * 0.25;
        if(player.Position.x > camera.rightBorder()) camera.x = player.Position.x-camera.width * 0.25;
        if(player.Position.y > camera.bottomBorder()) camera.y = player.Position.y-camera.height * 0.25;
        if(player.Position.x < camera.leftBorder()) camera.x = player.Position.x-camera.width * 0.25;
        // Colisões
        BorderCollision(player, world);
        Variables.Blocks.forEach( block => {
            Collision(player, block);
        });
    } else {
        DialogSelectOptions(keys, player);
    }
    Variables.NPCs.forEach( NPC => {
        Collision(player, NPC);
        if(DialogDetect(player, NPC)) {
            if(keys.enter) {
                keys.enter = false;
                changeVariable("dialog", true);
                resetDialog();
            }
        }
    });
}
export function GAME_render(timeStamp, context, player, camera, canvas) {
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
        Variables.Blocks.forEach( block => {
            block.draw(context);
        });
        Variables.NPCs.forEach(NPC => {
            NPC.draw(context);
        });
        // ----------
        context.restore();
        // Dialog
        if(Variables.dialog) {
            DialogRender(context);
        }
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
