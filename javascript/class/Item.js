export default class Item {
    constructor(name, type, quantity, sprite, attributes, price = null) {
        this._name = name;
        this._type = type;
        this._quantity = quantity;
        this._sprite = sprite;
        this._attributes = attributes;
        this._price = price;
        this._equipped = false;
    }

    get name() { return this._name; }
    get type() { return this._type; }
    get quantity() { return this._quantity; }
    get sprite() { return this._sprite; }
    get attributes() { return this._attributes; }
    get price() { return this._price; }
    get equipped() { return this._equipped; }

    add_quantity(quantity) { this._quantity += quantity; }
    remove_quantity(quantity) { this._quantity -= quantity; }
}