import { Course } from "../models/course.model.js"
import { Lecture } from "../models/lecture.model.js"
import { uploadMedia } from "../utils/cloudinary.js"

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
         const lecture = await Lecture.create({
               lectureTitle ,
               creator: req.userId
            })
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


export const editLecture = async (req, res) => {
    try {
      const { lectureId } = req.params;
      const { lectureTitle, freeVideo } = req.body;
      const file = req.file; 
  
      const lecture = await Lecture.findOne({ _id: lectureId, creator: req.userId });
      if (!lecture) {
        return res.status(400).json({
          message: "You can't edit this lecture",
          success: false,
        });
      }
  
      if (file) {
        if (lecture.publicId) {
          await cloudinary.uploader.destroy(lecture.publicId, { resource_type: "video" });
        }

        const uploadResponse = await uploadMedia(file.buffer, "video");
  
        lecture.videoUrl = uploadResponse.secure_url;
        lecture.publicId = uploadResponse.public_id;
      }
  
      if (lectureTitle !== "") lecture.lectureTitle = lectureTitle;
      if (freeVideo) lecture.freeVideo = true;
  
      await lecture.save();
  
      return res.status(200).json({
        message: "Lecture updated successfully",
        success: true,
        lecture,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };
  

  export const getSingleLecture = async (req, res) => {
    try {
      const { lectureId } = req.params;

      // what is lean?
      const lecture = await Lecture.findById(lectureId).lean(); 
      
      if (!lecture) {
        return res.status(400).json({
          message: "Lecture not found",
          success: false,
        });
      }
  
      return res.status(200).json({
        message: "Lecture here",
        success: true,
        lecture,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };
  


  export const deleteLecture = async (req, res) => {
    try {
      const { lectureId } = req.params;
  
      const lecture = await Lecture.findOne({ _id: lectureId, creator: req.userId });
  
      if (!lecture) {
        return res.status(400).json({
          message: "You can't delete this lecture",
          success: false,
        });
      }
      await Lecture.findByIdAndDelete(lectureId);
  
      return res.status(200).json({
        message: "Lecture deleted",
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
  