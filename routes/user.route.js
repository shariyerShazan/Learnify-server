import express from "express"
import { login, register } from "../controllers/user.controller"

const route = express.Router()

route.post("/register" , register)
route.post("/login" , login)


export default route