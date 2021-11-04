import {move_player} from "./Movement.js";
import {Collision, border_collision} from "./Collision.js";
import {dialog_detect, dialog_render, dialog_select_options, reset_dialog} from "./Dialog.js";
import {combat_detect, combat_render, Combat} from "./Combat.js";
import {inventory_render, inventory_update} from "./Inventory.js";
import {Variables, change_variable} from "./../util/Variables.js";
import FPS_draw from "./fps.js";
import Message from "./Message.js";
let Vignette = true;
let i = 0;
let selected_world = Variables.selected_world;
let world = Variables.Worlds[selected_world];
export async function GAME_update(camera) {
    selected_world = Variables.selected_world;
    world = Variables.Worlds[selected_world];
    change_variable("Blocks", world.blocks);
    if(!Variables["dialog"]){
        if(!Variables["inventory"]) {
            if(!Variables["combat"]) {
                if(Variables.keys.v)
                    console.log(Variables.player);
                move_player(Variables.player, Variables.keys);
                // Movimentação da Camera
                if(Variables.player.position.y < camera.topBorder()) camera.y = Variables.player.position.y-camera.height * 0.25;
                if(Variables.player.position.x > camera.rightBorder()) camera.x = Variables.player.position.x-camera.width * 0.25;
                if(Variables.player.position.y > camera.bottomBorder()) camera.y = Variables.player.position.y-camera.height * 0.25;
                if(Variables.player.position.x < camera.leftBorder()) camera.x = Variables.player.position.x-camera.width * 0.25;
                // Colisões
                border_collision(Variables.player, world);
                Variables.Blocks.forEach( block => {
                    Collision(Variables.player, block);
                });
                Variables.NPCs.forEach( NPC => {
                    if(NPC.map === world.name) {
                        Collision(Variables.player, NPC);
                        if(dialog_detect(Variables.player, NPC)) {
                            if(Variables.keys.enter) {
                                Variables.keys.enter = false;
                                change_variable("dialog", true);
                                reset_dialog();
                            }
                        }
                    }
                });
                Variables.enemies_ready.forEach( (enemy, index) => {
                    if(enemy.map === world.name) {
                        Collision(Variables.player, enemy);
                        if(combat_detect(Variables.player, enemy, index)) {
                            Vignette = true;
                            change_variable("combat", true);
                        }
                        
                    }
                });
                if(Variables.keys.escape) {
                    change_variable(["keys", "escape"], false);
                    change_variable("gameState", Variables.PAUSED);
                }
                if(Variables.keys.e || Variables.keys.i) {
                    Variables.keys.e = false;
                    Variables.keys.i = false;
                    change_variable("inventory", true);
                }
                if(Variables.enemy_spawn >= 750) {
                    const randomNumber = Math.random();
                    if(randomNumber <= 0.25) {
                        const position = Variables.enemies_ready.push(Variables.all_enemies[0]) - 1;
                        Variables.enemies_ready[position].position = Variables.player.position;
                    }
                    else if(randomNumber <= 0.50) {
                        const position = Variables.enemies_ready.push(Variables.all_enemies[1]) - 1;
                        Variables.enemies_ready[position].position = Variables.player.position;
                    }
                    else if(randomNumber <= 0.75) {
                        const position = Variables.enemies_ready.push(Variables.all_enemies[2]) - 1;
                        Variables.enemies_ready[position].position = Variables.player.position;
                    }
                    else if(randomNumber <= 1) {
                        const position = Variables.enemies_ready.push(Variables.all_enemies[3]) - 1;
                        Variables.enemies_ready[position].position = Variables.player.position;
                    }
                    Variables.enemy_spawn = 0;
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
                change_variable("inventory", false);
            }
            inventory_update(Variables.keys);
        }
    } else {
        dialog_select_options(Variables.keys, Variables.player);
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
            if(NPC.map === world.name)
                NPC.draw(Variables.context);
        });
        Variables.enemies_ready.forEach( enemy => {
            if(enemy.map === world.name && enemy.visible)
                enemy.draw(Variables.context);
        });
        // ----------
        Variables.context.restore();
        // Dialog
        if(Variables.dialog) {
            dialog_render();
        }
        // Inventory
        if(Variables.inventory) {
            inventory_render();
        }
        // Inventory
        if(Variables.combat) {
            combat_render();
        }
        // FPS renderGame
        FPS_draw(timeStamp);
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
