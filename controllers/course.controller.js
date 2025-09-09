import { Course } from "../models/course.model.js"
import { deletePhoto } from "../utils/cloudinary.js"
import { v2 as cloudinary } from "cloudinary";
import streamifier from 'streamifier';

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
                success : false ,
                courses : []
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



export const getCourseById = async (req , res)=>{
    try {
        const {courseId} = req.params
        const course = await Course.findById(courseId).populate("lectures")
        if(!course){
            return res.status(200).json({
                message : "Course not found" ,
                success: false
            })
        }
        return res.status(200).json({
            message : "Course here" ,
            success: true,
            course
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : "Internal server error" ,
            success: false
        })
    }
}


export const editCourse = async (req , res)=>{
    try {
        const {courseId }= req.params
        const {courseTitle , subtitle , coursePrice , description , category , courseLevel } = req.body 
        const file = req.file
        let course = await Course.findOne({_id: courseId , instructor : req.userId})
        if(!course){
            return res.status(400).json({
                message : "You can't edit this course" ,
                success: false
            })
        }

        // upload thumbnail
        if (file) {
            try {
              if (course.courseThumbnail) {
                const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
                await deletePhoto(publicId);
              }
              const uploaded = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                  { resource_type: "auto" },
                  (error, result) => (error ? reject(error) : resolve(result))
                );
                streamifier.createReadStream(file.buffer).pipe(stream);
              });
      
              course.courseThumbnail = uploaded.secure_url;
            } catch (err) {
              console.log("Thumbnail upload error:", err);
              return res.status(500).json({ message: "Thumbnail upload failed", success: false });
            }
          }
      

      if(courseTitle !== undefined && courseTitle !== ""){
        course.courseTitle = courseTitle 
      }
      if(subtitle !== undefined && subtitle !== ""){
        course.subtitle = subtitle
      }
      if(coursePrice !== undefined && coursePrice !== ""){
        course.coursePrice = Number(coursePrice)
      }
      if(description !== undefined && description !== ""){
        course.description = description
      }
      if(category !== undefined && category !== ""){
        course.category = category
      }
      if(courseLevel !== undefined && courseLevel !== "" ){
        course.courseLevel = courseLevel
      }
      await course.save()
      return res.status(200).json({
        message : "Course Updated Successfully" ,
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

export const publishCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
  
      const course = await Course.findOne({ _id: courseId, instructor: req.userId });
      if (!course) {
        return res.status(400).json({
          message: "You can't edit this course",
          success: false,
        });
      }
     if(course.lectures.length <= 0){
        return res.status(400).json({
            message : "You have to add Lectures to publish this course"
        })
     }
      course.isPublished = !course.isPublished;
      const published = course.isPublished;
  
      await course.save();
  
      return res.status(200).json({
        message: `${published ? "Course Published Successfully" : "Course Unpublished Successfully"}`,
        success: true,
        isPublished: published,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };
  


  export const deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const course = await Course.findOne({ _id: courseId, instructor: req.userId });
  
      if (!course) {
        return res.status(400).json({
          message: "You can't delete this course",
          success: false,
        });
      }
      await Course.findByIdAndDelete(courseId);
  
      return res.status(200).json({
        message: "Course deleted successfully",
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };
  