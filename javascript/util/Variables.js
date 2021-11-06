import {board} from "./Objects/board.js";
import {children_1} from "./Persons/children_1.js";
import {all_enemies, enemies_fixed} from "./Persons/enemy.js";
import {explorer} from "./Persons/explorer.js";
import {master} from "./Persons/master.js";
import {medicine_quest} from "./Persons/medicine_quest.js";
import {player} from "./Persons/player.js";
import {potions_salesman} from "./Persons/potions_salesman.js";
import {weapon_salesman} from "./Persons/weapon_salesman.js";
import {main} from "./worlds/main.js";
import {home_master} from "./worlds/home_master.js";
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
    "selected_world": "home_master",
    "Worlds": {
        "main": main,
        "home_master": home_master
    },
    "message": {
        "bool": false,
        "text": ""
    },
    "all_enemies": all_enemies,
    "enemies_ready": enemies_fixed,
    "combat": false,
    "enemy_spawn": 0,
    "objects": [],
    "object_interaction": false
};
export function change_variable(variable, value) {
    if(Array.isArray(variable))
        Variables[variable[0]][variable[1]] = value;
    else
        Variables[variable] = value;
}

Variables.objects.push(board);

Variables.NPCs.push(children_1);
Variables.NPCs.push(explorer);
Variables.NPCs.push(master);
Variables.NPCs.push(medicine_quest);
Variables.NPCs.push(potions_salesman);
Variables.NPCs.push(weapon_salesman);