export class Enemy {
    constructor(name, map, position, route, life, damage, defense, sprite, mask, drop) {
        this._name = name;
        this._map = map;
        this._position = position;
        this._route = route;
        this._life = life;
        this._damage = damage;
        this._defense = defense;
        this._sprite = {
            img: sprite
        };
        this._mask = mask;
        this._drop = drop;
    }
    get name() { return this._name; }
    get map() { return this._map; }
    get position() { return this._position; }
    get route() { return this.route; }
    get life() { return this._life; }
    get damage() { return this._damage; }
    get defense() { return this._defense; }
    get sprite() { return this._sprite; }
    get mask() { return this._mask; }
    get drop() { return this._drop; }
}