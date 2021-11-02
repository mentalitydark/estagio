export default class Quest {
    constructor(name, type, dialogs, options, callback) {
        this._name = name;
        this._type = type;
        this._dialogs = dialogs;
        this._options = options;
        this._callback = callback;
        this._completed = false;
    }
    get name() { return this._name; }
    get type() { return this._type; }
    get dialogs() { return this._dialogs; }
    get options() { return this._options; }
    get callback() { return this._callback; }
    get completed() { return this._completed; }
    set completed(value) { this._completed = value; }
}