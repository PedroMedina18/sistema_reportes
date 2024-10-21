import bcrypt from "bcrypt"

export async function encryptPassword(password) {
    // Generar una sal
    const saltRounds = 50; 
    const salt = await bcrypt.genSalt(saltRounds);
    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export async function verifyPassword(enteredPassword, storedHashedPassword) {
    const isMatch = await bcrypt.compare(enteredPassword, storedHashedPassword);
    return isMatch; // Devuelve true si coincide, false si no
}
