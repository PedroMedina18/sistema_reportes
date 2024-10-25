import readline from "readline"
import readlineSync from "readline-sync"
// Crear una interfaz para leer datos de la consol a

export function outputLine(message) {
    return new Promise(resolve => {

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        // Pedir al usuario que ingrese su fecha de nacimiento
        rl.question(message, (response) => {
            rl.close();
            resolve(response);
        });
    })
}


export function outputLinePassword(message) {
    return new Promise(resolve => {
        const password = readlineSync.questionNewPassword(message, {
            hideEchoBack: true,
            min:8,
            max:30,
            limit: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[.,_&%$#!+*-])[A-Za-z\d.,_&%$#!+*-]$/,
            encoding:"UT",
            limitMessage: 'La clave no es válida. Debe tener entre 8 y 30 caracteres, incluir al menos una letra mayúscula, una minúscula, un número y alguno de los siguientes signos (. , _ & % $ # ! + * -). Intenta de nuevo',
            confirmMessage:"Confirmar clave",
            unmatchMessage:"Se diferencia de la primera. Presione solo la tecla Enter si desea volver a intentarlo desde el principio."
        });
        resolve(password);
    })
}