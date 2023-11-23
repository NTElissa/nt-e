import express from "express";
import  { createUser, deleteUserById  } from "../../Controllers/user/signup-deleteUser.js";


const UseRouter= express.Router();

UseRouter.post("/", createUser );
UseRouter.delete("/delete/:id", deleteUserById);

export default UseRouter