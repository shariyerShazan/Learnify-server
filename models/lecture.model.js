import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
        lectureTitle: {
            type: String ,
            required: true
        } ,
        videoUrl : {
            type: String 
        } ,
        publicId : {
            type : String
        } ,
        freeVideo : {
            type: Boolean
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId ,
            ref: "User"
        }
}, {timestamps : true})

export const Lecture = mongoose.model("Lecture" , lectureSchema)
