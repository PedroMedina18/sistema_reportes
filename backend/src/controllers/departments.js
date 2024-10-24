import pattern from "../utils/pattern.js";
import Text from "../class/Text.js";
import ErrorRoute from "../class/ErrorRoute.js";

const table = {
    table: "Departamento",
    id: "ID",
    name: "Nombre",
    description: "Descripción"
};

export async function postDepartment(req, res) {
    try {
        const { name, description } = req.body;

        // * ----------------------- Validacion------------------------------------------------------------

        const validName = new Text({text:name, minLenght: 3, maxLenght: 200, pattern: pattern.textWithNumber}).validar();
        const validDescription = new Text({text:description || name, minLenght: 3, maxLenght: 500}).validar();

        if (!validName.status) {
            return res.status(validName.code).json({ message: `${table.name}. ${validName.message}`, status: false });
        };

        if (!validDescription.status) {
            return res.status(validDescription.code).json({ message: `${table.description}. ${validDescription.message}`, status: false });
        };
        // * ----------------------------------------------------------------------------------------------
        
        const create = await pool.query(
            "INSERT INTO departments (name, description) VALUES ($1, $2) RETURNING *",
            [validName.result, validDescription.result]
        );


        return res.status(201).json({ message: `${table.table}. Creado`, id: create.rows[0].id, status: true });
    } catch (error) {
        const routeError = new ErrorRoute(error, table).typeError();
        return res.status(routeError.code).json({ error: routeError.message, status: false });
    }
};

export async function putDepartment(req, res) {
    try {
        const id = Number(req.params.id) || 0;
        const { name, description } = req.body;
        
        if(id<=0){
            return res.status(401).json({ message: `${table.table}. Invalido`, status: false });
        };

        const {rowCount, rows} = await pool.query("SELECT * FROM departments WHERE id=$1", [
            id
        ]);

        if(rowCount===0){
            return res.status(404).json({ message: `${table.table}. No encontrado`, status: false });
        };

        const dataReportType = {
            name: name !== undefined ? name : rows[0].name,
            description: description !== undefined ? description : rows[0].description,
        };
        
        const validName = new Text({text:dataReportType.name, minLenght: 3, maxLenght: 200, pattern: pattern.textWithNumber}).validar();
        const validDescription = new Text({text:dataReportType.description, minLenght: 3, maxLenght: 500}).validar();

        if (!validName.status) {
            return res.status(validName.code).json({ message: `${table.name}. ${validName.message}`, status: false });
        };

        if (!validDescription.status) {
            return res.status(validDescription.code).json({ message: `${table.description}. ${validDescription.message}`, status: false });
        };

        const update = await pool.query(
            "UPDATE departments SET name = $1, description = $2 WHERE id = $3 RETURNING *",
            [validName.result, validDescription.result, id]
        );

        return res.status(200).json({ message: `${table.table}. Actualizado`, id: update.rows[0].id, status: true });

    } catch (error) {
        const routeError = new ErrorRoute(error, table).typeError();
        return res.status(routeError.code).json({ error: routeError.message, status: false });
    };
};

export async function deleteDepartment(req, res) {
    try {
        const id = Number(req.params.id);

        if(id<=0){
            return res.status(401).json({ message: `${table.table}. Invalido`, status: false });
        };

        const { rowCount } = await pool.query("DELETE FROM departments where id = $1", [
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
};

export async function getDepartment(req, res) {

};