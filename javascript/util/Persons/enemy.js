import Enemy from "./../../class/Enemy.js";
// import {addToLoad} from "./../../function/LoadAssets.js";

const enemy_1 = new Enemy("Teste de inimigo 1", "main", {}, "", 10, 1, 2, "", [{type: "xp", value:200},{type: "gold", value:200}]);
const enemy_2 = new Enemy("Teste de inimigo 2", "main", {}, "", 10, 1, 2, "", [{type: "xp", value:125},{type: "gold", value:20}]);
const enemy_3 = new Enemy("Teste de inimigo 3", "main", {}, "", 100, 10, 60, "", [{type: "xp", value:50},{type: "gold", value:10}]);
const enemy_4 = new Enemy("Teste de inimigo 4", "main", {}, "", 100, 10, 60, "", [{type: "xp", value:50},{type: "gold", value:10}]);
const enemy_5 = new Enemy("Teste Fixo", "main", {x: 1750, y: 1450}, "", 100, 10, 60, "", [{type: "xp", value:50},{type: "gold", value:10}]);

export const all_enemies = [
    enemy_1,
    enemy_2,
    enemy_3,
    enemy_4,
];
export const enemies_fixed = [
    enemy_5,
];
