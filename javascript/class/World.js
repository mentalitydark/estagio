export default class World {
    constructor(width, height, img) {
        this._width = width;
        this._height = height;
        this._img = img;
    }
    get width() { return this._width; }
    get height() { return this._height; }
    get img() { return this.img; }
}