import {addToLoad} from "./../function/LoadAssets.js";

const player = new Image();
player.src = "./img/sprites/Player.png";
addToLoad(player);

const itens = new Image();
itens.src = "./img/sprites/char.png";
addToLoad(itens);

const npc = new Image();
npc.src = "./img/sprites/char.png";
addToLoad(npc);

const enemies = new Image();
enemies.src = "./img/sprites/char.png";
addToLoad(enemies);

const map_main = new Image();
map_main.src = "./img/sprites/char.png";
addToLoad(map_main);

const map_master = new Image();
map_master.src = "./img/sprites/char.png";
addToLoad(map_master);

const map_potions = new Image();
map_potions.src = "./img/sprites/char.png";
addToLoad(map_potions);

const map_weapons = new Image();
map_weapons.src = "./img/sprites/char.png";
addToLoad(map_weapons);

const map_boss = new Image();
map_boss.src = "./img/sprites/char.png";
addToLoad(map_boss);

const tileset_village = new Image();
tileset_village.src = "./img/Tileset/Village.png";
addToLoad(tileset_village);

export const images = {
    player,
    itens,
    npc,
    enemies,
    map_main,
    map_master,
    map_potions,
    map_weapons,
    map_boss,
    tileset_village,
};