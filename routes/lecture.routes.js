import express from  "express"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"
import { createLecture } from "../controllers/lecture.controller.js"

const route = express.Router()

route.post(`/create-lecture/:courseId` , isAuthenticated , createLecture)


export default route