import { pool } from "../db.js";
import message from "../utils/message.js";
import pattern from "../utils/pattern.js";
import Text from "../class/Text.js";
import ErrorRoute from "../class/ErrorRoute.js";

const table = {
    table: "Correo Electrónico",
    id: "ID",
    email: "Correo Electrónico"
};

export async function postEmail(req, res) {

    try {
        const { email } = req.body;

        const validEmail = new Text({text:email, pattern: pattern.email}).validar();

        if (!validEmail.status) {
            return res.status(validEmail.code).json({ message: `${table.email}. ${validEmail.message}`, status: false });
        };

        const reponse = await pool.query(
            "INSERT INTO emails (email) VALUES ($1) RETURNING *",
            [validEmail.result]
        );

        return res.status(201).json({ message: `${table.table}. Creado`, id: reponse.rows[0].id, status: true });
    } catch (error) {
        const routeError = new ErrorRoute(error, table).typeError();
        return res.status(routeError.code).json({ error: routeError.message, status: false });
    }
};

export async function putEmail(req, res) {
    try {
        const id = Number(req.params.id) || 0;
        const { email } = req.body;
        if(id<=0){
            return res.status(404).json({ message: `${table.table}. No encontrado`, status: false });
        };

        const {rowCount, rows} = await pool.query("SELECT * FROM emails WHERE id=$1", [
            id
        ]);

        if(rowCount===0){
            return res.status(404).json({ message: `${table.table}. No encontrado`, status: false });
        };

        const dataEmail = {
            email: email !== undefined ? email : rows[0].email
        };

        const validEmail = new Text({text:dataEmail.email, pattern:pattern.email}).validar();

        if (!validEmail.status) {
            return res.status(validEmail.code).json({ message: `${table.email}. ${validEmail.message}`, status: false });
        };

        const update = await pool.query(
            "UPDATE emails SET email = $1 WHERE id = $2 RETURNING *",
            [validEmail.result, id]
        );

        return res.status(200).json({ message: `${table.table}. Actualizado`, id: update.rows[0].id, status: true });

    } catch (error) {
        const routeError = new ErrorRoute(error, table).typeError();
        return res.status(routeError.code).json({ error: routeError.message, status: false });
    };
};

export async function deleteEmail(req, res) {
    try {
        const id = Number(req.params.id);
        const { rowCount } = await pool.query("DELETE FROM emails where id = $1", [
            id,
        ]);
        if (rowCount === 0){
            return res.status(404).json({ message: `${table.table}. No encontrado`, status: false });
        };

        return res.status(200).json({ message: `${table.table}. Eliminado`, status: true });

    } catch (error) {
        const routeError = new ErrorRoute(error, table).typeError();
        return res.status(routeError.code).json({ error: routeError.message, status: false });
    };
};

export async function getEmail(req, res) {
    try {
        const response = await pool.query("SELECT * FROM emails ORDER BY id ASC");
        return res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    };
};