import {addToLoad} from "./../function/LoadAssets.js";

const player = new Image();
player.src = "./img/sprites/Player.png";
addToLoad(player);

const itens = new Image();
itens.src = "./img/sprites/char.png";
addToLoad(itens);

const master = new Image();
master.src = "./img/sprites/master.png";
addToLoad(master);

const potion_salesman = new Image();
potion_salesman.src = "./img/sprites/potion_salesman.png";
addToLoad(potion_salesman);

const weapon_salesman = new Image();
weapon_salesman.src = "./img/sprites/weapon_salesman.png";
addToLoad(weapon_salesman);

const enemies = new Image();
enemies.src = "./img/sprites/char.png";
addToLoad(enemies);

const map_main = new Image();
map_main.src = "./img/world/map.png";
addToLoad(map_main);

const map_master = new Image();
map_master.src = "./img/world/map_master.png";
addToLoad(map_master);

const map_salesman = new Image();
map_salesman.src = "./img/world/map_salesman.png";
addToLoad(map_salesman);


const map_boss = new Image();
map_boss.src = "./img/sprites/char.png";
addToLoad(map_boss);

const tileset_village = new Image();
tileset_village.src = "./img/Tileset/Village.png";
addToLoad(tileset_village);

export const images = {
    player,
    itens,
    master,
    potion_salesman,
    weapon_salesman,
    enemies,
    map_main,
    map_master,
    map_salesman,
    map_boss,
    tileset_village,
};