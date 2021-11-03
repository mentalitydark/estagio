export default class Quest {
    constructor(name, type, dialogs, options, callback, drop) {
        this._name = name;
        this._type = type;
        this._dialogs = dialogs;
        this._options = options;
        this._callback = callback;
        this._drop = drop;
        this._completed = false;
        this._success = false;
        this._score = 0;
        this._maxScore = this._dialogs.length;
    }
    get name() { return this._name; }
    get type() { return this._type; }
    get dialogs() { return this._dialogs; }
    get options() { return this._options; }
    get callback() { return this._callback; }
    get completed() { return this._completed; }
    get drop() { return this._drop; }
    get success() { return this._success; }
    get score() { return this._score; }
    get maxScore() { return this._maxScore; }
    set completed(value) { this._completed = value; }
    set success(value) { this._success = value; }
    set score(value) { this._score = value; }
}