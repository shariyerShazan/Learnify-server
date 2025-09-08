import express from "express"
import { getUser, login, logout, register, updateProfile } from "../controllers/user.controller.js"
import {  isAuthenticated } from "../middlewares/isAuthenticated.js"
import upload from "../utils/multer.js"

const route = express.Router()

route.post("/register" , register)
route.post("/login" , login)
route.post("/logout" , isAuthenticated  , logout)
route.get("/get-user" , isAuthenticated  , getUser)
route.patch("/update-user" , isAuthenticated , upload.single('profilePicture') , updateProfile)


export default route