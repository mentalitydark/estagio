import {Variables} from "./../util/Variables.js";
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
    Variables.context.fillRect(337-135, 47, 16, 16);
    Variables.context.fillRect(316-135, 47, 16, 16);
    Variables.context.fillRect(295-135, 47, 16, 16);
    Variables.context.fillRect(337-135, 68, 16, 16);
    Variables.context.fillRect(316-135, 68, 16, 16);
    Variables.context.fillRect(295-135, 68, 16, 16);
    Variables.context.fillRect(337-135, 89, 16, 16);
    Variables.context.fillRect(316-135, 89, 16, 16);
    Variables.context.fillRect(295-135, 89, 16, 16);
    Variables.context.fillRect(337-135, 110, 16, 16);
    Variables.context.fillRect(316-135, 110, 16, 16);
    Variables.context.fillRect(295-135, 110, 16, 16);
    Variables.context.fillRect(337-135, 131, 16, 16);
    Variables.context.fillRect(316-135, 131, 16, 16);
    Variables.context.fillRect(295-135, 131, 16, 16);
}
export function InventoryEvents() {
    
}