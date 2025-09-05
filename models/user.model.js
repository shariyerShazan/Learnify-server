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
        default : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small_2x/default-avatar-icon-of-social-media-user-vector.jpg"
    }

} , {timestamps: true})


export const User = mongoose.model("User" , userSchema)