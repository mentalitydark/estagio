
import {Variables} from "./../util/Variables.js";
let line = 0;
let column = 0;

export function store_render(npc) {
    Variables.context.fillStyle = "#383838";
    Variables.context.fillRect(200-250/2, 225/2-110/2, 250, 110);
    Variables.context.font = "11pt Free Pixel";
    Variables.context.fillStyle = "#999";
    for(let l = 0; l < 5; l++) {
        for(let c = 0; c < 3; c++) {
            if(npc.inventory[c + l*3] !== undefined) {
                Variables.context.fillStyle = "blue";
            }
            else
                Variables.context.fillStyle = "#999";
            Variables.context.fillRect(80 + 21*c, 62.5 + 21*l, 16, 16);
        }
    }
    // Select
    Variables.context.strokeStyle = "red";
    Variables.context.lineWidth = 1;
    Variables.context.strokeRect(80 + 21*column, 62.5 + 21*line, 16, 16);
}
export function store_update(keys, npc) {
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
    if(npc.inventory[column + line*3] !== undefined) {
        if(keys.enter) {
            keys.enter = false;
            console.log(npc.inventory[column + line*3]);
            // Variables.player.useItem(Variables.player.inventory[column + line*3]);
        }
    }
}
