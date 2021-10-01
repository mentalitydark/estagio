const connection = window.indexedDB.open("Game", 3);
let database;
connection.onsuccess = (event) => {
    database = event.target.result;
};
connection.onupgradeneeded = (event) => {
    database = event.target.result;
    database.createObjectStore("Save", {
        keyPath: "id",
        autoIncrement: true
    });
};
export function save(player) {
    const transactionUpdate = database.transaction("Save", "readwrite");
    const objectStore = transactionUpdate.objectStore("Save");
    const infos = {
        id: 1,
        player: {
            x: player.Position.x,
            y: player.Position.y
        }
    };
    const request = objectStore.put(infos);
    request.onsuccess = () => {
        return "Salvado.";
    };
    request.onerror = () => {
        return "Erro ao salvar.";
    };
}
export function load() {
    const transactionUpdate = database.transaction("Save", "readwrite");
    const objectStore = transactionUpdate.objectStore("Save");
    const request = objectStore.get(1);
    return request;
}
export async function exists() {
    let db = await window.indexedDB.open("Game", 3);
    let transaction = db.transaction("Save");
    // const oS = transaction.objectStore("Save");
    // const a = await oS.getAll();
}