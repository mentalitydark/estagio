import {movePlayer} from "./Events.js";
import {Collision, BorderCollision} from "./Collision.js";
import {DialogDetect, DialogRender, DialogSelectOptions, resetDialog} from "./Dialog.js";
import {Variables, changeVariable} from "./../util/Variables.js";
import FPSDraw from "./fps.js";
import Message from "./Message.js";
let Vignette = true;
let i = 0;
let worldSelect = Variables.Worlds.select;
let world = Variables.Worlds[worldSelect];
export async function GAME_update(camera) {
    worldSelect = Variables.Worlds.select;
    world = Variables.Worlds[worldSelect];
    changeVariable("Blocks", world.blocks);

    if(!Variables["dialog"]){
        movePlayer(Variables.player, Variables.keys);
        // Movimentação da Camera
        if(Variables.player.Position.y < camera.topBorder()) camera.y = Variables.player.Position.y-camera.height * 0.25;
        if(Variables.player.Position.x > camera.rightBorder()) camera.x = Variables.player.Position.x-camera.width * 0.25;
        if(Variables.player.Position.y > camera.bottomBorder()) camera.y = Variables.player.Position.y-camera.height * 0.25;
        if(Variables.player.Position.x < camera.leftBorder()) camera.x = Variables.player.Position.x-camera.width * 0.25;
        // Colisões
        BorderCollision(Variables.player, world);
        Variables.Blocks.forEach( block => {
            Collision(Variables.player, block);
        });
    } else {
        DialogSelectOptions(Variables.keys, Variables.player);
    }

    Variables.NPCs.forEach( NPC => {
        if(NPC.Map === world.name) {
            Collision(Variables.player, NPC);
            if(DialogDetect(Variables.player, NPC)) {
                if(Variables.keys.enter) {
                    Variables.keys.enter = false;
                    changeVariable("dialog", true);
                    resetDialog();
                }
            }
        }
    });

    if(Variables.keys.p) {
        Variables.keys.p = false;
        Variables.player.addXP(3000);
        changeVariable(["message", "bool"], true);
        changeVariable(["message", "text"], `Player upou para o nível: ${Variables.player.Level}`);
    }
    if(Variables.keys.escape) {
        changeVariable(["keys", "escape"], false);
        changeVariable("gameState", Variables.PAUSED);
    }
}
export function GAME_render(timeStamp, camera, canvas) {
    if(Vignette) {
        i = vignette(i);
    } else {
        Variables.context.fillStyle = "#383838";
        Variables.context.save();
        Variables.context.translate(-camera.x, -camera.y);
        Variables.context.clearRect(Variables.player.Position.x-canvas.width/2, Variables.player.Position.y-canvas.height/2, 900, 600);
        // Código
        world.draw(Variables.context);
        Variables.player.draw(Variables.context);
        Variables.Blocks.forEach( block => {
            block.draw(Variables.context);
        });
        Variables.NPCs.forEach(NPC => {
            if(NPC.Map === world.name)
                NPC.draw(Variables.context);
        });
        // ----------
        Variables.context.restore();
        // Dialog
        if(Variables.dialog) {
            DialogRender();
        }
        // FPS renderGame
        FPSDraw(timeStamp);
        // ----------
        if(Variables.message.bool) {
            Message();
        }
    }
}

function vignette(i) {
    Variables.context.fillStyle = "#000";
    Variables.context.fillRect(0, 0, 400, i*15);
    i++;
    if(i == 20) {
        Vignette = false;
        i = 0;
    }
    return i;
}
