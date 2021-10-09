export default function Dialog(player, NPC) {
    const catX = player.centerX() - NPC.dialogCenterX();
    const catY = player.centerY() - NPC.dialogCenterY();
    const sumHalfWidth = player.halfWidth() + NPC.dialogHalfWidth();
    const sumHalfHeight = player.halfHeight() + NPC.dialogHalfHeight();
    if(Math.abs(catX) < sumHalfWidth && Math.abs(catY) < sumHalfHeight) {
        const overlapX = sumHalfWidth - Math.abs(catX);
        const overlapY = sumHalfHeight - Math.abs(catY);
        if(overlapX >= overlapY) {
            if(catY > 0) {
                console.log(player.Position,NPC.Position);
            } else {
                console.log(player.Position,NPC.Position);
            }
        } else {
            if(catX > 0) {
                console.log(player.Position,NPC.Position);
            } else {
                console.log(player.Position,NPC.Position);
            }
        }
    }
}