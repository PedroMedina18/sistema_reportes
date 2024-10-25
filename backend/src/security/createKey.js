import fs from "fs";
import path from "path";
import { encryptPassword } from "../utils/encrypt.js";
import { outputLine, outputLinePassword } from "../utils/outputLine.js";
import pattern from "../utils/pattern.js";
import readlineSync from "readline-sync";
import * as colors from "colors";

// Define la clave y el valor
const clave = 'KEY';
let key

if (readlineSync.keyInYN('¿Deseas cambiar la clave de seguridad?')) {

    // do {
    //     key = await neddPassword()
    // } while (!key);
    neddPassword()
    // const linea = `${clave}: ${valor}\n`;
    // console.log(linea)

} else {
    console.log('Operación cancelada.'.red);
}

async function neddPassword() {
    const password = await outputLinePassword("Nueva clave: ");
    console.log(password)
    // const passwordEncry = await encryptPassword(password);
    // return passwordEncry
}

// // Crea la línea de clave-valor
// const linea = `${clave}: ${valor}\n`;

// // Define la ruta donde se guardará el archivo
// const rutaArchivo = path.join(__dirname, 'datos', 'archivo.txt');

// // Escribe la línea en el archivo .txt
// fs.writeFile(rutaArchivo, linea, (err) => {
//     if (err) {
//         console.error('Error al crear el archivo:', err);
//     } else {
//         console.log('Archivo creado exitosamente en:', rutaArchivo);
//     }
// });