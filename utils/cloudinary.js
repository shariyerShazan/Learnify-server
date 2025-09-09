import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv"
dotenv.config()
import streamifier from "streamifier";

cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY ,
    api_secret: process.env.CLOUDINARY_API_SECRET ,
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME
    
})



export const uploadMedia = (fileBuffer, type = "auto") => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: type }, 
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      streamifier.createReadStream(fileBuffer).pipe(stream);
    });
  };



export const deletePhoto = async (publicId)=>{
    try {
        await cloudinary.uploader.destroy(publicId)
    } catch (error) {
        console.log(error)
    }
}

export const deleteVideo = async (publicId)=>{
    try {
        await cloudinary.uploader.destroy(publicId , {resource_type: "video"})
    } catch (error) {
        console.log(error)
    }
}