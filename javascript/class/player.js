export default class Player {
    constructor(name, sprite) {
        this._name = name;
        this._mask = {
            width: 14,
            height: 18
        };
        this.position = {
            x: 1838,
            y: 1349
        };
        this._life = 10;
        this._quests = [];
        this._sprites = [];
        this._speed = 1;
        this._level = 0;
        this.sprites = {
            img: sprite,
            src: sprite.src,
            imgX: 0,
            imgY: 0,
            width: sprite.width,
            height: sprite.height,
            frameAnimation: 0
        };
        this._xp = 0;
        this._xpLvl = {
            "1": 100,
            "2": 125,
            "3": 175,
            "4": 250,
            "5": 350,
            "6": 475,
            "7": 625,
            "8": 800,
            "9": 1000,
            "10": 1225
        };
    }
    // Get
    get Name() {
        return this._name;
    }
    get Mask() {
        return this._mask;
    }
    get Position() {
        return this.position;
    }
    get Life() {
        return this._life;
    }
    get Quests() {
        return this._quests;
    }
    get Sprites() {
        return this._sprites;
    }
    get Speed() {
        return this._speed;
    }
    get Level() {
        return this._level;
    }

    // Functions
    teleport(position) {
        this.position.x = position.x;
        this.position.y = position.y;
    }
    addXP(xp) {
        xp += this._xp;
        while(xp > 0) {
            if(xp >= this._xpLvl[this._level+1]) {
                xp -= this._xpLvl[this._level+1];
                this.levelUp(1);
                if(xp === 0) 
                    this._xp = xp;
            } else {
                this._xp = xp;
                xp = 0;
            }
        }
    }
    checkLevel(lvl) {
        if(this._level >= lvl) return "true";
        else return "false";
    }
    levelUp(lvl) {
        this._level+= lvl;
    }
    moveX(x) {
        this.position.x += x * this._speed;
    }
    moveY(y) {
        this.position.y += y * this._speed;
    }
    draw(context) {
        context.drawImage(
            this.sprites.img,
            this.sprites.imgX,  this.sprites.imgY, this._mask.width, this._mask.height,
            this.position.x, this.position.y, this._mask.width, this._mask.height
        );
    }
    sprint(press) {
        if (press) this._speed = 2; else this._speed = 1;
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
    saveLoader(save) {
        this.position.x = save.player.x;
        this.position.y = save.player.y;
    }
}