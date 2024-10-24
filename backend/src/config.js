
const config = {
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_PORT: process.env.DB_PORT,
    TOKEN: process.env.TOKEN || null,
    KEY_SECRET_DATABASE: process.env.KEY_SECRET_DATABASE || null,
    PORT: process.env.PORT || 3000,
  };

export default config