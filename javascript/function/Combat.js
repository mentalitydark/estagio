import {Variables, changeVariable} from "./../util/Variables.js";
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
export function CombatRender() {
    const lifePercentage = Variables.player.Life*100/Variables.player.MaxLife/100;
    const mpPercentage = Variables.player.Mp*100/Variables.player.MaxMp/100;
    Variables.context.fillStyle = "#161616";
    Variables.context.fillRect(0,0, 400, 225);
    Variables.context.fillStyle = "#383838";
    Variables.context.fillRect(0,151, 400, 74);
    Variables.context.fillStyle = "black";
    Variables.context.fillRect(21,210, 70, 10);
    Variables.context.fillRect(224,210, 70, 10);
    Variables.context.fillStyle = "red";
    Variables.context.fillRect(21,210, 70*lifePercentage, 10);
    Variables.context.fillStyle = "blue";
    Variables.context.fillRect(224,210, 70*mpPercentage, 10);
    Variables.context.fillStyle = "white";
    Variables.context.font = "12pt Free Pixel";
    Variables.context.fillText(Variables.player.Name, 3, 164);
    Variables.context.fillText(`Level: ${Variables.player.Level}`, 130, 164);
    Variables.context.fillText("HP", 3, 220);
    Variables.context.fillText("MP", 205, 220);
    Variables.context.fillText(enemySelect.name, 200-Variables.context.measureText(enemySelect.name).width/2, 38);
    Variables.context.font = "6pt Free Pixel";
    const enemyHp = `${enemySelect.life}/${enemySelect.maxLife}`;
    Variables.context.fillText(enemyHp, 200-Variables.context.measureText(enemyHp).width/2, 120);
    const hp = `${Variables.player.Life}/${Variables.player.MaxLife}`;
    Variables.context.fillText(hp, 56.129-Variables.context.measureText(hp).width/2, 217.5);
    const mp = `${Variables.player.Mp}/${Variables.player.MaxMp}`;
    Variables.context.fillText(mp, 259.129-Variables.context.measureText(mp).width/2, 217.5);
}