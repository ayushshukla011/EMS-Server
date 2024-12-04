import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import routes from "./routes/index";
import Cors from './middlewares/cors';
import prisma from './database';
dotenv.config();



const app = express();
const PORT = 3000;
app.use(Cors);
//conecting with Db



app.use("/api", routes)


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
