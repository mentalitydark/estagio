import {Variables} from "./../util/Variables.js";
let line = 0;
let column = 0;
export function InventoryRender() {
    Variables.context.fillStyle = "#383838";
    Variables.context.fillRect(29.5, 39.4, 340.9-135, 120);
    
    // Player Name
    Variables.context.fillStyle = "#adadad";
    Variables.context.fillRect(40.5, 44.6, 89.2, 11.2);
    Variables.context.fillRect(40.5, 73, 89.2, 80);
    Variables.context.fillRect(152.2, 44.6, 210-135, 109);
    Variables.context.font = "11pt Free Pixel";
    Variables.context.fillStyle = "#000";
    Variables.context.fillText(`${Variables.player.Name}`, 42.3, 53.8, 84);
    Variables.context.fillText(`Vida: ${Variables.player.Life}`, 42.3, 90, 84);
    Variables.context.fillText(`Mana: ${Variables.player.Mp}`, 42.3, 100, 84);
    Variables.context.fillText(`Ouro: ${Variables.player.Gold}`, 42.3, 110, 84);
    Variables.context.fillText(`Dano: ${Variables.player.Damage}`, 42.3, 130, 84);
    Variables.context.fillText(`Defesa: ${Variables.player.Defense}`, 42.3, 140, 84);
    Variables.context.fillText(`Level:  ${Variables.player.Level}`, 42.3, 150, 84);
    Variables.context.fillStyle = "#999";
    for(let l = 0; l < 5; l++) {
        for(let c = 0; c < 3; c++) {
            if(Variables.player.Inventory[c + l*3] !== undefined) {
                Variables.context.fillStyle = "blue";
                if(Variables.player.ArmorEquipped !== undefined)
                    if(Variables.player.Inventory[c + l*3].name === Variables.player.ArmorEquipped.name)
                        Variables.context.fillStyle = "red";
                if(Variables.player.WeaponEquipped !== undefined)
                    if(Variables.player.Inventory[c + l*3].name === Variables.player.WeaponEquipped.name)
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
export function InventoryEvents(keys) {
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
    if(Variables.player.Inventory[column + line*3] !== undefined) {
        if(keys.enter) {
            keys.enter = false;
            Variables.player.useItem(Variables.player.Inventory[column + line*3]);
        }
        console.log(Variables.player.Inventory[column + line*3]);
    }
}