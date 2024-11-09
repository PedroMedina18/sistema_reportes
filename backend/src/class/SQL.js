import { pool } from "../db.js"
import moment from "moment"

class SQLSELECT {
    constructor(nameTable) {
        this.nameTable = nameTable
        this.minRegister = 25
    }

    async search({ fields = null, order = null, all = false, limit = null, date = null, filter = [] }) {
        // # objeto para guardar la informacion a devolver

        const data={}
        let columns = "*";

        // si se da el parametro de fecha se comprueba que los datos sean validos
        if (date) {
            const dataDate = this.#rangeDate({ nameDate: date.name, end: date.end, start: date.start });
            filter.push(dataDate);
        };
        
        // para determinar que campos se piden
        if (fields) {
            columns = fields.join(", ");
        }


        // se busca el string del where
        const where = this.#where(filter);

        // se busca el string del order
        const orderBy = this.#verifyOrder(order);


        // se determinan los limites almenos que se pidan todos los registros de la tabla
        let stringLimit = "";

        if (!all && !limit) {
            stringLimit = this.#limit();
            const dataPages = this.#totalPages(this.minRegister, where)
            data.pages=dataPages.pages
            data.maxResult=dataPages.totalRegister
        } else if (!all && limit) {
            stringLimit = this.#limit(limit?.pag, limit?.top);
            const dataPages = this.#totalPages(limit?.top? limit.top : this.minRegister, where)
            data.pages=dataPages.pages
            data.maxResult=dataPages.totalRegister
        }

        // se unen todos los query
        let query = ```
            SELECT ${columns} FROM ${this.nameTable} 
        ```;
        query = query + where;
        query = query + orderBy;
        query = query + stringLimit;
        data.query = query


        return data
    }
    #verifyOrder(order) {
        const { field, organize } = order;

        if (organize && field && (organize === "ASC" || organize === "DESC")) {
            return `ORDER BY ${field} ${organize}`;
        };

        if (field && organize === true) {
            return `ORDER BY ${field} ASC`;
        } else if (field && organize === false) {
            return `ORDER BY ${field} DESC`;
        };

        if (field && !organize && !(organize === "ASC" || organize === "DESC")) {
            return `ORDER BY ${field} ASC`;
        };

        return "";
    };

    #limit(pag = null, top = null) {
        const max = top ? top : this.minRegister
        const page = pag ? pag : 1

        const result = (page - 1) * max

        
        if (pag > 1) {
            return {query : `LIMIT ${max} OFFSET ${result}`, pag:page}
        } else {
            return `LIMIT ${max}`
        }
    }

    async #totalPages(numberRegister, filter) {

        const total = await pool.query(`SELECT CEILING(COUNT(id) / ${numberRegister}) AS pages, COUNT(id) AS total FROM ${this.nameTable}` + filter);
        const data = {
            pages: total.rows[0].pages,
            totalRegister: total.rows[0].total,
        };
        return data;

    }

    #rangeDate({ nameDate, end = null, start = null }) {
        try {
            let desde = end;
            let hasta = start || moment().format("DD-MM-YYYY");
            hasta = moment(hasta, "DD-MM-YYYY").toDate();

            let query;
            if (desde) {
                desde = moment(desde, "DD-MM-YYYY").toDate();
                query = `DATE(${nameDate}) BETWEEN '${desde}' AND '${hasta}'`;
            } else {
                query = `DATE(${nameDate}) <= '${hasta}'`;
            };

            return query;
        } catch (error) {
            return;
        };
    };

    #where(filtros) {
        if (filtros.length === 0) {
            return "";
        } else {
            let where = "WHERE";
            for (const [i, filtro] of filtros) {
                const operador = i > 0 ? 'AND' : '';
                where = where + " " + operador + " " + filtro.trim();
            };
        };
        return where;
    };

}