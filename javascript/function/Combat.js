let enemySelect;
export function CombatDetect(player, enemy) {
    const catX = player.centerX() - enemy.combatCenterX();
    const catY = player.centerY() - enemy.combatCenterY();
    const sumHalfWidth = player.halfWidth() + enemy.combatHalfWidth();
    const sumHalfHeight = player.halfHeight() + enemy.combatHalfHeight();
    if(Math.abs(catX) < sumHalfWidth && Math.abs(catY) < sumHalfHeight) {
        enemySelect = enemy;
        return true;
    }
}