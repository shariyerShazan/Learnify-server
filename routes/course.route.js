import express from  "express"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"
import { createCourse, getAdminCourses } from "../controllers/course.controller.js"

const route = express.Router()

route.post("/create-course" , isAuthenticated  , createCourse)

route.get("/admin-courses" , isAuthenticated  , getAdminCourses)


export default route