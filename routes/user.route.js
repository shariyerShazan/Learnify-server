import express from "express"
import { login, logout, register } from "../controllers/user.controller.js"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"

const route = express.Router()

route.post("/register" , register)
route.post("/login" , login)
route.post("/logout" , isAuthenticated  , logout)


export default route