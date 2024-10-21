
class Booleano {
    constructor({ boolean, isNull = false }) {
        this.boolean = boolean;
        this.isNull = isNull;

    }

    async validar() {
        try {
            if (this.isNull && (this.boolean === null || this.boolean === undefined)) {
                return{
                    message:`OK`,
                    code:200,
                    status:true,
                    result:null
                }

            }

            if (!this.isNull && this.boolean === null) {
                return {
                    message: "Nulo",
                    code: 400,
                    status: false
                }

            }

            if (!this.isNull && this.id === undefined) {
                return {
                    message: "Indefinido",
                    code: 400,
                    status: false
                };
            }

            if (typeof (this.boolean) !== "boolean" || typeof (this.boolean) !== "number") {
                return {
                    message: `Tipo de dato invalido debe ser boolean`,
                    code: 422,
                    status: false
                };
            }

            if (typeof (this.boolean) === "number" && (Number(this.boolean) !== 0 || Number(this.boolean) !== 1)) {
                return {
                    message: `No valido`,
                    code: 422,
                    status: false
                };
            }

            return{
                message:`OK`,
                code:200,
                status:true,
                result:Boolean(this.boolean)
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
export default Booleano