export default class NPC {
    constructor(name, position, map, sprite, quest, dialogs, market = null) {
        this._name = name;
        this.position = {
            x: position.x,
            y: position.y
        };
        this._map = map;
        this.sprites = {
            img: sprite,
            src: sprite.src,
            imgX: 0,
            imgY: 0,
            width: sprite.width,
            height: sprite.height,
            frameAnimation: 0
        };
        this._quest = quest;
        this._dialogs = dialogs;
        this._market = market;
        this._mask = {
            width: 14,
            height: 18
        };
        this._dialogMask = {
            width: 40,
            height: 40
        };
    }
    get Name() { return this._name; }
    get Position() { return this._position; }
    get Map() { return this._map; }
    get Sprite() { return this._sprite; }
    get Quest() { return this._quest; }
    get Dialogs() { return this._dialogs; }
    get Market() { return this._market; }
    get Mask() { return this._mask; }

    draw(context) {
        context.drawImage(
            this.sprites.img,
            this.sprites.imgX,  this.sprites.imgY, this._mask.width, this._mask.height,
            this.position.x, this.position.y, this._mask.width, this._mask.height
        );
    }
    halfWidth() {
        return this._mask.width/2;
    }
    halfHeight() {
        return this._mask.height/2;
    }
    centerX() {
        return this.position.x + this.halfWidth();
    }
    centerY() {
        return this.position.y + this.halfHeight();
    }
    dialogHalfWidth() {
        return this._dialogMask.width/2;
    }
    dialogHalfHeight() {
        return this._dialogMask.height/2;
    }
    dialogCenterX() {
        return this.position.x + this.halfWidth();
    }
    dialogCenterY() {
        return this.position.y + this.halfHeight();
    }
}