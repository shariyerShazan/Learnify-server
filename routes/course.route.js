import express from  "express"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"
import { createCourse } from "../controllers/course.controller.js"

const route = express.Router()

route.post("/create-course" , isAuthenticated  , createCourse)


export default route