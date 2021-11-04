import {Variables} from "../util/Variables.js";
let frames = 30;
let floor = 10;
export function move_player(player, keys) {
    if(keys.arrowup || keys.w) {
        player.sprites.imgY =  player.mask.height * 0;
        player.moveY(-1);
    }
    if(keys.arrowdown || keys.s) {
        player.sprites.imgY =  player.mask.height * 2;
        player.moveY(1);
    }
    if(keys.arrowright || keys.d) {
        player.sprites.imgY =  player.mask.height * 1;
        player.moveX(1);
    }
    if(keys.arrowleft || keys.a) {
        player.sprites.imgY =  player.mask.height * 3;
        player.moveX(-1);
    }
    if(keys.arrowdown || keys.arrowup || keys.arrowleft || keys.arrowright || keys.a || keys.d || keys.s || keys.w) {
        player.sprites.frameAnimation++;
        if(keys.shift) {
            frames = 15;
            floor = 5;
        } else {
            frames = 30;
            floor = 10;
        }
        if(player.sprites.frameAnimation >= frames) {
            player.sprites.frameAnimation = 0;
        }
        player.sprites.imgX = Math.floor(player.sprites.frameAnimation/floor) * player.mask.width;
        
        if(Variables.selected_world === "main")
            Variables.enemy_spawn++;
    }
    if(!keys.arrowdown && !keys.arrowup && !keys.arrowleft && !keys.arrowright && !keys.a && !keys.d && !keys.s && !keys.w) {
        player.sprites.frameAnimation = 1;
        player.sprites.imgX =player.sprites.frameAnimation  * player.mask.width;
    }
    player.sprint(keys.shift);
}