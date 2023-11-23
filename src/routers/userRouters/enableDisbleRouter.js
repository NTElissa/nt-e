
import express from 'express';
import { enableUser, disableUser } from '../../controllers/usersControllers/enableDisbleControllers.js';
import {  protect ,superAdmin } from '../../middleware/userMiddleware.js';

const StatusRouter = express.Router();
StatusRouter.put('/user/enable',  protect,superAdmin, enableUser);
StatusRouter.put('/user/disable',  protect,superAdmin, disableUser);

export default StatusRouter;
