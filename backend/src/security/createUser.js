import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { verifyPassword } from "../utils/encrypt.js";
import { outputLine, outputLinePassword } from "../utils/outputLine.js";
import pattern from "../utils/pattern.js";
import readlineSync from "readline-sync";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


comprobarKey()


async function comprobarKey() {
    if (readlineSync.keyInYN('¿Deseas crear un nuevo super user?')) {
        const passwordEncry = await obtenerValorDeClave()
        if (!passwordEncry) return
        const password = await outputLinePassword("Clave secreta: ".green)
        if(await verifyPassword(password, passwordEncry)){
            console.log(true)
        }else{
            console.log(false)
        }
    } else {
        console.log('Operacion cancelada.'.red);
    };

}

async function obtenerValorDeClave() {
    const rutaArchivo = path.join(__dirname, "key.txt"); // Construir la ruta del archivo

    const clave = new Promise(resolve => {

        fs.readFile(rutaArchivo, 'utf-8', async (err, data) => {
            if (err) {
                console.log('Error al leer el archivo key.txt.'.red, err);
                resolve(null)
            }

            // Dividir el contenido en líneas y buscar la clave
            const lineas = data.split('\n');
            for (const linea of lineas) {
                const [key, value] = linea.split('=');
                if (key.trim() === "KEY") {

                    resolve(value.trim());
                    return
                }
            }
            console.log(`La clave KEY no se encontró en el archivo key.txt.`.red);
            resolve(null);
        });
    })

    return clave
}

