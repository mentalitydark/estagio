const url = "https://servicodados.ibge.gov.br/api/v1/localidades/municipios";
let teste = [];
fetch(url)
    .then((res) => res.json())
    .then((json) =>cidade_nome(json))


const cidade_nome = function(dado) {
    for(let i = 0; i < dado.length; i++) {
        teste.push([dado[i].nome, dado[i].microrregiao.mesorregiao.UF.sigla, dado[i].id]);
    }
    list(teste)
}
const list = function(teste) {
    const datalist = document.querySelector('datalist');
    for(let i = 0; i < teste.length; i++) {
        const option = document.createElement('option');
        option.value = teste[i][2];
        option.innerText = `${teste[i][0]} - ${teste[i][1]}`
        datalist.append(option);
    }
}

ibge.addEventListener('change', function() {
    fetch(url+`/${ibge.value}`)
    .then((res) => res.json())
    .then((json) =>{ 
        estado.value = json.microrregiao.mesorregiao.UF.sigla;
        nome.value = json.nome;
    })

})