import message from "../utils/message.js"
import { verifyToken } from "../utils/token.js"
export default class VerifyRequest {
    constructor(req, admin = false) {
        this.request = req
        this.admin = admin
    }

    tokenVerify() {
        const headers = this.request.headers?.authorization

        if (headers && headers.includes("Bearer")) {
            const token = headers.split(" ")
            const data = verifyToken(token[1])
            if (!data.status) {
                return {
                    state: false,
                    code: 401,
                    message: data.message
                }
            }
            if (!data.data.state) {
                return {
                    state: false,
                    code: 403,
                    message: "Acceso Restringido. Usted esta desautorizado"
                }
            }
            if (admin && !data.data.administrator) {
                return {
                    state: false,
                    code: 403,
                    message: "Sin autorización para acceder"
                }
            }
            return {
                state: true,
                code: 200,
                message: "OK",
                data:data.data
            }
        } else {
            return {
                state: false,
                code: 401,
                message: "Sin Token"
            }
        }
    }
}