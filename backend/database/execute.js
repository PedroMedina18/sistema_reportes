import pg from "pg";
import config from "../src/config.js";
import fs from 'fs'
import * as colors from "colors"
const client = new pg.Client({
    user: config.DB_USER,
    host: config.DB_HOST,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE,
    port: config.DB_PORT,
})


client.connect((err) => {
    if (err) {
        console.error('Error al conectarse a la base de datos PostgreSQL'.red, err);
        return;
    }

    console.log('Conectado a la base de datos PostgreSQL'.green);

    // Import and execute the SQL file
    const sqlFile = 'database/db.sql';
    const query = fs.readFileSync(sqlFile, 'utf8');
    client.query(query, (err, result) => {
        if (err) {
            console.error('Error al ejecutar consulta SQL'.red, err);
            return;
        }

        console.log('Consulta SQL ejecutada exitosamente'.green);
        client.end();
    });
});
