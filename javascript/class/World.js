export default class World {
    constructor(name, width, height, img) {
        this._name = name;
        this._width = width;
        this._height = height;
        this._img = img;
        this._blocks = [];
    }
    get width() { return this._width; }
    get height() { return this._height; }
    get img() { return this.img; }
    get blocks() { return this._blocks; }
    draw(context) {
        context.drawImage(this._img, 0, 0);
    }
    addBlocks(array) {
        array.forEach((block) => {
            this._blocks.push(block);
        });
    }
}