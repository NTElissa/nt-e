import express from "express";
import { updateUserController, deleteUserController } from "../../controllers/usersControllers/delete-updateControllers.js"

const UpdateDeleteRouter = express.Router();

UpdateDeleteRouter.put("/update/:id" ,updateUserController);
UpdateDeleteRouter.delete("/delete/:id",deleteUserController);

export default UpdateDeleteRouter