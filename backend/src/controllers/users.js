import pattern from "../utils/pattern.js";
import Text from "../class/Text.js";
import Forenkey from "../class/Forenkey.js";
import Booleano from "../class/Booleano.js";
import {encryptPassword} from "../utils/encrypt.js";
import ErrorRoute from "../class/ErrorRoute.js";

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
    subsidiary: "Subcuarsal"
};


export async function getUser(req, res) {
    const {
        names,
        last_names,
        user_name,
        password,
        administrator,
        department,
        email,
        subsidiary
    } = req.body;
    // * ----------------------- Validacion-----------------------------------------------------

    const validNames = new Text({text:names, minLenght: 3, maxLenght: 200, pattern: pattern.names}).validar();
    const validlLast_names = new Text({text:last_names, minLenght: 3, maxLenght: 200, pattern: pattern.names}).validar();
    const validlpassword = new Text({text:password, minLenght: 8, maxLenght: 20, pattern: pattern.password}).validar();
    const validUser_name = new Text({text:user_name, minLenght: 5, maxLenght: 25, pattern: pattern.userName}).validar();
    const validAdministrator = new Booleano({boolean:administrator, isNull:true}).validar();
    const validSubsidiary = new Booleano({boolean:subsidiary, isNull:true}).validar();
    const validDepartment = new Forenkey({id:department, key:table.department, table:"departments"}).validar();
    const validEmail = new Forenkey({id:email, key:table.email, table:"emails"}).validar();
    
    if (!validNames.status) {
        return res.status(validNames.code).json({ message: `${table.names}. ${validNames.message}`, status: false });
    };

    if (!validlLast_names.status) {
        return res.status(validlLast_names.code).json({ message: `${table.last_names}. ${validlLast_names.message}`, status: false });
    };

    if (!validlpassword.status) {
        return res.status(validlpassword.code).json({ message: `${table.password}. ${validlpassword.message}`, status: false });
    };

    const encrypPassword = await encryptPassword(validlpassword.result)

    if (!validUser_name.status) {
        return res.status(validUser_name.code).json({ message: `${table.user_name}. ${validUser_name.message}`, status: false });
    };

    if (!validAdministrator.status) {
        return res.status(validAdministrator.code).json({ message: `${table.administrator}. ${validAdministrator.message}`, status: false });
    };
    const valueAdministrator = validAdministrator.result===null? false : validAdministrator.result

    if (!validSubsidiary.status) {
        return res.status(validSubsidiary.code).json({ message: `${table.subsidiary}. ${validSubsidiary.message}`, status: false });
    };
    const valueSubsidiary = validSubsidiary.result===null? true : validSubsidiary.result

    if (!validDepartment.status) {
        return res.status(validDepartment.code).json({ message: `${table.department}. ${validDepartment.message}`, status: false });
    };

    if (!validEmail.status) {
        return res.status(validEmail.code).json({ message: `${table.email}. ${validEmail.message}`, status: false });
    };

    // * ----------------------------------------------------------------------------
    
    const reponse = await pool.query(
        "INSERT INTO departments (names, last_names, user_name) VALUES ($1, $2) RETURNING *",
        [validName.result, validDescription.result]
    );

    console.log("hello")
    res.json({
        prueba: "exito"
    })
}

export function deleteUser() {

}

export function postUser() {

}

export function putUser() {

}