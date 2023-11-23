import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";


mongoose.set('strictQuery', false);

// configuring dotenv
dotenv.config();

// create server instance
const app = express();

// use of cors and body parse
app.use(cors());
app.use(bodyParser.json());
//cookie for middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// route - home route
app.get("/", (req, res) => {
    res.status(200).send(`
  <h1 style="text-align: center; margin-top: 20vh;"> Manager  event   APIS</h1>
  `);
});

mongoose.set('strictQuery', false);
let con = null;
  con = mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

if(con){
    console.log('Database has been connected')
}


export default app;