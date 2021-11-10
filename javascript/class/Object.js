export default class Object {
    constructor(name, type, map, sprite, position, mask,drop = null, quest = null, text = null) {
        this._name = name;
        this._type = type;
        this._map = map;
        this._sprite = sprite;
        this._position = position;
        this._mask = mask;
        this._detect_mask = {
            width: mask.width + 10,
            height: mask.height + 10
        };
        this._drop = drop;
        this._quest = quest;
        this._text = text;
        this._collision = true;
        this._open = false;
    }
    draw(Variables) {
        if(this._type === "chest") {
            if(this.open) {
                Variables.context.fillStyle = "green";
                Variables.context.fillRect(this.position.x, this.position.y, this._mask.width, this._mask.height);
            } else {
                Variables.context.fillStyle = "blue";
                Variables.context.fillRect(this.position.x, this.position.y, this._mask.width, this._mask.height);
            }
        }
        if(this._type === "board") {
            Variables.context.drawImage(
                this._sprite.img,
                this._sprite.imgX,  this._sprite.imgY, this._mask.width, this._mask.height,
                this._position.x, this._position.y, this._mask.width, this._mask.height
            );
        }
        if(this._type === "house") {
            Variables.context.drawImage(
                Variables.images[this._sprite.file],
                this._sprite.offset.x,  this._sprite.offset.y, this._sprite.size.width, this._sprite.size.height,
                this._position.x, this._position.y, this._sprite.size.width, this._sprite.size.height
            );
        }
    }
    halfWidth() { return this._mask.width/2; }
    halfHeight() { return this._mask.height/2; }
    centerX() { return this._position.x + this.halfWidth(); }
    centerY() { return this._position.y + this.halfHeight(); }
    detectHalfWidth() { return this._detect_mask.width/2; }
    detectHalfHeight() { return this._detect_mask.height/2; }
    detectCenterX() { return this._position.x + this.halfWidth(); }
    detectCenterY() { return this._position.y + this.halfHeight(); }
    get name() { return this._name; }
    get type() { return this._type; }
    get map() { return this._map; }
    get sprites() { return this._sprites; }
    get position() { return this._position; }
    get mask() { return this._mask; }
    get drop() { return this._drop; }
    get quest() { return this._quest; }
    get text() { return this._text; }
    get collision() { return this._collision; }
    get open() { return this._open; }
    set open(value) { this._open = value; }
}