
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
    // Infos
    Variables.context.fillRect(143, 62.5, 177, 100);
    Variables.context.fillStyle = "#000";
    Variables.context.font = "11px Free Pixel";
    if(npc.inventory[column + line*3] !== undefined) {
        const item = npc.inventory[column + line*3];
        Variables.context.fillText(`Nome: ${item.name}`, 143+5, 62.5+10);
        Variables.context.fillText(`Tipo: ${item.type}`, 143+5, 62.5+22);
        Variables.context.fillText(`Quantidade restante: ${item.quantity}`, 143+5, 62.5+34);
        Variables.context.fillText(`Preço: ${item.price} de ouro`, 143+5, 62.5+46);
        Variables.context.fillText("Atributos", 143+5, 62.5+58);
        Variables.context.fillText(`Tipo: ${item.attributes.type}`, 143+10, 62.5+70);
        Variables.context.fillText(`Valor: +${item.attributes.value}`, 143+10, 62.5+82);
        Variables.context.fillStyle = "yellow";
        Variables.context.font = "9px Free Pixel";
        Variables.context.fillText(`Seu ouro: ${Variables.player.gold}`, 143+2, 62.5+96);
    } else {
        Variables.context.fillText("Nenhum item selecionado", 143+177/2-Variables.context.measureText("Nenhum item selecionado").width/2, 62.5+100/2);
    }
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
            if(Variables.player.gold >= npc.inventory[column + line*3].price) {
                Variables.player.recover("gold", -npc.inventory[column + line*3].price);
                Variables.player.addItem(npc.inventory[column + line*3]);
                npc.removeItem(npc.inventory[column + line*3]);
            }
            // Variables.player.useItem(Variables.player.inventory[column + line*3]);
        }
    }
}
