export default class World {
    constructor(name, width, height, img, teleport = null) {
        this._name = name;
        this._width = width;
        this._height = height;
        this._img = img;
        this._teleport = teleport;
        this._blocks = [];
    }
    get name() { return this._name; }
    get width() { return this._width; }
    get height() { return this._height; }
    get img() { return this.img; }
    get teleport() { return this._teleport; }
    get blocks() { return this._blocks; }
    
    set teleport(teleport) { this._teleport = teleport; }
    draw(context) { context.drawImage(this._img, 0, 0); }
    addBlocks(array) {
        array.forEach((block) => {
            this._blocks.push(block);
        });
    }
}