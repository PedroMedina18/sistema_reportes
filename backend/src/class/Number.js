class Number {
    constructor({ number, type = true, isNull = false, maxlenght = null, minlenght = null }) {
        this.number = number;
        this.isNull = isNull;
        this.type = type;
        this.maxlenght = maxlenght;
        this.minlenght = minlenght;
    }

    validar() {
        try {
            if (!this.isNull && this.number === null) {
                return {
                    message: "Nulo",
                    code: 400,
                    status: false
                }
            }

            if (!this.isNull && this.number === undefined) {
                return {
                    message: "Indefinido",
                    code: 400,
                    status: false
                }
            }
            
            const type = this.type ? "number" : "float"
            if (typeof (this.number) !== "number") {
                return {
                    message: `Tipo de dato invalido debe ser ${type}`,
                    code: 422,
                    status: false
                }
            }

            if (this.maxlenght && type == "number" && this.number.toString().length > this.maxlenght) {
                return {
                    message: `Maximo ${this.maxlenght} caracteres`,
                    code: 422,
                    status: false
                }
            }

            if (this.minlenght && type == "number" && this.number.toString().length < this.minlenght) {
                return {
                    message: `Minimo ${this.minlenght} caracteres`,
                    code: 422,
                    status: false
                }
            }

            return {
                message: `OK`,
                code: 200,
                status: true,
                result: this.type ? Number(this.number) : Number(this.number).toFixed(2)
            }

        } catch {
            console.log(error)
            return {
                message: `Error Desconocido`,
                code: 500,
                detail: error.message,
                status: false
            }
        }


    }
}