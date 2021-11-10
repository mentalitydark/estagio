import Item from "./../class/Item.js";

// Initial items
const player = [
    new Item(0, "Túnica de Aprendiz", "Túnica", 1, "", {type: "defense", value: 5}),
    new Item(1, "Cajado de Aprendiz", "Cajado", 1, "", {type: "damage", value: 5}),
    new Item(2, "Poção de HP", "Poção", 5, "", {type: "hp", value: 10}),
    new Item(3, "Poção de MP", "Poção", 5, "", {type: "mp", value: 10})
];

const weapon_salesman = [
    new Item(4, "Cajado do vazio", "Cajado", 1, "", {type: "damage", value: 25}, 50),
    new Item(5, "Cajado do Lich", "Cajado", 1, "", {type: "damage", value: 46}, 75),
    new Item(6, "Túnica de fogo", "Túnica", 1, "", {type: "defense", value: 30}, 75),
    new Item(7, "Túnica de Proteção mágica", "Túnica", 1, "", {type: "defense", value: 50}, 100),
];

const potions_salesman = [
    new Item(8, "Poção de HP", "Poção", 10, "", {type: "hp", value: 10}, 25),
    new Item(9, "Poção de MP", "Poção", 10, "", {type: "mp", value: 20}, 25),
];

// Drops
const potions_salesman_quest_drop = [
    new Item(10, "Poção de HP", "Poção", 10, "", {type: "hp", value: 10}, 20),
    new Item(11, "Poção de MP", "Poção", 10, "", {type: "mp", value: 20}, 20),
    new Item(12, "Poção grande de HP", "Poção", 20, "", {type: "hp", value: 20}, 30),
    new Item(13, "Poção grande de MP", "Poção", 20, "", {type: "mp", value: 20}, 30),
];

const weapon_salesman_quest = [
    new Item(14, "Urânio", "quest", 1, "", {type: "", value: 0}),
    new Item(15, "Hidrogênio", "quest", 1, "", {type: "", value: 0}),
    new Item(16, "Ouro", "quest", 1, "", {type: "", value: 0}),
];

const medicine_quest = [
    new Item(17, "Flor Vermelha", "quest", 1, "", {type: "", value: 0}),
];

export const itens = [
    ...player,
    ...weapon_salesman,
    ...potions_salesman,
    ...potions_salesman_quest_drop,
    ...weapon_salesman_quest,
    ...medicine_quest
];