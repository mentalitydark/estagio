export default class Player {
    constructor(name) {
        this._name = name;
        this._mask = {
            width: 16,
            height: 16
        };
        this._position = {
            x: 0,
            y: 0
        };
        this._life = this._position.x;
        this._quests = [];
        this._sprites = [];
        this._speed = 1;
    }
    // Get
    get Name() {
        return this._name;
    }
    get Mask() {
        return this._mask;
    }
    get Position() {
        return this._position;
    }
    get Life() {
        return this._life;
    }
    get Quests() {
        return this._quests;
    }
    get Sprites() {
        return this._sprites;
    }
    get Speed() {
        return this._speed;
    }
    // Set
    set PositionX(x) {
        this._position.x = x;
    }
    set PositionY(y) {
        this._position.y = y;
    }

    // Functions
    moveX(x) {
        this._position.x += x * this._speed;
    }
    moveY(y) {
        this._position.y += y * this._speed;
    }
    draw(context) {
        context.fillRect(this._position.x, this._position.y, this._mask.width, this._mask.height);
    }
    sprint(press) {
        if (press) this._speed = 2; else this._speed = 1;
    }

}