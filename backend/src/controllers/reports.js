import { pool } from "../db.js";
import message from "../utils/message.js";
import pattern from "../utils/pattern.js";
import Text from "../class/Text.js";
import Forenkey from "../class/Forenkey.js";
import ErrorRoute from "../class/ErrorRoute.js";
import {verifyToken} from "../utils/token.js";

const table = {
    table: "Reporte",
    id: "ID",
    user_reported:"Usuario del Reporte",
    user_completed:"Usuario Completado",
    report_type:"Tipo de Reporte",
    description:"Descripción",
    state:"Estado",
    created:"Fecha de registro",
    completed:"Fecha de Completación",
};

export async function postReport(req, res){
    try {
        const { 
            report_type,
            description,
         } = req.body;
         
         const valiReportID = new Forenkey({id:report_type, table:"reports_type", key:table.report_type}).validar();

         if (!valiReportID.status) {
             return res.status(valiReportID.code).json({ message: `${table.report_type}. ${valiReportID.message}`, status: false });
         };

        const valiDescription = new Text({text:description, minLenght:10, maxLenght:1000, pattern: pattern.textWithNumber}).validar();

        if (!valiDescription.status) {
            return res.status(valiDescription.code).json({ message: `${table.description}. ${valiDescription.message}`, status: false });
        };

        const reponse = await pool.query(
            "INSERT INTO emails (email) VALUES ($1) RETURNING *",
            [valiDescription.result]
        );

        return res.status(201).json({ message: `${table.table}. Creado`, id: reponse.rows[0].id, status: true });
    } catch (error) {
        const routeError = new ErrorRoute(error, table).typeError();
        return res.status(routeError.code).json({ error: routeError.message, status: false });
    };
}

export async function putReport(req, res){
    
}

export async function deleteReport(req, res){
    
}

export async function getReport(req, res){

}