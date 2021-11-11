export default class Block {
    constructor(x, y, endX, endY, to = "",collision = true, type = "block", teleport = null) {
        this._x = x;
        this._y = y;
        this._width = endX - x;
        this._height = endY - y;
        this._color = "#FA0101";
        this._visible = true;
        this._to = to;
        this._collision = collision;
        this._type = type;
        this._teleport = teleport;
    }
    // Get
    get x() { return this._x; }
    get y() { return this._y; }
    get width() { return this._width; }
    get height() { return this._height; }
    get color() { return this._color; }
    get visible() { return this._visible; }
    get to() { return this._to; }
    get collision() { return this._collision; }
    get type() { return this._type; }
    get teleport() { return this._teleport; }
    // Set
    set visible(bool) { this._visible = bool; }

    // Functions
    draw(context) {
        if(this._visible) {
            context.fillStyle = this._color;
            if(this._type === "door")
                context.fillStyle = "blue";
            if(this._width === 0)
                this._width = 1;
            if(this._height === 0)
                this._height = 1;
            context.fillRect(this._x, this._y, this._width, this._height);
        }
    }
    halfWidth() { return this._width/2; }
    halfHeight() { return this._height/2; }
    centerX() { return this._x + this.halfWidth(); }
    centerY() { return this._y + this.halfHeight(); }
}