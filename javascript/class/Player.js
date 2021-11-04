export default class Player {
    constructor(name, sprite) {
        this._name = name;
        this._mask = {
            width: 14,
            height: 18
        };
        this.position = {
            x: 55.5,
            y: 57
        };
        this._hp = 5;
        this._maxHp = 10;
        this._mp = 10;
        this._maxMp = 10;
        this._gold = 1000;
        this._damage = 1;
        this._defense = 5;
        this._quests = [];
        this._inventory_quests = [];
        this._sprites = [];
        this._speed = 1;
        this._sprites = {
            img: sprite,
            src: sprite.src,
            imgX: 0,
            imgY: 0,
            width: sprite.width,
            height: sprite.height,
            frameAnimation: 0
        };
        this._oldLevel;
        this._level = 0;
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
        this._inventory = [];
        this._armorEquipped;
        this._weaponEquipped;
    }
    // Get
    get name() { return this._name; }
    get mask() { return this._mask; }
    get hp() { return this._hp; }
    get maxHp() { return this._maxHp; }
    get mp() { return this._mp; }
    get maxMp() { return this._maxMp; }
    get gold() { return this._gold; }
    get damage() { return this._damage; }
    get defense() { return this._defense; }
    get quests() { return this._quests; }
    get inventory_quests() { return this._inventory_quests; }
    get sprites() { return this._sprites; }
    get speed() { return this._speed; }
    get level() { return this._level; }
    get inventory() { return this._inventory; }
    get armorEquipped() { return this._armorEquipped; }
    get weaponEquipped() { return this._weaponEquipped; }
    set hp(hp) { this._hp = hp; }

    // Functions
    add_quest(new_quest) {
        const position = this._quests.findIndex(quest => quest === new_quest);
        if(position === -1)
            this._quests.push(new_quest);
    }
    recover(type, value) {
        if(type === "hp" || type === "mp") {
            const max = `max${type[0].toUpperCase()+type.slice(1)}`;
            this[`_${type}`] += value;
            if(this[`_${type}`] > this[`_${max}`])
                this[`_${type}`] = this[`_${max}`];
            if(this[`_${type}`] < 0)
                this[`_${type}`] = 0;
        } else {
            switch(type) {
            case "gold":
                this._gold += value;
                break;
            }
        }
    }
    teleport(position) {
        this.position.x = position.x;
        this.position.y = position.y;
    }
    add_XP(xp) {
        this._oldLevel = this._level;
        xp += this._xp;
        while(xp > 0) {
            if(xp >= this._xpLvl[this._level+1]) {
                xp -= this._xpLvl[this._level+1];
                this.level_up(1);
                if(xp === 0) 
                    this._xp = xp;
            } else {
                this._xp = xp;
                xp = 0;
            }
        }
        if(this._oldLevel !== this._level) {
            return true;
        }
    }
    check_level(lvl) { if(this._level >= lvl) return "true"; else return "false"; }
    level_up(lvl) { 
        this._level+= lvl;
        this._hp = 10 + this._level*5;
        this._maxHp = this._hp;
        this._mp = 10 + this._level*2;
        this._maxMp = this._mp;
        if(this._armorEquipped != undefined)
            this._defense = 10 + Math.floor(this._level*1.5) + this._armorEquipped.attributes.value;
        else
            this._defense = 10 + Math.floor(this._level*1.5);
        if(this._weaponEquipped != undefined)
            this._damage = 1 + this._level*3 + this._weaponEquipped.attributes.value;
        else
            this._damage = 1 + this._level*3;
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
    use_item(item) {
        if(item.type.toLowerCase() === "poção") {
            const type = item.attributes.type;
            const max = `max${type[0].toUpperCase()+type.slice(1)}`;
            this[`_${type}`] += item.attributes.value;
            if(this[`_${type}`] > this[`_${max}`])
                this[`_${type}`] = this[`_${max}`];
            this.remove_item(item);
        }
        if(item.type.toLowerCase() === "cajado" || item.type.toLowerCase() === "túnica") {
            if(this._weaponEquipped != undefined) {
                if(item.type.toLowerCase() === "cajado") {
                    if(item.name === this._weaponEquipped.name) {
                        this._damage -= this._weaponEquipped.attributes.value;
                        this._weaponEquipped = undefined;
                    } else {
                        this._damage -= this._weaponEquipped.attributes.value;
                        this._damage += item.attributes.value;
                        this._weaponEquipped = item;
                    }
                }
            } else {
                if(item.type.toLowerCase() === "cajado") {
                    this._damage += item.attributes.value;
                    this._weaponEquipped = item;
                }
            }
            if(this._armorEquipped != undefined) {
                if(item.type.toLowerCase() === "túnica") {
                    if(item.name === this._armorEquipped.name) {
                        this._defense -= this._armorEquipped.attributes.value;
                        this._armorEquipped = undefined;
                    } else {
                        this._defense -= this._armorEquipped.attributes.value;
                        this._defense += item.attributes.value;
                        this._armorEquipped = item;
                    }
                }
            } else {
                if(item.type.toLowerCase() === "túnica") {
                    this._defense += item.attributes.value;
                    this._armorEquipped = item;
                }
            }
        }
    }
    moveX(x) { this.position.x += x * this._speed; }
    moveY(y) { this.position.y += y * this._speed; }
    draw(context) {
        context.drawImage(
            this.sprites.img,
            this.sprites.imgX,  this.sprites.imgY, this._mask.width, this._mask.height,
            this.position.x, this.position.y, this._mask.width, this._mask.height
        );
    }
    sprint(press) { if (press) this._speed = 2; else this._speed = 1; }
    halfWidth() { return this._mask.width/2; }
    halfHeight() { return this._mask.height/2; }
    centerX() { return this.position.x + this.halfWidth(); }
    centerY() { return this.position.y + this.halfHeight(); }
    saveLoader(save) {
        this.position.x = save.player.x;
        this.position.y = save.player.y;
    }
}