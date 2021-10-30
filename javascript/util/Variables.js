import {mestre} from "./Persons/mestre.js";
import {vendedor_potions} from "./Persons/v_potions.js";
import {player} from "./Persons/player.js";
import {all_enemies, enemies_fixed} from "./Persons/enemy.js";

import {main} from "./worlds/main.js";
import {home_mestre} from "./worlds/home_mestre.js";
export let Variables = {
    "context": "",
    "gameState": 1,
    "START_MENU": 1,
    "PAUSED": 2,
    "PLAYING": 3,
    "GAME_OVER": 4,
    "LOADING": true,
    "Blocks": Array(),
    "NPCs": Array(),
    "keys": {
        "escape": false,
        "enter": false,
        "arrowup": false,
        "arrowdown": false,
        "arrowleft": false,
        "arrowright": false,
        "w": false,
        "a": false,
        "s": false,
        "d": false,
    },
    "keysUp": {},
    "dialog": false,
    "inventory": false,
    "player": player,
    "Worlds": {
        "select": "main",
        "main": main,
        "home_mestre": home_mestre
    },
    "message": {
        "bool": false,
        "text": ""
    },
    "all_enemies": all_enemies,
    "enemies_ready": enemies_fixed,
    "combat": false,
    "enemy_spawn": 0
};
export function change_variable(variable, value) {
    if(Array.isArray(variable))
        Variables[variable[0]][variable[1]] = value;
    else
        Variables[variable] = value;
}
Variables.NPCs.push(mestre);
Variables.NPCs.push(vendedor_potions);