import {Variables} from "./../util/Variables.js";
let enemySelect;
let option = 0;
let optionSelect;
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
export function CombatSelectOptions(keys) {
    if(keys.arrowleft || keys.a) {
        keys.arrowleft = keys.a = false;
        option--;
        if(optionSelect === undefined) {
            if(option < 0)
                option = 2;
        } else {
            if(option < 0)
                option = 1;
        }
    }
    if(keys.arrowright || keys.d) {
        keys.arrowright = keys.d = false;
        option++;
        if(optionSelect === undefined) {
            if(option > 2)
                option = 0;
        } else {
            if(option > 1)
                option = 0;
        }
    }
    if(optionSelect === undefined) {
        if(keys.enter) {
            keys.enter = false;
            switch(option) {
            case 0:
                optionSelect = "atacar";
                break;
            case 1:
                optionSelect = "defender";
                option = 0;
                break;
            case 2:
                optionSelect = "itens";
                option = 0;
                break;
            }
        }
    }
    if(keys.escape && optionSelect !== undefined) {
        option = 0;
        optionSelect = undefined;
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
    Variables.context.fillStyle = "#F03447";
    Variables.context.fillRect(21,210, 70*lifePercentage, 10);
    Variables.context.fillStyle = "#3DBAF6";
    Variables.context.fillRect(224,210, 70*mpPercentage, 10);
    Variables.context.fillStyle = "white";
    Variables.context.font = "12px Free Pixel";
    Variables.context.fillText(Variables.player.Name, 3, 164);
    Variables.context.fillText(`Level: ${Variables.player.Level}`, 130, 164);
    Variables.context.fillText("HP", 3, 217);
    Variables.context.fillText("MP", 205, 217);
    Variables.context.font = "6px Free Pixel";
    const enemyHp = `${enemySelect.life}/${enemySelect.maxLife}`;
    Variables.context.fillText(enemyHp, 200-Variables.context.measureText(enemyHp).width/2, 120);
    const hp = `${Variables.player.Life}/${Variables.player.MaxLife}`;
    Variables.context.fillText(hp, 56.129-Variables.context.measureText(hp).width/2, 217.5);
    const mp = `${Variables.player.Mp}/${Variables.player.MaxMp}`;
    Variables.context.fillText(mp, 259.129-Variables.context.measureText(mp).width/2, 217.5);
    Variables.context.fillStyle = "white";
    Variables.context.font = "20px Free Pixel";
    Variables.context.fillText(enemySelect.name, 200-Variables.context.measureText(enemySelect.name).width/2, 38);
    Variables.context.font = "12px Free Pixel";
    if(optionSelect == undefined) {
        Variables.context.fillText("Atacar", 50-Variables.context.measureText("Atacar").width/2, 194);
        Variables.context.fillText("Defender", 200-Variables.context.measureText("Defender").width/2, 194);
        Variables.context.fillText("Itens", 350-Variables.context.measureText("Itens").width/2, 194);
        Variables.context.fillStyle = "red";
        Variables.context.fillRect(10+150*option, 196, 75, 1);
    } else {
        if(optionSelect == "atacar") {
            Variables.context.fillText("Ataque normal", 100-Variables.context.measureText("Ataque normal").width/2, 194);
            Variables.context.fillText("Ataque mágico", 300-Variables.context.measureText("Ataque mágico").width/2, 194);
            if(option === 1) {
                Variables.context.fillStyle = "#3DBAF6";
                Variables.context.fillText("-4", 300, 218);
                Variables.context.fillStyle = "white";
            }
        }
        if(optionSelect == "defender") {
            console.log("defendeu");
        }
        if(optionSelect == "itens") {
            Variables.context.fillText("Poção de HP", 100-Variables.context.measureText("Poção de HP").width/2, 194);
            Variables.context.fillText("Poção de MP", 300-Variables.context.measureText("Poção de MP").width/2, 194);
            if(option === 0) {
                Variables.context.fillStyle = "#F03447";
                Variables.context.fillText("+10", 97, 218);
                Variables.context.fillStyle = "white";
            }
            if(option === 1) {
                Variables.context.fillStyle = "#3DBAF6";
                Variables.context.fillText("+10", 300, 218);
                Variables.context.fillStyle = "white";
            }
        }
        Variables.context.fillStyle = "red";
        Variables.context.fillRect(50+200*option, 196, 100, 1);
    }
}

function attack(attacker, target) {

}