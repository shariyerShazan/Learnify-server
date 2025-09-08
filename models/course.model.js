import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    courseTitle: {
        type: String ,
        required : true
    } ,
    subTitle: {
        type: String ,
        // required : true
    },
    description: {
        type: String 
    } ,
    category: {
        type: String ,
        required : true
    } ,
    courseLevel : {
        type: String ,
        enum: ["Beginner"  ,"Medium" , "Advance"]
    } ,
    coursePrice: {
        type: Number ,
        // required : true
    } ,
    courseThumbnail: {
        type: String ,
        // required : true
    } ,
    enrolledStudents: [
        {
            type: mongoose.Schema.Types.ObjectId ,
            ref: "User"
        }
    ] ,
    lectures: [
            {
                type: mongoose.Schema.Types.ObjectId ,
                ref: "Lecture"
            }
    ],
    instructor: {
         type: mongoose.Schema.Types.ObjectId ,
                ref: "User"
    } ,
    isPublished: {
        type: Boolean ,
        default: false
    }
} , {timestamps: true})

export const Course = mongoose.model("Course" , courseSchema)