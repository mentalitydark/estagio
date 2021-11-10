import Object from "../../class/Object.js";

const weapon_salesman_house_position = {
    x: 1684, 
    y: 1085
};
const weapon_salesman_house_collision_mask = {
    width: 0,
    height: 0
};
const weapon_salesman_house_sprite = {
    file: "tileset_village",
    offset: {
        x: 0,
        y: 112
    },
    size: {
        width: 16*6,
        height: 16*6
    }
};
const weapon_salesman_house = new Object("Weapon Salesman House", "house", "main", weapon_salesman_house_sprite, weapon_salesman_house_position, weapon_salesman_house_collision_mask);

const potion_salesman_house_position = {
    x: 1728, 
    y: 1216
};
const potion_salesman_house_collision_mask = {
    width: 0,
    height: 0
};
const potion_salesman_house_sprite = {
    file: "tileset_village",
    offset: {
        x: 0,
        y: 0
    },
    size: {
        width: 16*6,
        height: 16*6
    }
};
const potion_salesman_house = new Object("Potion Salesman House", "house", "main", potion_salesman_house_sprite, potion_salesman_house_position, potion_salesman_house_collision_mask);

const closed_house_position = {
    x: 1872, 
    y: 1168
};
const closed_house_collision_mask = {
    width: 0,
    height: 0
};
const closed_house_sprite = {
    file: "tileset_village",
    offset: {
        x: 0,
        y: 224
    },
    size: {
        width: 16*7,
        height: 16*5
    }
};
const closed_house = new Object("Closed House", "house", "main", closed_house_sprite, closed_house_position, closed_house_collision_mask);
const closed_house_position_2 = {
    x: 1712, 
    y: 1376
};
const closed_house_collision_mask_2 = {
    width: 0,
    height: 0
};
const closed_house_sprite_2 = {
    file: "tileset_village",
    offset: {
        x: 96,
        y: 0
    },
    size: {
        width: 16*7,
        height: 16*5
    }
};
const closed_house_2 = new Object("Closed House 2", "house", "main", closed_house_sprite_2, closed_house_position_2, closed_house_collision_mask_2);

const master_house_position = {
    x: 1872, 
    y: 1328
};
const master_house_collision_mask = {
    width: 0,
    height: 0
};
const master_house_sprite = {
    file: "tileset_village",
    offset: {
        x: 96,
        y: 96
    },
    size: {
        width: 16*7,
        height: 16*5
    }
};
const master_house = new Object("Master House", "house", "main", master_house_sprite, master_house_position, master_house_collision_mask);

export const houses = [
    weapon_salesman_house,
    potion_salesman_house,
    closed_house,
    closed_house_2,
    master_house,
];