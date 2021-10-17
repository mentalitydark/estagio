export default class NPC {
    constructor(name, position, map, sprite, quest, dialogs, market = null) {
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
        this._market = market;
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
    get Name() { return this._name; }
    get Position() { return this._position; }
    get Map() { return this._map; }
    get Sprite() { return this._sprite; }
    get Quest() { return this._quest; }
    get Dialogs() { return this._dialogs; }
    get Market() { return this._market; }
    get Mask() { return this._mask; }
    get collision() { return this._collision; }

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