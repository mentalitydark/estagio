export default class Enemy {
    constructor(name, map, position, route, hp, damage, defense, sprite, drop, visible = false) {
        this._name = name;
        this._map = map;
        this._position = position;
        this._route = route;
        this._hp = hp;
        this._maxHp = this._hp;
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
        this._visible = visible;
        this._speed = 1;
        this._collision = true;
        this._alive = true;
    }
    get name() { return this._name; }
    get map() { return this._map; }
    get position() { return this._position; }
    get route() { return this.route; }
    get hp() { return this._hp; }
    get maxHp() { return this._maxHp; }
    get damage() { return this._damage; }
    get defense() { return this._defense; }
    get sprite() { return this._sprite; }
    get mask() { return this._mask; }
    get drop() { return this._drop; }
    get visible() { return this._visible; }
    get collision() { return this._collision; }
    set position(position) { this._position = position; }

    recover(type, value) {
        const max = `max${type[0].toUpperCase()+type.slice(1)}`;
        this[`_${type}`] += value;
        if(this[`_${type}`] > this[`_${max}`])
            this[`_${type}`] = this[`_${max}`];
        if(this[`_${type}`] < 0)
            this[`_${type}`] = 0;
    }
    draw(Variables) {
        if(this._alive) {
            Variables.context.fillStyle = "red";
            Variables.context.fillRect(this._position.x, this._position.y, this._mask.width, this._mask.height);
            Variables.context.fillStyle = "rgba(255,255,255,0.3)";
            Variables.context.fillRect(this.combatCenterX()-this._combatMask.width/2, this.combatCenterY()-this._combatMask.height/2, this._combatMask.width, this._combatMask.height);
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