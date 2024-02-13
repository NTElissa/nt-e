import express from "express"
import signupRouter from "./userRouters/singupRouter.js"
import  loginrouter from "./userRouters/loginRouters.js"
import  UpdateDeleteRouter from "./userRouters/delete-updateRouter.js"
import  blogRouter from "./blogRouters/blogRouter.js"
import Rolerouter from "./userRouters/setRoleRouter.js"
import StatusRouter from "./userRouters/enableDisbleRouter.js"
// import getAllUsersRouter from "./userRouters/getUseRouter.js"
const router = express.Router()
// all routes
router.use("/signupUser",signupRouter)
router.use("/loginUser",loginrouter)
router.use("/update-delete" , UpdateDeleteRouter)
router.use("/blog" ,blogRouter)
router.use("/role" ,Rolerouter)
router.use("/status" ,StatusRouter)
// router.use("/getuser" ,getAllUsersRouter)


export default router