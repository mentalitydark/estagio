import {Variables, changeVariable} from "./../util/Variables.js";
import {addToLoad} from "./LoadAssets.js";
let enemyIndex;
let enemySelect;
let optionSelect;
let potionHpPosition;
let potionMpPosition;
let enemyTurn = false;
let defending = false;
let animation = false;
let underAttack = false;
let i = 0;
let j = 0;
let option = 0;
const spriteAttack = new Image();
spriteAttack.src = "./img/sprites/combat/attack.png";
addToLoad(spriteAttack);

export function CombatDetect(player, enemy, index) {
    const catX = player.centerX() - enemy.combatCenterX();
    const catY = player.centerY() - enemy.combatCenterY();
    const sumHalfWidth = player.halfWidth() + enemy.combatHalfWidth();
    const sumHalfHeight = player.halfHeight() + enemy.combatHalfHeight();
    if(Math.abs(catX) < sumHalfWidth && Math.abs(catY) < sumHalfHeight) {
        enemySelect = enemy;
        enemyIndex = index;
        return true;
    }
}

export function CombatRender() {
    const lifePercentage = Variables.player.life*100/Variables.player.maxLife/100;
    const mpPercentage = Variables.player.mp*100/Variables.player.maxMp/100;
    const enemyHp = `${enemySelect.life.toFixed(0)}/${enemySelect.maxLife}`;
    const enemyHpPercentage = enemySelect.life*100/enemySelect.maxLife/100;
    // Enemy.draw()
    Variables.context.fillStyle = "#161616";
    Variables.context.fillRect(0,0, 400, 225);
    Variables.context.fillStyle = "#fff";
    Variables.context.fillRect(200-16, 60, 32, 32);
    if(animation) attackAnimation();
    Variables.context.fillStyle = "#383838";
    Variables.context.fillRect(0,151, 400, 74);
    Variables.context.fillStyle = "black";
    Variables.context.fillRect(21,210, 70, 10);
    Variables.context.fillRect(224,210, 70, 10);
    Variables.context.fillRect(165,112.5, 70, 10);
    Variables.context.fillStyle = "#F03447";
    Variables.context.fillRect(21,210, 70*lifePercentage, 10);
    Variables.context.fillRect(165,112.5, 70*enemyHpPercentage, 10);
    Variables.context.fillStyle = "#3DBAF6";
    Variables.context.fillRect(224,210, 70*mpPercentage, 10);
    Variables.context.fillStyle = "white";
    Variables.context.font = "12px Free Pixel";
    Variables.context.fillText(Variables.player.name, 3, 164);
    Variables.context.fillText(`Level: ${Variables.player.level}`, 130, 164);
    Variables.context.fillText("HP", 3, 217);
    Variables.context.fillText("MP", 205, 217);
    Variables.context.font = "6px Free Pixel";
    Variables.context.fillText(enemyHp, 200-Variables.context.measureText(enemyHp).width/2, 120);
    const hp = `${Variables.player.life.toFixed(0)}/${Variables.player.maxLife}`;
    Variables.context.fillText(hp, 56.129-Variables.context.measureText(hp).width/2, 217.5);
    const mp = `${Variables.player.mp}/${Variables.player.maxMp}`;
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
        if(optionSelect == "itens") {
            Variables.context.fillText("Poção de HP", 100-Variables.context.measureText("Poção de HP").width/2, 194);
            Variables.context.fillText("Poção de MP", 300-Variables.context.measureText("Poção de MP").width/2, 194);
            potionHpPosition = Variables.player.inventory.findIndex(i => i.name === "Poção de HP");
            potionMpPosition = Variables.player.inventory.findIndex(i => i.name === "Poção de MP");
            if(potionHpPosition >= 0) Variables.context.fillText(`x${Variables.player.inventory[potionHpPosition].quantity}`, 100+Variables.context.measureText("Poção de HP").width/2+20, 194);
            else Variables.context.fillText("x0", 100+Variables.context.measureText("Poção de HP").width/2+20, 194);
            if(potionMpPosition >= 0) Variables.context.fillText(`x${Variables.player.inventory[potionMpPosition].quantity}`, 300+Variables.context.measureText("Poção de MP").width/2+20, 194);
            else Variables.context.fillText("x0", 300+Variables.context.measureText("Poção de MP").width/2+20, 194);
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
    if(underAttack) {
        Variables.context.fillStyle = "rgba(240, 84, 75, 0.1)";
        Variables.context.fillRect(0, 0, 400, 225);
        j++;
        if(j >= 5) {
            underAttack = false;
            j = 0;
        }
    }
}
export function Combat(keys) {
    if(!enemyTurn) {
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
                    defending = true;
                    enemyTurn = true;
                    Variables.player.recover("mp", 2);
                    break;
                case 2:
                    optionSelect = "itens";
                    option = 0;
                    break;
                }
            }
        }
        if(optionSelect === "atacar") {
            if(keys.enter) {
                keys.enter = false;
                if(option === 0) {
                    attack(Variables.player, enemySelect);
                    animation = true;
                    enemyTurn = true;
                    Variables.player.recover("mp", 1);
                }
                if(option === 1) {
                    if(Variables.player.mp >= 4) {
                        powerAttack(Variables.player, enemySelect);
                        Variables.player.recover("mp", -4);
                        animation = true;
                        enemyTurn = true;
                    }
                }
            }
        }
        if(optionSelect === "itens") {
            if(keys.enter) {
                keys.enter = false;
                if(option === 0)
                    Variables.player.useItem(Variables.player.inventory[potionHpPosition]);
                if(option === 1)
                    Variables.player.useItem(Variables.player.inventory[potionMpPosition]);
            }
        }
        if(keys.escape && optionSelect !== undefined) {
            option = 0;
            optionSelect = undefined;
        }
    } else {
        if(i === 0 || defending) {
            underAttack = true;
            const chooseAttack = Math.random() * (1 - 0) + 0;
            if(chooseAttack <= 0.7) {
                attack(enemySelect, Variables.player);
            } else {
                powerAttack(enemySelect, Variables.player);
            }
            defending = false;
            enemyTurn = false;
            option = 0;
            optionSelect = undefined;
            animation = false;
        }
    }
    isDead(Variables.player, enemySelect);
}
function isDead(player, enemy) {
    if(player.life <= 0) {
        changeVariable("gameState", Variables.GAME_OVER);
        defending = false;
        enemyTurn = false;
        option = 0;
        optionSelect = undefined;
        animation = false;
    }
    if(enemy.life <= 0) {
        changeVariable("combat", false);
        Variables.AllEnemies.splice(enemyIndex,1);
        let message = "";
        enemySelect.drop.forEach(drop => {
            if(drop.type === "xp"){
                if(Variables.player.addXP(drop.value)) {
                    message += `Você upou para o nível ${Variables.player.level}.\n`;
                } else {
                    message += `Você ganhou ${drop.value} de XP.\n`;
                }
            }
            else {
                Variables.player.recover(drop.type, drop.value);
                message += `Você ganhou ${drop.value} de ouro.\n`;
            }
            changeVariable(["message", "bool"], true);
            changeVariable(["message", "text"], message);
        });
        defending = false;
        enemyTurn = false;
        option = 0;
        optionSelect = undefined;
        animation = false;
    }
}
function attackAnimation() {
    Variables.context.drawImage(
        spriteAttack,
        i*16, 0, 16, 16,
        200-8, 60+8, 16, 16
    );
    i++;
    if(i >= 20) {
        i = 0;
        animation = false;
    }
}
function attack(attacker, target) {
    let damage = 0;
    if(defending)
        damage = Math.round(attacker.damage*((100-Math.log(target.defense*2)/Math.log(1.1))/100)*100)/100;
    else
        damage = Math.round(attacker.damage*((100-Math.log(target.defense)/Math.log(1.1))/100)*100)/100;
    target.recover("life", -damage.toFixed(2));
}
function powerAttack(attacker, target) {
    let damage = 0;
    if(defending)
        damage = Math.round(attacker.damage*2*((100-Math.log(target.defense*2)/Math.log(1.1))/100)*100)/100;
    else
        damage = Math.round(attacker.damage*2*((100-Math.log(target.defense)/Math.log(1.1))/100)*100)/100;
    target.recover("life", -damage.toFixed(2));
}