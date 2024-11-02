import fs from "fs";
import path from "path";
import { pool } from "../db.js";
import { fileURLToPath } from 'url';
import { verifyPassword, encryptPassword } from "../utils/encrypt.js";
import { outputLine, outputLinePassword, outputLineNewPassword } from "../utils/outputLine.js";
import pattern from "../utils/pattern.js";
import ErrorRoute from "../class/ErrorRoute.js";
import readlineSync from "readline-sync";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const table = {
    table: "Usuario",
    id: "ID",
    names: "Nombres",
    last_names: "Apellidos",
    user_name: "Nombre de Usuario",
    password: "Contraseña",
    administrator: "Administrador",
    department: "Departamento",
    email: "Correo Electronico",
    subsidiary: "Subcursal",
    state: "Estado"
};
comprobarKey()


async function comprobarKey() {
    if (readlineSync.keyInYN('¿Deseas crear un nuevo super user?')) {
        const passwordEncry = await obtenerValorDeClave()
        if (!passwordEncry) return
        const password = await outputLinePassword("Clave secreta: ".green)
        if (await verifyPassword(password, passwordEncry)) {
            createUser()
        } else {
            console.log('¿Clave incorrecta. Operacion cancelada?')
        }
    } else {
        console.log('Operacion cancelada.'.red);
    };
}

async function createUser() {
    let user = null
    let password = null

    try {
        do {
            const newUser = await outputLine("Nombre de Usuario: ".green)

            if (!pattern.userName.test(newUser)) {
                console.log("Usuario invalido, se espera minimo 5 digitos y sin signos solo se permiten digitos alfanumericos".red)
                continue
            }
            const { rowCount } = await pool.query(
                "SELECT id FROM users WHERE user_name=$1",
                [
                    newUser
                ]
            );
            if (rowCount !== 0) {
                console.log("Usuario repetido, ingrese otro".red)
                continue
            };
            user = newUser
        } while (!user);


        const email = await pool.query(`SELECT id FROM email ORDER BY id LIMIT 1;`);
        const department = await pool.query(`SELECT id FROM department ORDER BY id LIMIT 1;`);

        password = await outputLineNewPassword("Contraseña: ".green);
        console.log("Espere...".green)
        const passwordEncry = await encryptPassword(password);
        const reponse = await pool.query(
            "INSERT INTO users (names, last_names, user_name, password, administrator, department_id, email_id, subsidiary) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [
                "Usuario",
                "Administrador",
                user,
                passwordEncry,
                true,
                department.rows[0].id,
                email.rows[0].id,
                true
            ]
        );
        console.log("Super usuario creador".green)
    } catch (error){
        const routeError = new ErrorRoute(error, table).typeError();
        console.log(routeError.message.red)
    }


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

