import { Course } from "../models/course.model.js"

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


export const getAdminCourses = async (req , res)=>{
    try {
        const courses = await Course.find({instructor : req.userId})
        if(courses.length === 0){
            return res.status(400).json({
                message : "No course available." ,
                success : false
            })
        }
        return res.status(200).json({
            message : "Your courses" ,
            success : true ,
            courses
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : "Internal server error" ,
            success: false
        })
    }
}