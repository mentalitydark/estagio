export default class NPC {
    constructor(name, position, map, sprite, quest, dialogs, market = null) {
        this._name = name;
        this._position = {
            x: position.x,
            y: position.y
        };
        this._map = map;
        this._sprite = sprite;
        this._quest = quest;
        this._dialogs = dialogs;
        this._market = market;
        this._mask = {
            width: 16,
            height: 16
        };
        this._dialogMask = {
            width: 50,
            height: 50
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
        context.fillStyle = "blue";
        context.fillRect(this._position.x, this._position.y, this._mask.width, this._mask.height);
        context.fillStyle = "rgba(255,255,255,0.3)";
        context.fillRect(this.dialogCenterX()-this._dialogMask.width/2, this.dialogCenterY()-this._dialogMask.height/2, this._dialogMask.width, this._dialogMask.height);
    }
    halfWidth() {
        return this._mask.width/2;
    }
    halfHeight() {
        return this._mask.height/2;
    }
    centerX() {
        return this.Position.x + this.halfWidth();
    }
    centerY() {
        return this.Position.y + this.halfHeight();
    }
    dialogHalfWidth() {
        return this._dialogMask.width/2;
    }
    dialogHalfHeight() {
        return this._dialogMask.height/2;
    }
    dialogCenterX() {
        return this.Position.x + this.halfWidth();
    }
    dialogCenterY() {
        return this.Position.y + this.halfHeight();
    }
}