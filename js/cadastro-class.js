class Cidade {
    constructor(nome, estado, ibge, populacao, obs) {
        this._nome = nome;
        this._estado = estado;
        this._ibge = ibge;
        this._populacao = populacao;
        this._obs = obs;
    }
    get nome() {
        return this._nome;
    }
    get estado() {
        return this._estado;
    }
    get ibge() {
        return this._ibge;
    }
    get populacao() {
        return this._populacao;
    }
    get obs() {
        return this._obs;
    }
    toString(){
        return `Nome: ${this._nome}; Estado: ${this._estado}; IBGE: ${this._ibge}; População: ${this._populacao}; Obs: ${this._obs}`
    }
}