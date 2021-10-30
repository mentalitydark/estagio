import { Variables, change_variable } from "./../util/Variables.js";
export function Collision(player, block) {
    const catX = player.centerX() - block.centerX();
    const catY = player.centerY() - block.centerY();
    const sumHalfWidth = player.halfWidth() + block.halfWidth();
    const sumHalfHeight = player.halfHeight() + block.halfHeight();
    if(Math.abs(catX) < sumHalfWidth && Math.abs(catY) < sumHalfHeight) {
        const overlapX = sumHalfWidth - Math.abs(catX);
        const overlapY = sumHalfHeight - Math.abs(catY);
        if(block.collision) {
            if(overlapX >= overlapY) {
                if(catY > 0) {
                    player.position.y += overlapY;
                } else {
                    player.position.y -= overlapY;
                }
            } else {
                if(catX > 0) {
                    player.position.x += overlapX;
                } else {
                    player.position.x -= overlapX;
                }
            }
        } else {
            if(block.to !== "main") {
                Variables.Worlds.main.teleport = {
                    x: player.position.x,
                    y: player.position.y+5
                };
            }
            change_variable(["Worlds", "select"], block.to);
            player.teleport(Variables.Worlds[block.to].teleport);
        }
    }
}
export function border_collision(player, world) {
    player.position.x = Math.max(0, player.position.x);
    player.position.x = Math.max(0, Math.min(world.width - player.mask.width, player.position.x));
    player.position.y = Math.max(0, player.position.y);
    player.position.y = Math.max(0, Math.min(world.height - player.mask.height, player.position.y));
}