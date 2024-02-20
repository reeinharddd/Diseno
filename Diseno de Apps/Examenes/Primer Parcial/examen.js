const readline = require('readline');

let todosList;
const url = "http://jsonplaceholder.typicode.com/todos";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function obtenerTodos(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            todosList = data;
            return data;
        });
}

function mostrarMenu() {
    console.log("Seleccione una opción:");
    console.log("1-. Lista de todos los pendientes (solo IDs)");
    console.log("2-. Lista de todos los pendientes (IDs y Titles)");
    console.log("3-. Lista de todos los pendientes sin resolver (ID y Title)");
    console.log("4-. Lista de todos los pendientes resueltos (ID y Title)");
    console.log("5-. Lista de todos los pendientes (IDs y userID)");
    console.log("6-. Lista de todos los pendientes resueltos (ID y userID)");
    console.log("7-. Lista de todos los pendientes sin resolver (ID y userID)");

    rl.question("Ingrese el número de la opción que desea ver: ", (opcion) => {
        switch (opcion) {
            case "1":
                console.log("Lista de todos los pendientes (solo IDs):");
                for (let i = 0; i < todosList.length; i++) {
                    console.log(todosList[i].id);
                }
                break;
            case "2":
                console.log("Lista de todos los pendientes (IDs y Titles):");
                for (let i = 0; i < todosList.length; i++) {
                    console.log("ID: " + todosList[i].id + " Title: " + todosList[i].title);
                }
                break;
            case "3":
                console.log("Lista de todos los pendientes sin resolver (ID y Title):");
                for (let i = 0; i < todosList.length; i++) {
                    if (!todosList[i].completed) {
                        console.log("ID: " + todosList[i].id + " Title: " + todosList[i].title);
                    }
                }
                break;
            case "4":
                console.log("Lista de todos los pendientes resueltos (ID y Title):");
                for (let i = 0; i < todosList.length; i++) {
                    if (todosList[i].completed) {
                        console.log("ID: " + todosList[i].id + " Title: " + todosList[i].title);
                    }
                }
                break;
            case "5":
                console.log("Lista de todos los pendientes (IDs y userID):");
                for (let i = 0; i < todosList.length; i++) {
                    console.log("ID: " + todosList[i].id + " UserID: " + todosList[i].userId);
                }
                break;
            case "6":
                console.log("Lista de todos los pendientes resueltos (ID y userID):");
                for (let i = 0; i < todosList.length; i++) {
                    if (todosList[i].completed) {
                        console.log("ID: " + todosList[i].id + " UserID: " + todosList[i].userId);
                    }
                }
                break;
            case "7":
                console.log("Lista de todos los pendientes sin resolver (ID y userID):");
                for (let i = 0; i < todosList.length; i++) {
                    if (!todosList[i].completed) {
                        console.log("ID: " + todosList[i].id + " UserID: " + todosList[i].userId);
                    }
                }
                break;
            default:
                console.log("Opción no válida");
                break;
        }

        rl.close();
    });
}

obtenerTodos(url)
    .then(response => {
        mostrarMenu();
    })
    .catch(error => console.error('Error:', error));