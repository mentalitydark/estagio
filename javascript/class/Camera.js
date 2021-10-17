export default class Camera {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this._width = width;
        this._height = height;
    }
    get width() { return this._width; }
    get height() { return this._height; }
    topBorder() { return this.y + this._height*0.5; }
    rightBorder() { return this.x + this._width*0.5; }
    bottomBorder() { return this.y + this._height*0.5; }
    leftBorder() { return this.x + this._width*0.5; }
}