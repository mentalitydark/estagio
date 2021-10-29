import {movePlayer} from "./Events.js";
import {Collision, BorderCollision} from "./Collision.js";
import {DialogDetect, DialogRender, DialogSelectOptions, resetDialog} from "./Dialog.js";
import {CombatDetect, CombatRender, Combat} from "./Combat.js";
import {InventoryRender, InventoryEvents} from "./Inventory.js";
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
        if(!Variables["inventory"]) {
            if(!Variables["combat"]) {
                movePlayer(Variables.player, Variables.keys);
                // Movimentação da Camera
                if(Variables.player.position.y < camera.topBorder()) camera.y = Variables.player.position.y-camera.height * 0.25;
                if(Variables.player.position.x > camera.rightBorder()) camera.x = Variables.player.position.x-camera.width * 0.25;
                if(Variables.player.position.y > camera.bottomBorder()) camera.y = Variables.player.position.y-camera.height * 0.25;
                if(Variables.player.position.x < camera.leftBorder()) camera.x = Variables.player.position.x-camera.width * 0.25;
                // Colisões
                BorderCollision(Variables.player, world);
                Variables.Blocks.forEach( block => {
                    Collision(Variables.player, block);
                });
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
                Variables.AllEnemies.forEach( (enemy, index) => {
                    if(enemy.map === world.name) {
                        Collision(Variables.player, enemy);
                        if(CombatDetect(Variables.player, enemy, index)) {
                            Vignette = true;
                            changeVariable("combat", true);
                        }
                        
                    }
                });
                if(Variables.keys.p) {
                    Variables.keys.p = false;
                    Variables.player.addXP(100);
                    changeVariable(["message", "bool"], true);
                    changeVariable(["message", "text"], `Player upou para o nível: ${Variables.player.level}`);
                }
                if(Variables.keys.escape) {
                    changeVariable(["keys", "escape"], false);
                    changeVariable("gameState", Variables.PAUSED);
                }
                if(Variables.keys.e || Variables.keys.i) {
                    Variables.keys.e = false;
                    Variables.keys.i = false;
                    changeVariable("inventory", true);
                }
            } else {
                if(Variables.keys.e || Variables.keys.i) {
                    Variables.keys.e = false;
                    Variables.keys.i = false;
                    Variables.player.recover("mp", -5);
                }
                Combat(Variables.keys);
            }
        } else {
            if(Variables.keys.e || Variables.keys.i || Variables.keys.escape) {
                Variables.keys.e = false;
                Variables.keys.i = false;
                Variables.keys.escape = false;
                changeVariable("inventory", false);
            }
            InventoryEvents(Variables.keys);
        }
    } else {
        DialogSelectOptions(Variables.keys, Variables.player);
    }
}
export function GAME_render(timeStamp, camera, canvas) {
    if(Vignette) {
        i = vignette(i);
    } else {
        Variables.context.fillStyle = "#383838";
        Variables.context.save();
        Variables.context.translate(-camera.x, -camera.y);
        Variables.context.clearRect(Variables.player.position.x-canvas.width/2, Variables.player.position.y-canvas.height/2, 900, 600);
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
        Variables.AllEnemies.forEach( enemy => {
            if(enemy.map === world.name)
                enemy.draw(Variables.context);
        });
        // ----------
        Variables.context.restore();
        // Dialog
        if(Variables.dialog) {
            DialogRender();
        }
        // Inventory
        if(Variables.inventory) {
            InventoryRender();
        }
        // Inventory
        if(Variables.combat) {
            CombatRender();
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
