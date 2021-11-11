export default class NPC {
    constructor(name, position, map, sprite, quest, dialogs, dialog_hitbox , inventory = null) {
        this._name = name;
        this._position = {
            x: position.x,
            y: position.y
        };
        this._map = map;
        this._sprite = sprite;
        this._quest = quest;
        this._dialogs = dialogs;
        this._inventory = inventory;
        this._mask = {
            width: 16,
            height: 20
        };
        this._dialogMask = dialog_hitbox;
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
    set sprite(value) { this._sprite = value; }

    reset_inventory() {
        this._inventory = [];
    }
    add_item(item) {
        const position = this._inventory.findIndex(i => i.name === item.name);
        if(position != -1)
            this._inventory[position].add_quantity(1);
        else
            this._inventory.push(item);
    }
    remove_item(item) {
        const position = this._inventory.findIndex(i => i.name === item.name);
        if(position != -1){
            this._inventory[position].remove_quantity(1);
            if(this._inventory[position].quantity <= 0)
                this._inventory.splice(position, 1);
        }
    }
    draw(Variables) {
        Variables.context.drawImage(
            Variables.images[this._sprite.file],
            this._sprite.offset.x + this._sprite.size.width * this._sprite.frame,  this._sprite.offset.y, this._sprite.size.width, this._sprite.size.height,
            this._position.x, this._position.y, this._sprite.size.width, this._sprite.size.height
        );
    }
    halfWidth() { return this._mask.width/2; }
    halfHeight() { return this._mask.height/2; }
    centerX() { return this._position.x + this.halfWidth(); }
    centerY() { return 12+this._position.y + this.halfHeight(); }
    dialogHalfWidth() { return this._dialogMask.width/2; }
    dialogHalfHeight() { return this._dialogMask.height/2; }
    dialogCenterX() { return this._position.x + this.halfWidth(); }
    dialogCenterY() { return this._position.y + this.halfHeight(); }
}