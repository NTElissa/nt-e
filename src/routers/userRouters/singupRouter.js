import express from "express";
import  { signupController } from "../../controllers/usersControllers/signupControllers.js";

const signupRouter= express.Router();

signupRouter.post("/",signupController  );

export default signupRouter