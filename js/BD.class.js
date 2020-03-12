class BD {
    atualizar(){
        let request = indexedDB.open("Cidade", 2);
        let db;

        request.onupgradeneeded = function (event) {
            console.log("Atualizando...");
            db = event.target.result;
            let objectStore = db.createObjectStore("Cidade", {
                keyPath: "IBGE"
            });
        };

    }
    enviarDados(dados){
        let request = indexedDB.open("Cidade", 2);
        let db;
        request.onsuccess = function(event) {
            console.log("BD aberto com sucesso");
            db = event.target.result;
            let transaction = db.transaction(["Cidade"], "readwrite");
            let objectStore = transaction.objectStore(["Cidade"]);
            objectStore.put({nome: dados.nome,
                estado: dados.estado,
                IBGE: dados.ibge,
                populacao: dados.populacao,
                obs: dados.obs
            });
        };
        this.consultarTodos();
    }
    consultarTodos() {
        document.querySelector('tbody').innerHTML = '';
        let open = window.indexedDB.open("Cidade", 2);
        const tbody = document.querySelector('tbody');
        open.onsuccess = function(event_open) {
            let db = event_open.target.result;
            let cidades = [];
            let transaction = db.transaction("Cidade", "readwrite");
            let objectStore = transaction.objectStore("Cidade");
            let request = objectStore.openCursor();
            request.onsuccess = function(event_request) {
                let cursor = event_request.target.result;
                if(cursor) {
                    cidades.push(cursor.value);
                    cursor.continue();
                } else {
                    for(let i = 0; i < cidades.length; i++) {
                        let temperatura;
                        const tr = document.createElement('tr');
                        const td = document.createElement('td');
                        const td2 = document.createElement('td');
                        const td3 = document.createElement('td');
                        const td4 = document.createElement('td');
                        const td5 = document.createElement('td');
                        const td6 = document.createElement('td');
                        const btn = document.createElement('button');
                        const btn2 = document.createElement('button');
                        td.innerText = cidades[i].nome;
                        td2.innerText = cidades[i].estado;
                        td3.innerText = cidades[i].IBGE;
                        td4.innerText = cidades[i].populacao;
                        td5.innerText = cidades[i].obs;
                        btn.innerText = "Editar";
                        btn.className = `edit ${cidades[i].IBGE}`;
                        btn2.innerText = "Excluir";
                        btn2.className = `delet ${cidades[i].IBGE}`;
                        td6.className = 'temp';
                        let promise = tempo(cidades[i].nome, cidades[i].estado);
                        promise.then((get) => {if(get !== undefined) {td6.innerText = `${get}`}else {td6.innerText="Não há previsão de tempo"}});
                        tr.append(td);
                        tr.append(td2);
                        tr.append(td3);
                        tr.append(td4);
                        tr.append(td5);
                        tr.append(btn);
                        tr.append(btn2);
                        tr.append(td6);
                        tbody.append(tr);
                    };
                }
            }
        }
    }
    consultarUm(codigo) {
        let open = window.indexedDB.open("Cidade", 2);
        open.onsuccess = function(event_open) {
            let db = event_open.target.result;
            let transaction = db.transaction("Cidade", "readwrite");
            let objectStore = transaction.objectStore("Cidade");
            let request = objectStore.get(codigo);
            request.onsuccess = function(event_request) {
                let cidade = request.result;
                document.querySelector('.modal').style.display = 'block'
                document.querySelector('#nome').value = cidade.nome;
                document.querySelector('#estado').value = cidade.estado;
                document.querySelector('#ibge').value = cidade.IBGE;
                document.querySelector('#populacao').value = cidade.populacao;
                document.querySelector('#observacao').value = cidade.obs;
            }
        }
    }
    deletar(codigo) {
        let open = window.indexedDB.open("Cidade", 2);
        open.onsuccess = function(event_open) {
            let db = event_open.target.result;
            let transaction = db.transaction("Cidade", "readwrite");
            let objectStore = transaction.objectStore("Cidade");
            let request = objectStore.delete(codigo);
        }
    }
}