import bcrypt from "bcrypt"

export async function encryptPassword(password, saltos=15) {
    try{

        // Generar una sal
        const saltRounds = saltos; 
        const salt = await bcrypt.genSalt(saltRounds);
        // Cifrar la contraseña
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }catch{
        console.log("error durante el encryptado")
    }
}

export async function verifyPassword(enteredPassword, storedPassword) {
    const isMatch = await bcrypt.compare(enteredPassword, storedPassword);
    return isMatch; // Devuelve true si coincide, false si no
}
