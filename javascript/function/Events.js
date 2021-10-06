let frames = 30;
let floor = 10;
export function movePlayer(player, keys) {
    if(keys.ArrowUp) {
        player.sprites.imgY =  player.Mask.height * 0;
        player.moveY(-1);
    }
    if(keys.ArrowDown) {
        player.sprites.imgY =  player.Mask.height * 2;
        player.moveY(1);
    }
    if(keys.ArrowRight) {
        player.sprites.imgY =  player.Mask.height * 1;
        player.moveX(1);
    }
    if(keys.ArrowLeft) {
        player.sprites.imgY =  player.Mask.height * 3;
        player.moveX(-1);
    }
    if(keys.ArrowDown || keys.ArrowUp || keys.ArrowLeft || keys.ArrowRight) {
        player.sprites.frameAnimation++;
        if(keys.Shift) {
            frames = 15;
            floor = 5;
        } else {
            frames = 30;
            floor = 10;
        }
        if(player.sprites.frameAnimation >= frames) {
            player.sprites.frameAnimation = 0;
        }
        player.sprites.imgX = Math.floor(player.sprites.frameAnimation/floor) * player.Mask.width;
    }
    if(!keys.ArrowDown && !keys.ArrowUp && !keys.ArrowLeft && !keys.ArrowRight) {
        player.sprites.frameAnimation = 1;
        player.sprites.imgX =player.sprites.frameAnimation  * player.Mask.width;
    }
    player.sprint(keys.Shift);
}
export function selectMenu() {
}