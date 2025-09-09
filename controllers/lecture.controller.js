import { Course } from "../models/course.model.js"
import { Lecture } from "../models/lecture.model.js"

export const createLecture  = async (req , res)=>{
    try {
         const {lectureTitle} = req.body
         if(!lectureTitle){
            return res.status(400).json({
                message : "Lecture title is required" ,
                success: false
            })
         }
         const {courseId }= req.params
         const course = await Course.findById(courseId)
         if(!course){
            return res.status(400).json({
                message : "Course is required" ,
                success: false
            })
         }
         const lecture = await Lecture.create({lectureTitle})
        course.lectures.push(lecture._id)
        await  course.save()
       
        return res.status(201).json({
            message : "Lecture Created sunccessfully" ,
            success: true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : "Internal server error" ,
            success: false
        })
    }
}