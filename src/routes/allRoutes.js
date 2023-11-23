import express from "express"
import UseRouter from "./userRoutes/CreateUserRoutes.js"
const router = express.Router()

// all routes
router.use("/user",UseRouter)

export default router