import config from "../config.js"
import jwt from "jsonwebtoken"
const secretKey = config.TOKEN;

export function createToken(user) {

    const payload = {
        id: user.id,
        state: user.state,
        administrator: user.administrator,
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: '1min' });
    return token;
};

export function verifyToken(token) {
    return jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return {status:false, message:err.message};
        } else {
            return {status:true, data:{...decoded}};
        };
    });

};

