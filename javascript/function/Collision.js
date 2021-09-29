export function Collision(player, block) {
    const catX = player.centerX() - block.centerX();
    const catY = player.centerY() - block.centerY();
    const sumHalfWidth = player.halfWidth() + block.halfWidth();
    const sumHalfHeight = player.halfHeight() + block.halfHeight();
    if(Math.abs(catX) < sumHalfWidth && Math.abs(catY) < sumHalfHeight) {
        const overlapX = sumHalfWidth - Math.abs(catX);
        const overlapY = sumHalfHeight - Math.abs(catY);
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
    }
}
export function BorderCollision(player, world) {
    player.position.x = Math.max(0, player.Position.x);
    player.position.x = Math.max(0, Math.min(world.width - player.Mask.width, player.Position.x));
    player.position.y = Math.max(0, player.Position.y);
    player.position.y = Math.max(0, Math.min(world.height - player.Mask.height, player.Position.y));
}