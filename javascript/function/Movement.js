import {Variables} from "../util/Variables.js";
let frames = 30;
let floor = 10;
export function move_player(player, keys) {
    if(player.sprites.left)
        player.sprites.imgY = player.sprites.height * 1;
    else
        player.sprites.imgY = player.sprites.height * 0;
    if(keys.arrowup || keys.w) {
        if(player.sprites.left === true)
            player.sprites.imgY = player.sprites.height * 3;
        else
            player.sprites.imgY = player.sprites.height * 2;
        player.moveY(-1);
    }
    if(keys.arrowdown || keys.s) {
        if(player.sprites.left === true)
            player.sprites.imgY = player.sprites.height * 3;
        else
            player.sprites.imgY = player.sprites.height * 2;
        player.moveY(1);
    }
    if(keys.arrowright || keys.d) {
        player.sprites.imgY = player.sprites.height * 2;
        player.sprites.left = false;
        player.moveX(1);
    }
    if(keys.arrowleft || keys.a) {
        player.sprites.imgY = player.sprites.height * 3;
        player.sprites.left = true;
        player.moveX(-1);
    }
    
    if(keys.arrowdown || keys.arrowup || keys.arrowleft || keys.arrowright || keys.a || keys.d || keys.s || keys.w) {
        player.sprites.frameAnimation++;
        if(keys.shift) {
            if(player.sprites.left === true)
                player.sprites.imgY = player.sprites.height * 5;
            else
                player.sprites.imgY = player.sprites.height * 4;
        } else {
            frames = 40;
            floor = 10;
        }
        if(player.sprites.frameAnimation >= frames) {
            player.sprites.frameAnimation = 0;
        }
        player.sprites.imgX = Math.floor(player.sprites.frameAnimation/floor) * player.sprites.width;
        
        if(Variables.selected_world === "main")
            Variables.enemy_spawn++;
    }
    if(!keys.arrowdown && !keys.arrowup && !keys.arrowleft && !keys.arrowright && !keys.a && !keys.d && !keys.s && !keys.w) {
        player.sprites.frameAnimation++;
        
        if(player.sprites.frameAnimation >= frames) {
            player.sprites.frameAnimation = 0;
        }
        player.sprites.imgX = Math.floor(player.sprites.frameAnimation/floor) * player.sprites.width;
    }
    player.sprint(keys.shift);
}