class ErrorRoute {
    constructor(error, table) {
        this.error = error
        this.message = error.message
        this.table = table
    }

    typeError() {
        
        if (this.error.code == 23505) {
            const regex = /\(([^)]+)\)/;
            const match = this.error.detail.match(regex);
            return {
                code: 409,
                message: `Campo ${this.table[match[1]]}. Duplicado`
            }
        }
        console.log(this.error)
        return {
            code: 500,
            message: this.message
        }
    }
}

export default ErrorRoute