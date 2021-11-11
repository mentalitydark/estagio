export default class World {
    constructor(name, width, height, sprite, teleport = null) {
        this._name = name;
        this._width = width;
        this._height = height;
        this._sprite = sprite;
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
    draw(Variables) { 
        Variables.context.drawImage(Variables.images[this._sprite.file], 0, 0); 
    }
    add_blocks(array) {
        array.forEach((block) => {
            this._blocks.push(block);
        });
    }
}