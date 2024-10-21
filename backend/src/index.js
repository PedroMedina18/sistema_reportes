import express from "express";
import usersRoutes from "./routes/routes.js";
import morgan from "morgan";
import config from "./config.js";
import { pool} from "./db.js";

const app = express();

app.use(morgan("dev"));


// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(usersRoutes);



app.listen(config.PORT);

console.log("Server on port", config.PORT);