import express from  "express"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"
import { createCourse, deleteCourse, editCourse, getAdminCourses, getCourseById, getPublishedCourse, publishCourse } from "../controllers/course.controller.js"
import upload from "../utils/multer.js"

const route = express.Router()

route.post("/create-course" , isAuthenticated  , createCourse)

route.get("/admin-courses" , isAuthenticated  , getAdminCourses)

route.get("/published-course" , getPublishedCourse )
route.get("/single-course/:courseId" , getCourseById)

route.patch("/edit-course/:courseId" , isAuthenticated , upload.single("courseThumbnail") , editCourse)
route.patch("/published/:courseId" , isAuthenticated , publishCourse)

route.delete("/delete-course/:courseId" , isAuthenticated , deleteCourse)


export default route