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
            type : string
        } ,
        introVideo : {
            type: Boolean
        }
}, {timestamps : true})

export const Lecture = mongoose.model("Lecture" , lectureSchema)
