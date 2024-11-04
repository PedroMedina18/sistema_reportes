import { pool } from "../db.js";
import message from "../utils/message.js";
import pattern from "../utils/pattern.js";
import Text from "../class/Text.js";
import Forenkey from "../class/Forenkey.js";
import ErrorRoute from "../class/ErrorRoute.js";
import { createToken } from "../utils/token.js";
import { verifyPassword } from "../utils/encrypt.js";
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

export async function login(req, res) {
    try {
        const { user_name, password } = req.body;
        const messageInvalid="Usuario o contraseña equivocado. Por favor Verifique";
        const validUserName = new Text({ text: user_name, minLenght: 5, maxLenght: 25, pattern: pattern.userName }).validar();
        const validPassword = new Text({ text: password, pattern: pattern.password }).validar();
        
        if (!validUserName.status) {
            if(validUserName.code===422){
                return res.status(validUserName.code).json({ message: "Sin Usuario", status: false });
            }else{
                return res.status(validUserName.code).json({ message: {messageInvalid}, status: false });
            };
        };

        if (!validPassword.status) {
            if(validPassword.code===422){
                return res.status(validPassword.code).json({ message: "Sin Contraseña", status: false });
            }else{
                return res.status(validPassword.code).json({ message: {messageInvalid}, status: false });
            };
        };

        const { rows, rowCount } = await pool.query(
            "SELECT id, administrator, state, password, user_name FROM users WHERE user_name=$1 AND state=true",
            [
                validUserName.result
            ]
        );

        if (rowCount === 0){
            return res.status(401).json({ message: `Usuario o contraseña equivocado. Por favor Verifique`, status: false });
        };
        const isPassword = await verifyPassword(password, rows[0].password);

        if (!isPassword){
            return res.status(401).json({ message: `Usuario o contraseña equivocado. Por favor Verifique`, status: false });
        };

        const newToken = createToken(rows[0]);

        return res.status(200).json({ 
            message: `Login completado`, 
            token:newToken, 
            user:rows[0].user_name, 
            status: true 
        });

    } catch (error) {
        const routeError = new ErrorRoute(error, table).typeError();
        return res.status(routeError.code).json({ error: routeError.message, status: false });
    };
};

export async function seccionActive(req, res) {

};