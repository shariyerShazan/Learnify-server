import express from  "express"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"
import { createLecture, editLecture, getSingleLecture } from "../controllers/lecture.controller.js"
import upload from "../utils/multer.js"

const route = express.Router()

route.post(`/create-lecture/:courseId` , isAuthenticated , createLecture)

route.patch(  "/edit-lecture/:lectureId", isAuthenticated ,  upload.single("video"),  editLecture );

route.get("/single-lecture/:lectureId" , getSingleLecture)


export default route