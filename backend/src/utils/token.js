import config from "../config.js"
import jwt from "jsonwebtoken"
const secretKey = config.TOKEN;

export function createToken(user) {
    const payload = {
        id: user.id,
        state: user.state,
        administrador: user.administrador,
    };

    

    const token = jwt.sign(payload, secretKey, { expiresIn: '10h' });
    return token
}

export function verifyToken(token) {
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.log(err)
            return {status:false, message:err.message};
        } else {
            return {status:true, data:{...decoded}};
        }
    });
}