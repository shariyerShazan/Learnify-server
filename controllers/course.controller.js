import { Course } from "../models/course.model"

export const createCourse = async (req , res)=>{
    try {
        const {courseTitle , category} = req.body 
        if(!courseTitle || !category){
            return res.status(400).json({
                message : "Something is missing!" ,
                success: false
            })
        }
        const course = await Course.create({
            courseTitle ,
            category ,
            instructor: req.userId
        })
        return res.status(200).json({
            message : "Course created" ,
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