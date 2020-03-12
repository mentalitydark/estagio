const submit = document.querySelector(".submit");
const nome = document.querySelector('#nome');
const estado = document.querySelector('#estado');
const ibge = document.querySelector('#ibge');
const populacao = document.querySelector('#populacao');
const observacao = document.querySelector('#observacao');
const listar = document.querySelector('.listar');
const btnTbody = document.querySelector('tbody');

window.addEventListener('load', function() {
    const bd = new BD();
    bd.atualizar();
    bd.consultarTodos();
    timeout();
})

listar.addEventListener('click', function() {
    const bd = new BD();
    bd.atualizar();
    bd.consultarTodos();
    
});

submit.addEventListener('click', function() {
    const bd = new BD();
    const cidade = new Cidade(nome.value, estado.value, ibge.value, populacao.value, observacao.value);
    bd.atualizar();
    bd.enviarDados(cidade);
    nome.value='';
    estado.value='';
    ibge.value='';
    populacao.value='';
    observacao.value='';
});

btnTbody.addEventListener('click', function(event) {
    if(event.target.classList[0] === "edit") {
        const bd = new BD();
        const ibge = event.target.classList[1];
        bd.consultarUm(ibge);
    }
});
btnTbody.addEventListener('click', function(event) {
    if(event.target.classList[0] === "delet") {
        const bd = new BD();
        const ibge = event.target.classList[1];
        bd.deletar(ibge);
        bd.consultarTodos();
    }
});

function timeout() {
    setTimeout(function() {
        const bd = new BD();
        bd.consultarTodos();
        timeout();
    }, 600000)
}