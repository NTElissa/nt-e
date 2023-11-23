import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import allRoutes from "./routers/allRouters.js";
import cookieParser from "cookie-parser";
//import swaggerUI from "swagger-ui-express";



mongoose.set('strictQuery', false);

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.status(200).send(`
  <h1 style="text-align: center; margin-top: 20vh;"> Manager  event   APIS</h1>
  `);
});

mongoose.set('strictQuery', false);
let con = null;
  con = mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        wtimeoutMS: 30000,
    });

if(con){
    console.log('Database has been connected')
}
app.use("/api/v1/", allRoutes);

export default app;
