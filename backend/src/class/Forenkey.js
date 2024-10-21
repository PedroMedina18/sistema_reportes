import { pool } from "../db.js";
class ForenKey {
    constructor({ id, isNull = false, table, key }) {
        this.id = id;
        this.table = table;
        this.isNull = isNull;
        this.key = key;

    }

    async validar() {
        try {
            if (this.isNull && (this.id === null || this.id === undefined)) {
                return{
                    message:`OK`,
                    code:200,
                    status:true,
                    result:null
                }

            }
            
            if (!this.isNull && this.id === null) {
                return {
                    message: `${this.key}. Nulo`,
                    code: 400,
                    status: false
                }

            }
            if (!this.isNull && this.id === undefined) {
                return {
                    message: `${this.key}. Indefinido`,
                    code: 400,
                    status: false
                };
            }
            

            if (typeof (this.id) !== "number") {
                return {
                    message: `${this.key}. No valido`,
                    code: 422,
                    status: false
                };
            }

            const { rowCount } = await pool.query(`SELECT id FROM ${this.table} WHERE id=$1`, [
                this.id
            ]);

            if (rowCount === 0) {
                return {
                    message: `${this.key}. No Registrado`,
                    code: 422,
                    status: false
                };
            };
            return{
                message:`OK`,
                code:200,
                status:true,
                result:Number(this.id)
            }

        } catch (error) {
            return {
                message: `${this.key}. ${error.message}`,
                code: 500,
                status: false
            };
        }
    }
}
export default ForenKey