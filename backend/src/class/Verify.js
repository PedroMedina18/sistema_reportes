import message from "../utils/message.js"
import { verifyToken } from "../utils/token.js"
export default class VerifyRequest {
    constructor(req, admin = false, permiseId=0) {
        this.request = req
        this.admin = admin
        this.permiseId = Number(permiseId)
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

            if (this.admin && !data.data.administrator) {
                return {
                    state: false,
                    code: 403,
                    message: "Sin autorización"
                }
            }

            if(this.permiseId && this.permiseId !== data.data.id){
                return {
                    state: false,
                    code: 403,
                    message: "Sin autorización"
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