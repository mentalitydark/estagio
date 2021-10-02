const con = window.indexedDB.open("Game", 3);
let database;
con.onsuccess = (event) => {
    database = event.target.result;
    console.log("Sucesso ao criar o banco!" + database);
};
con.onerror = (event) => {
    console.log("Erro ao criar o banco!" + event.target.errorCode);
};
con.onupgradeneeded  = (event) => {
    database = event.target.result;
    database.createObjectStore("Save", {
        keyPath: "id",
        autoIncrement: true
    });
};
export function save(player) {
    const transaction = database.transaction("Save", "readwrite");
    const objectStore = transaction.objectStore("Save");
    const save = {
        id: 1,
        player: {
            x: player.Position.x,
            y: player.Position.y
        }
    };
    const request = objectStore.put(save);
    request.onsuccess = () => {
        console.log("Salvado com sucesso.");
    };
    request.onerror = () => {
        console.log("Erro ao salvar");
    };
}
export function load(player) {
    let saveDB;
    const transaction = database.transaction("Save");
    const objectStore = transaction.objectStore("Save");
    const request = objectStore.openCursor();
    request.onsuccess = (event) => {
        let cursor = event.target.result;
        if(cursor) {
            saveDB = cursor.value;
            console.log("Cursor atual => " + saveDB);
            player.saveLoader(saveDB);
        } else {
            console.log("Não há saves.");
            save(player);
        }
    };
}
