export default class Block {
    constructor(x, y, endX, endY) {
        this._x = x;
        this._y = y;
        this._width = endX - x;
        this._height = endY - y;
        this._color = "rgba(0,0,0,0.5)";
        this._visible = true;
    }
    // Get
    get x() { return this._x; }
    get y() { return this._y; }
    get width() { return this._width; }
    get height() { return this._height; }
    get color() { return this._color; }
    get visible() { return this._visible; }
    // Set
    set visible(bool) { this._visible = bool; }

    // Functions
    draw(context) {
        if(this._visible) {
            context.fillStyle = this._color;
            context.fillRect(this._x, this._y, this._width, this._height);
        }
    }
    halfWidth() { return this._width/2; }
    halfHeight() { return this._height/2; }
    centerX() { return this._x + this.halfWidth(); }
    centerY() { return this._y + this.halfHeight(); }
}