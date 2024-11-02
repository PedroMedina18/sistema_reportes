import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { encryptPassword } from "../utils/encrypt.js";
import { outputLine, outputLineNewPassword } from "../utils/outputLine.js";
import pattern from "../utils/pattern.js";
import readlineSync from "readline-sync";
import * as colors from "colors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let linea
process.on('SIGINT', () => {
    console.log('Deteniendo el programa...');
    process.exit(0); // Salir del programa con un código de estado 0 (sin errores)
});



async function crearKey() {
    if (readlineSync.keyInYN('¿Deseas cambiar la clave de seguridad?')) {
        const password = await neddPassword();
        if (!password) return;
        linea = `KEY=${password}\n`;
        guardarKey();
    } else {
        console.log('Operacion cancelada.'.red);
    };
};

async function neddPassword() {
    try {
        const password = await outputLineNewPassword("Nueva clave: ".green);
        console.log("Espere...".green)
        const passwordEncry = await encryptPassword(password);
        return passwordEncry;
    } catch {
        console.log("error vuelva a intentar".red)
        return null;
    }
};

function guardarKey() {
    // Define la ruta donde se guardará el archivo
    const rutaArchivo = path.join(__dirname, 'key.txt');

    // Escribe la línea en el archivo .txt
    fs.writeFile(rutaArchivo, linea, (err) => {
        if (err) {
            console.error(`Error al crear el archivo: ${err}`.red);
        } else {
            console.log('clave creada exitosamente'.green);
        }
    });
};



crearKey().then(result => {
    console.log("result");
}).catch(err => {
    console.error(err);
});