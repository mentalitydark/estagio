import {Variables} from "./../util/Variables.js";
let line = 0;
let column = 0;
export function inventory_render() {
    Variables.context.fillStyle = "#383838";
    Variables.context.fillRect(29.5, 39.4, 340.9-135, 120);
    Variables.context.fillStyle = "#adadad";
    Variables.context.fillRect(40.5, 44.6, 89.2, 11.2);
    Variables.context.fillRect(40.5, 73, 89.2, 80);
    Variables.context.fillRect(152.2, 44.6, 210-135, 109);
    Variables.context.font = "11pt Free Pixel";
    Variables.context.fillStyle = "#000";
    Variables.context.fillText(`${Variables.player.name}`, 42.3, 53.8, 84);
    Variables.context.fillText(`Vida: ${Variables.player.hp.toFixed(0)}`, 42.3, 90, 84);
    Variables.context.fillText(`Mana: ${Variables.player.mp}`, 42.3, 100, 84);
    Variables.context.fillText(`Ouro: ${Variables.player.gold}`, 42.3, 110, 84);
    Variables.context.fillText(`Dano: ${Variables.player.damage}`, 42.3, 130, 84);
    Variables.context.fillText(`Defesa: ${Variables.player.defense}`, 42.3, 140, 84);
    Variables.context.fillText(`Level:  ${Variables.player.level}`, 42.3, 150, 84);
    Variables.context.fillStyle = "#999";
    for(let l = 0; l < 5; l++) {
        for(let c = 0; c < 3; c++) {
            if(Variables.player.inventory[c + l*3] !== undefined) {
                Variables.context.fillStyle = "blue";
                if(Variables.player.armorEquipped !== undefined)
                    if(Variables.player.inventory[c + l*3].name === Variables.player.armorEquipped.name)
                        Variables.context.fillStyle = "red";
                if(Variables.player.weaponEquipped !== undefined)
                    if(Variables.player.inventory[c + l*3].name === Variables.player.weaponEquipped.name)
                        Variables.context.fillStyle = "purple";
            }
            else
                Variables.context.fillStyle = "#999";
            Variables.context.fillRect(160 + 21*c, 47 + 21*l, 16, 16);
        }
    }
    // Select
    Variables.context.strokeStyle = "red";
    Variables.context.lineWidth = 1;
    Variables.context.strokeRect(160 + 21*column, 47 + 21*line, 16, 16);
}
export function inventory_update(keys) {
    if(keys.arrowup || keys.w) {
        keys.arrowup = keys.w = false;
        line--;
        if(line < 0)
            line = 4;
    }
    if(keys.arrowright || keys.d) {
        keys.arrowright = keys.d = false;
        column++;
        if(column > 2)
            column = 0;
    }
    if(keys.arrowdown || keys.s) {
        keys.arrowdown = keys.s = false;
        line++;
        if(line > 4)
            line = 0;
    }
    if(keys.arrowleft || keys.a) {
        keys.arrowleft = keys.a = false;
        column--;
        if(column < 0)
            column = 2;
    }
    if(Variables.player.inventory[column + line*3] !== undefined) {
        if(keys.enter) {
            keys.enter = false;
            Variables.player.use_item(Variables.player.inventory[column + line*3]);
        }
    }
}