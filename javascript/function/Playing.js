import {movePlayer} from "./Events.js";
import {Collision, BorderCollision} from "./Collision.js";
import fps from "./Fps.js";
let Vignette = true;
let i = 0;
export function GAME_update(player, keys, camera, blocks_Collision, world) {
    movePlayer(player, keys);
    // Movimentação da Camera
    if(player.Position.y < camera.topBorder()) camera.y = player.Position.y-camera.height * 0.5;
    if(player.Position.x > camera.rightBorder()) camera.x = player.Position.x-camera.width * 0.5;
    if(player.Position.y > camera.bottomBorder()) camera.y = player.Position.y-camera.height * 0.5;
    if(player.Position.x < camera.leftBorder()) camera.x = player.Position.x-camera.width * 0.5;
    // Colisões
    BorderCollision(player, world);
    blocks_Collision.forEach( block => {
        Collision(player, block);
    });
}
export function GAME_render(timeStamp, context, player, camera, blocks_renderGame, canvas) {
    if(Vignette) {
        i = vignette(context, canvas, i);
    } else {
        context.fillStyle = "#383838";
        context.save();
        context.translate(-camera.x, -camera.y);
        context.clearRect(player.Position.x-canvas.width/2, player.Position.y-canvas.height/2, 900, 600);
        // Código
        player.draw(context);
        blocks_renderGame.forEach( block => {
            block.draw(context);
        });
        // ----------
        context.restore();
        // FPS renderGame
        context.fillStyle = "rgba(0,0,0,1)";
        context.font = "1000 25px Free Pixel";
        context.fillText("FPS: "+ fps(timeStamp), 10, 30);
        // ----------
    }
}

function vignette(context, canvas, i) {
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, i*15);
    context.fillRect(0, canvas.height-i*15, canvas.width, i*15);
    i++;
    if(i == 20) {
        Vignette = false;
        i = 0;
    }
    return i;
}