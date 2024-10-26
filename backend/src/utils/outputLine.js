import readline from "readline"
import readlineSync from "readline-sync"
import * as colors from "colors";
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


export function outputLineNewPassword(message) {
    return new Promise(resolve => {
        const password = readlineSync.questionNewPassword(message, {
            hideEchoBack: true,
            min:8,
            max:30,
            charlist:"$<a-z> $<A-Z> $<0-9> $<.,_&%$#!+*->",
            encoding:"UTF-8",
            limitMessage: 'La clave no es valida. Debe tener entre 8 y 30 caracteres,\nse aceptan caracteres de <a-z>, <A-Z>, <0-9> y los siguientes signos (. , _ & % $ # ! + * -). Intenta de nuevo'.yellow,
            confirmMessage:"Confirmar clave".green,
            unmatchMessage:"Se diferencia de la primera. Presione solo la tecla Enter si desea volver a intentarlo desde el principio.".yellow
        });
        resolve(password);
    })
}

export function outputLinePassword(message) {
    return new Promise(resolve => {
        const password = readlineSync.question(message, {
            hideEchoBack: true,
        });
        resolve(password);
    })
}