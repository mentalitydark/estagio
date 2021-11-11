import {change_variable} from "./../util/Variables.js";
const con = window.indexedDB.open("Game", 3);
let database;
con.onsuccess = (event) => {
    database = event.target.result;
};
con.onupgradeneeded  = (event) => {
    database = event.target.result;
    database.createObjectStore("Save", {
        keyPath: "id",
        autoIncrement: true
    });
};
export function save(Variables) {
    const transaction = database.transaction("Save", "readwrite");
    const objectStore = transaction.objectStore("Save");
    const save = {
        id: 1,
        Variables: {
            selected_world: Variables.selected_world,
            player: Variables.player.save()
        }
    };
    const request = objectStore.put(save);
    request.onsuccess = () => {
        change_variable(["message","text"], "Jogo salvo.");
    };
    request.onerror = () => {
        change_variable(["message","text"], "Erro para salver.");
    };
}
export function load(Variables) {
    let saveDB;
    const transaction = database.transaction("Save");
    const objectStore = transaction.objectStore("Save");
    const request = objectStore.openCursor();
    request.onsuccess = (event) => {
        let cursor = event.target.result;
        if(cursor) {
            saveDB = cursor.value;
            Variables.player.load(saveDB.Variables.player);
            Variables.selected_world = saveDB.Variables.selected_world;
        } else {
            save(Variables);
        }
    };
}
