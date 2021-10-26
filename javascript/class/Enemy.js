export default class Enemy {
    constructor(name, map, position, route, life, damage, defense, sprite, drop) {
        this._name = name;
        this._map = map;
        this._position = position;
        this._route = route;
        this._life = life;
        this._maxLife = this._life;
        this._damage = damage;
        this._defense = defense;
        this._sprite = {
            img: sprite
        };
        this._mask = {
            width: 16,
            height: 16
        };
        this._combatMask = {
            width: 26,
            height: 26
        };
        this._drop = drop;
        this._speed = 1;
        this._collision = true;
        this._alive = true;
    }
    get name() { return this._name; }
    get map() { return this._map; }
    get position() { return this._position; }
    get route() { return this.route; }
    get life() { return this._life; }
    get maxLife() { return this._maxLife; }
    get damage() { return this._damage; }
    get defense() { return this._defense; }
    get sprite() { return this._sprite; }
    get mask() { return this._mask; }
    get drop() { return this._drop; }
    get collision() { return this._collision; }

    draw(context) {
        if(this._alive) {
            context.fillStyle = "red";
            context.fillRect(this._position.x, this._position.y, this._mask.width, this._mask.height);
            context.fillStyle = "rgba(255,255,255,0.3)";
            context.fillRect(this.combatCenterX()-this._combatMask.width/2, this.combatCenterY()-this._combatMask.height/2, this._combatMask.width, this._combatMask.height);
        }
    }
    halfWidth() {
        return this._mask.width/2;
    }
    halfHeight() {
        return this._mask.height/2;
    }
    centerX() {
        return this.position.x + this.halfWidth();
    }
    centerY() {
        return this.position.y + this.halfHeight();
    }
    combatHalfWidth() {
        return this._combatMask.width/2;
    }
    combatHalfHeight() {
        return this._combatMask.height/2;
    }
    combatCenterX() {
        return this.position.x + this.halfWidth();
    }
    combatCenterY() {
        return this.position.y + this.halfHeight();
    }
    dead() {
        this._alive = false;
        this._collision = false;
    }
}