import express from "express";
import { loginController  , getAllUsers} from "../../controllers/usersControllers/loginControllers.js";

const loginrouter = express.Router();

// Route for user login
loginrouter.post("/login", loginController);
loginrouter.get("/getAllusers" ,getAllUsers)

export default loginrouter;
