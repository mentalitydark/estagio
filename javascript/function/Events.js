export function movePlayer(player, keys) {
    if(keys.ArrowUp) player.moveY(-1);
    if(keys.ArrowDown) player.moveY(1);
    if(keys.ArrowRight) player.moveX(1);
    if(keys.ArrowLeft) player.moveX(-1);
    player.sprint(keys.Shift);
}
export function selectMenu() {
}