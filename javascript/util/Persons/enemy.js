import Enemy from "./../../class/Enemy.js";
// import {addToLoad} from "./../../function/LoadAssets.js";

const enemy_1 = new Enemy("Teste de inimigo 1", "main", {x: 1900, y: 1400}, "", 10, 1, 2, "", [{type: "xp", value:200},{type: "gold", value:200}]);
const enemy_2 = new Enemy("Teste de inimigo 2", "main", {x: 1700, y: 1400}, "", 10, 1, 2, "", [{type: "xp", value:125},{type: "gold", value:20}]);
const enemy_3 = new Enemy("Teste de inimigo 3", "main", {x: 1700, y: 1300}, "", 100, 10, 60, "", [{type: "xp", value:50},{type: "gold", value:10}]);

export const AllEnemies = [
    enemy_1,
    enemy_2,
    enemy_3,
];

