import express from 'express';
import { updateRoleController } from '../../controllers/usersControllers/changeRoleControllers.js';
import { admin,protect, superAdmin  } from '../../middleware/userMiddleware.js';

const Rolerouter = express.Router();
Rolerouter.put('/user/update-role',protect,superAdmin,updateRoleController);

export default Rolerouter;
