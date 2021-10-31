export default class NPC {
    constructor(name, position, map, sprite, quest, dialogs, inventory = null) {
        this._name = name;
        this._position = {
            x: position.x,
            y: position.y
        };
        this._map = map;
        this._sprite = {
            img: sprite,
            src: sprite.src,
            imgX: 129,
            imgY: 216,
            width: sprite.width,
            height: sprite.height,
        };
        this._quest = quest;
        this._dialogs = dialogs;
        this._inventory = inventory;
        this._mask = {
            width: 14,
            height: 17
        };
        this._dialogMask = {
            width: 40,
            height: 40
        };
        this._collision = true;
    }
    get name() { return this._name; }
    get position() { return this._position; }
    get map() { return this._map; }
    get sprite() { return this._sprite; }
    get quest() { return this._quest; }
    get dialogs() { return this._dialogs; }
    get inventory() { return this._inventory; }
    get mask() { return this._mask; }
    get collision() { return this._collision; }

    removeItem(item) {
        const position = this._inventory.findIndex(i => i.name === item.name);
        if(position != -1){
            this._inventory[position].removeQuantity(1);
            if(this._inventory[position].quantity <= 0)
                this._inventory.splice(position, 1);
        }
    }
    draw(context) {
        context.drawImage(
            this._sprite.img,
            this._sprite.imgX,  this._sprite.imgY, this._mask.width, this._mask.height,
            this._position.x, this._position.y, this._mask.width, this._mask.height
        );
    }
    halfWidth() { return this._mask.width/2; }
    halfHeight() { return this._mask.height/2; }
    centerX() { return this._position.x + this.halfWidth(); }
    centerY() { return this._position.y + this.halfHeight(); }
    dialogHalfWidth() { return this._dialogMask.width/2; }
    dialogHalfHeight() { return this._dialogMask.height/2; }
    dialogCenterX() { return this._position.x + this.halfWidth(); }
    dialogCenterY() { return this._position.y + this.halfHeight(); }
}