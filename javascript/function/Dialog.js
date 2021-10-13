let NPCSelect;
export function DialogDetect(player, NPC) {
    const catX = player.centerX() - NPC.dialogCenterX();
    const catY = player.centerY() - NPC.dialogCenterY();
    const sumHalfWidth = player.halfWidth() + NPC.dialogHalfWidth();
    const sumHalfHeight = player.halfHeight() + NPC.dialogHalfHeight();
    if(Math.abs(catX) < sumHalfWidth && Math.abs(catY) < sumHalfHeight) {
        NPCSelect = NPC;
        return true;
    }
}
export function DialogRender(context) {
    context.fillRect(0, 150, 400, 100);
    context.fillStyle = "#fff";
    const dialog = NPCSelect.Dialogs.conversa.dialog.split("\n");
    for(let i = 0; i < dialog.length; i++) {
        context.fillText(dialog[i], 10, 165 + i*10);
    }
    const options = NPCSelect.Dialogs.conversa.options.split("\n");
    for(let i = 0; i < options.length; i++) {
        context.fillText(options[i], 10, 195 + i*10);
    }

}