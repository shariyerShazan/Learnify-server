import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName : {
        type : String ,
        required : true ,
    } , 
    email: {
        type: String ,
        required : true ,
        unique: true
    } ,
    password: {
        type : String ,
        required : true ,
        select: false
    },
    role : {
        type: String ,
        emun: ["student" , "instructor"] ,
        default: "student"
    },
    enrolledCourses: [
        {
            type: mongoose.Schema.Types.ObjectId ,
            ref: "Course"
        }
    ],
    password: {
        type : String ,
        required : true
    } ,
    profilePicture : {
        type: String ,
      default : "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?semt=ais_hybrid&w=740&q=80"
    },
    profilePictureId: { type: String }

} , {timestamps: true})


export const User = mongoose.model("User" , userSchema)