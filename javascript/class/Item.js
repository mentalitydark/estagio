export default class Item {
    constructor(id = null, name, type, quantity, sprite, attributes, price = null) {
        this._id = id;
        this._name = name;
        this._type = type;
        this._quantity = quantity;
        this._sprite = sprite;
        this._attributes = attributes;
        this._price = price;
        this._equipped = false;
    }

    get id() { return this._id; }
    get name() { return this._name; }
    get type() { return this._type; }
    get quantity() { return this._quantity; }
    get sprite() { return this._sprite; }
    get attributes() { return this._attributes; }
    get price() { return this._price; }
    get equipped() { return this._equipped; }

    set id(value) { this.id = value; }
    set name(value) { this.name = value; }
    set type(value) { this.type = value; }
    set quantity(value) { this.quantity = value; }
    set sprite(value) { this.sprite = value; }
    set attributes(value) { this.attributes = value; }
    set price(value) { this.price = value; }
    set equipped(value) { this.equipped = value; }

    add_quantity(quantity) { this._quantity += quantity; }
    remove_quantity(quantity) { this._quantity -= quantity; }
    save() {
        const item = {
            name: this._name,
            type: this._type,
            quantity: this._quantity,
            attributes: this._attributes,
            price: this._price,
            equipped: this._equipped
        };
        return item;
    }
    load(item) {
        this._name = item.name;
        this._type = item.type;
        this._quantity = item.quantity;
        this._attributes = item.attributes;
        this._price = item.price;
        this._equipped = item.equipped;
    }
}