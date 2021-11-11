import Object from "../../class/Object.js";

const barrel_position = {
    x: 1808, 
    y: 1443
};
const barrel_collision_mask = {
    width: 0,
    height: 0
};
const barrel_sprite = {
    file: "tileset_village",
    offset: {
        x: 51,
        y: 335
    },
    size: {
        width: 10,
        height: 13
    }
};
const barrel = new Object("Barrel", "decoration", "main", barrel_sprite, barrel_position, barrel_collision_mask, false);

const well_position = {
    x: 1872, 
    y: 1264
};
const well_collision_mask = {
    width: 0,
    height: 0
};
const well_sprite = {
    file: "tileset_village",
    offset: {
        x: 64,
        y: 320
    },
    size: {
        width: 16*2,
        height: 16*2.6
    }
};
const well = new Object("Well", "decoration", "main", well_sprite, well_position, well_collision_mask, false);

const flower_vase_position = {
    x: 16, 
    y: 66
};
const flower_vase_collision_mask = {
    width: 0,
    height: 0
};
const flower_vase_sprite = {
    file: "tileset_village",
    offset: {
        x: 96,
        y: 336
    },
    size: {
        width: 16,
        height: 16
    }
};
const flower_vase = new Object("Flower Vase", "decoration", "home_master", flower_vase_sprite, flower_vase_position, flower_vase_collision_mask, false);

export const decorations = [
    barrel,
    well,
    flower_vase,
];