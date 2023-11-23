import express from "express";
import { loginController } from "../../controllers/usersControllers/loginControllers.js";

const loginrouter = express.Router();

// Route for user login
loginrouter.post("/login", loginController);

export default loginrouter;
