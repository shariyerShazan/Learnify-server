import express from  "express"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"
import { createCourse, editCourse, getAdminCourses, getCouseById } from "../controllers/course.controller.js"
import upload from "../utils/multer.js"

const route = express.Router()

route.post("/create-course" , isAuthenticated  , createCourse)

route.get("/admin-courses" , isAuthenticated  , getAdminCourses)

route.get("/single-course" , getCouseById)

route.patch("/edit-course/:courseId" , isAuthenticated , upload.single("courseThumbnail") , editCourse)


export default route