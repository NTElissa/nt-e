import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

mongoose.set('strictQuery', false);
// // configuring dotenv
dotenv.config();

// // define some my env variables
const port = process.env.PORT;
const host = process.env.HOST;
const startServer = () => app.listen(port);
Promise.all([startServer()])
  .then(() => {
    console.log(`Server is listening at http://${host}:${port}`);
  })
  .catch((err) => console.log(err))


