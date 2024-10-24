import pattern from "../utils/pattern.js";
import Text from "../class/Text.js";
import Forenkey from "../class/Forenkey.js";
import Booleano from "../class/Booleano.js";
import { encryptPassword } from "../utils/encrypt.js";
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
    subsidiary: "Subcursal",
    state: "Estado"
};


export async function postUser(req, res) {
    try {

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

        const validNames = new Text({ text: names, minLenght: 3, maxLenght: 200, pattern: pattern.names }).validar();
        const validLastNames = new Text({ text: last_names, minLenght: 3, maxLenght: 200, pattern: pattern.names }).validar();
        const validPassword = new Text({ text: password, minLenght: 8, maxLenght: 20, pattern: pattern.password }).validar();
        const validUserName = new Text({ text: user_name, minLenght: 5, maxLenght: 25, pattern: pattern.userName }).validar();
        const validAdministrator = new Booleano({ boolean: administrator, isNull: true }).validar();
        const validSubsidiary = new Booleano({ boolean: subsidiary, isNull: true }).validar();
        const validDepartment = new Forenkey({ id: department, key: table.department, table: "departments" }).validar();
        const validEmail = new Forenkey({ id: email, key: table.email, table: "emails" }).validar();

        if (!validNames.status) {
            return res.status(validNames.code).json({ message: `${table.names}. ${validNames.message}`, status: false });
        };

        if (!validLastNames.status) {
            return res.status(validLastNames.code).json({ message: `${table.last_names}. ${validLastNames.message}`, status: false });
        };

        if (!validPassword.status) {
            return res.status(validPassword.code).json({ message: `${table.password}. ${validPassword.message}`, status: false });
        };

        const encrypPassword = await encryptPassword(validPassword.result)

        if (!validUserName.status) {
            return res.status(validUserName.code).json({ message: `${table.user_name}. ${validUserName.message}`, status: false });
        };

        if (!validAdministrator.status) {
            return res.status(validAdministrator.code).json({ message: `${table.administrator}. ${validAdministrator.message}`, status: false });
        };
        const valueAdministrator = validAdministrator.result === null ? false : validAdministrator.result

        if (!validSubsidiary.status) {
            return res.status(validSubsidiary.code).json({ message: `${table.subsidiary}. ${validSubsidiary.message}`, status: false });
        };
        const valueSubsidiary = validSubsidiary.result === null ? true : validSubsidiary.result

        if (!validDepartment.status) {
            return res.status(validDepartment.code).json({ message: `${table.department}. ${validDepartment.message}`, status: false });
        };

        if (!validEmail.status) {
            return res.status(validEmail.code).json({ message: `${table.email}. ${validEmail.message}`, status: false });
        };

        // * ----------------------------------------------------------------------------

        const reponse = await pool.query(
            "INSERT INTO users (names, last_names, user_name, password, administrator, department_id, email_id, subsidiary) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [
                validNames.result,
                validLastNames.result,
                validUserName.result,
                encrypPassword,
                valueAdministrator,
                validDepartment.result,
                validEmail.result,
                valueSubsidiary
            ]
        );
        return res.status(201).json({ message: `${table.table}. Creado`, id: reponse.rows[0].id, status: true });
    } catch {
        const routeError = new ErrorRoute(error, table).typeError();
        return res.status(routeError.code).json({ error: routeError.message, status: false });
    }

}

export async function putUser(req, res) {
    try {
        const id = Number(req.params.id) || 0;
        const {
            names,
            last_names,
            administrator,
            department,
            state,
            email,
            subsidiary
        } = req.body;

        if(id<=0){
            return res.status(401).json({ message: `${table.table}. Invalido`, status: false });
        };
        const {rowCount, rows} = await pool.query("SELECT names, last_names, administrator, department, state, email, subsidiary  FROM users WHERE id=$1", [
            id
        ]);

        if(rowCount===0){
            return res.status(404).json({ message: `${table.table}. No encontrado`, status: false });
        };

        const dataUser = {
            names: names !== undefined ? names : rows[0].names,
            last_names: last_names !== undefined ? last_names : rows[0].last_names,
            administrator: administrator !== undefined ? administrator : rows[0].administrator,
            department: department !== undefined ? department : rows[0].department,
            state: state !== undefined ? state : rows[0].state,
            email: email !== undefined ? email : rows[0].email,
            subsidiary: subsidiary !== undefined ? subsidiary : rows[0].subsidiary,
        };

        // * ----------------------- Validacion-----------------------------------------------------

        const validNames = new Text({ text: dataUser.names, minLenght: 3, maxLenght: 200, pattern: pattern.names }).validar();
        const validLastNames = new Text({ text: dataUser.last_names, minLenght: 3, maxLenght: 200, pattern: pattern.names }).validar();
        const validAdministrator = new Booleano({ boolean: dataUser.administrator, isNull: true }).validar();
        const validState = new Booleano({ boolean: dataUser.state }).validar();
        const validSubsidiary = new Booleano({ boolean: dataUser.subsidiary, isNull: true }).validar();
        const validDepartment = new Forenkey({ id: dataUser.department, key: table.department, table: "departments" }).validar();
        const validEmail = new Forenkey({ id: dataUser.email, key: table.email, table: "emails" }).validar();

        if (!validNames.status) {
            return res.status(validNames.code).json({ message: `${table.names}. ${validNames.message}`, status: false });
        };

        if (!validLastNames.status) {
            return res.status(validLastNames.code).json({ message: `${table.last_names}. ${validLastNames.message}`, status: false });
        };

        if (!validAdministrator.status) {
            return res.status(validAdministrator.code).json({ message: `${table.administrator}. ${validAdministrator.message}`, status: false });
        };
        const valueAdministrator = validAdministrator.result === null ? false : validAdministrator.result

        if (!validState.status) {
            return res.status(validState.code).json({ message: `${table.state}. ${validState.message}`, status: false });
        };

        if (!validSubsidiary.status) {
            return res.status(validSubsidiary.code).json({ message: `${table.subsidiary}. ${validSubsidiary.message}`, status: false });
        };
        const valueSubsidiary = validSubsidiary.result === null ? true : validSubsidiary.result

        if (!validDepartment.status) {
            return res.status(validDepartment.code).json({ message: `${table.department}. ${validDepartment.message}`, status: false });
        };

        if (!validEmail.status) {
            return res.status(validEmail.code).json({ message: `${table.email}. ${validEmail.message}`, status: false });
        };

        // * ----------------------------------------------------------------------------

        const update = await pool.query(
            "UPDATE users SET names=$1, last_names=$2, administrator=$3, department_id=$4, state=$5, email_id=$6, subsidiary=$7 WHERE id = $8 RETURNING *",
            [
                validNames.result,
                validLastNames.result,
                valueAdministrator,
                validDepartment.result,
                validState.result,
                validEmail.result,
                valueSubsidiary,
                id
            ]
        );
        return res.status(200).json({ message: `${table.table}. Actualizado`, id: update.rows[0].id, status: true });
    } catch {
        const routeError = new ErrorRoute(error, table).typeError();
        return res.status(routeError.code).json({ error: routeError.message, status: false });
    }

}

export async function deleteUser(req, res) {
    try {
        const id = Number(req.params.id);

        if(id<=0){
            return res.status(401).json({ message: `${table.table}. Invalido`, status: false });
        };

        const { rowCount } = await pool.query("DELETE FROM users where id = $1", [
            id,
        ]);
        if (rowCount === 0) {
            return res.status(404).json({ message: `${table.table}. No encontrado`, status: false });
        };

        return res.status(200).json({ message: `${table.table}. Eliminado`, status: true });

    } catch (error) {
        const routeError = new ErrorRoute(error, table).typeError();
        return res.status(routeError.code).json({ error: routeError.message, status: false });
    };
}

export async function editPassword(req, res) {
    try{
        const id = Number(req.params.id);

        const {
            password
        } = req.body;

        if(id<=0){
            return res.status(401).json({ message: `${table.table}. Invalido`, status: false });
        };

        const {rowCount} = await pool.query("SELECT id FROM users WHERE id=$1", [
            id
        ]);

        if(rowCount===0){
            return res.status(404).json({ message: `${table.table}. No encontrado`, status: false });
        };


        const validPassword = new Text({ text: password, minLenght: 8, maxLenght: 20, pattern: pattern.password }).validar();

        if (!validPassword.status) {
            return res.status(validPassword.code).json({ message: `${table.password}. ${validPassword.message}`, status: false });
        };

        const encrypPassword = await encryptPassword(validPassword.result)

        const {update} = await pool.query(
            "UPDATE users SET password=$1 WHERE id = $2 RETURNING *",
            [
                encrypPassword,
                id
            ]
        );

        return res.status(200).json({ message: `Cambio de contraseña completado`, id: update.rows[0].id, status: true });


    } catch (error) {
        const routeError = new ErrorRoute(error, table).typeError();
        return res.status(routeError.code).json({ error: routeError.message, status: false });
    };
}

export async function editnameUser(req, res) {
    try{
        const id = Number(req.params.id);

        const {
            user_name
        } = req.body;

        if(id<=0){
            return res.status(401).json({ message: `${table.table}. Invalido`, status: false });
        };

        const {rowCount} = await pool.query("SELECT id FROM users WHERE id=$1", [
            id
        ]);

        if(rowCount===0){
            return res.status(404).json({ message: `${table.table}. No encontrado`, status: false });
        };


        const validUserName = new Text({ text: user_name, minLenght: 5, maxLenght: 25, pattern: pattern.userName }).validar();

        if (!validUserName.status) {
            return res.status(validUserName.code).json({ message: `${table.user_name}. ${validUserName.message}`, status: false });
        };
        

        const {update} = await pool.query(
            "UPDATE users SET user_name=$1 WHERE id = $2 RETURNING *",
            [
                validUserName.result,
                id
            ]
        );

        return res.status(200).json({ message: `Cambio de nombre de usuario completado`, id: update.rows[0].id, status: true });


    } catch (error) {
        const routeError = new ErrorRoute(error, table).typeError();
        return res.status(routeError.code).json({ error: routeError.message, status: false });
    };
}

export async function editState(req, res) {
    try{
        const id = Number(req.params.id);

        const {
            state
        } = req.body;

        if(id<=0){
            return res.status(401).json({ message: `${table.table}. Invalido`, status: false });
        };

        const {rowCount} = await pool.query("SELECT id FROM users WHERE id=$1", [
            id
        ]);

        if(rowCount===0){
            return res.status(404).json({ message: `${table.table}. No encontrado`, status: false });
        };


        const validState = new Booleano({ boolean: state }).validar();

        if (!validState.status) {
            return res.status(validState.code).json({ message: `${table.state}. ${validState.message}`, status: false });
        };
        

        const {update} = await pool.query(
            "UPDATE users SET state=$1 WHERE id = $2 RETURNING *",
            [
                validState.result,
                id
            ]
        );

        return res.status(200).json({ message: `Cambio de estado completado`, id: update.rows[0].id, status: true });


    } catch (error) {
        const routeError = new ErrorRoute(error, table).typeError();
        return res.status(routeError.code).json({ error: routeError.message, status: false });
    };
}

export async function getUsers(req, res) {

}