import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { deletePhoto, uploadMedia } from "../utils/cloudinary.js"

export const register = async (req , res)=>{
    try {
        const {fullName  , email , password} = req.body
        if(!fullName  || !email || !password){
            return res.status(404).json({
                   message : "Something is missing" ,
                   success: false
            })
       }
       const user = await User.findOne({email})
       if(user){
           return res.status(404).json({
            message : "User already exist with this email" ,
            success: false
          })
       }
       if(password.length <= 6){
        return res.status(404).json({
         message : "Password can't be less then 6 cherecter" ,
         success: false
       })
    }
       if(!/[a-zA-z]/.test(password)){
           return res.status(404).json({
            message : "Password must have one letter" ,
            success: false
          })
       }
       if(!/[0-9]/.test(password)){
        return res.status(404).json({
         message : "Password must have one number" ,
         success: false
       })
    }
       const hashPassword = await bcrypt.hash(password , 10)
         await User.create({
            fullName ,
            email ,
            password: hashPassword
       })
       return res.status(201).json({
          message: "User registered successfully" ,
          success: true ,
       })
 } catch (error) {
        console.log(error)
        res.status(500).json({
            meesage : "Internal server error"
        })
    }
}





export const login = async (req , res)=>{
    try {
        const {email , password} = req.body
        if(!email || !password){
            return res.status(404).json({
                message : "Something is missing" ,
                success: false
         })
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
             message : "User not exist with this email!" ,
             success: false
           })
        }
        const currectPassword = await bcrypt.compare(password , user.password)
        if(!currectPassword){
            return res.status(404).json({
                message : "Password is incorrect!" ,
                success: false
              })
        }
        const safeUser = user.toObject()
        delete safeUser.password

        const token = await jwt.sign({userId: user._id} , process.env.JWT_SECRET_KEY , {expiresIn: "3d"})
        return res.status(200).cookie("token" , token , {
            maxAge: 3*24*60*60*1000,
            httpOnly: true ,
            sameSite : "strict" ,
        }).json({
            message : `Welcome back ${user.fullName}`,
            success: true ,
            user :safeUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            meesage : "Internal server error"
        })
    }
}


export const logout = async (req, res) => {
    try {
      res
        .status(200)
        .clearCookie("token", {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 0
        //   secure: process.env.NODE_ENV === "production", 
        })
        .json({
          success: true,
          message: "Logged out successfully",
        })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: "Internal server error",
      })
    }
  }
  



export const getUser = async (req, res)=>{
  try {
       const user = await User.findById(req.userId)
       if(!user){
          return res.status(404).json({
              message : "User not found!" ,
              success: false
          })
       }
       return res.status(200).json({
          message : "Thank You" ,
          success: true ,
          user
       })
  } catch (error) {
      console.log(error) 
      return res.status(500).json({
          message : "Internal server error" ,
          success: false
      })
  }
}





export const updateProfile = async (req, res) => {
  try {
    const { fullName } = req.body;
    const file = req.file;
    const user = await User.findById(req.userId);

    if (!user) return res.status(404).json({ message: "User not found", success: false });

    if (fullName) user.fullName = fullName;

    if (file) {
      if (user.profilePicture) {
        const publicId = user.profilePicture.split("/").pop().split(".")[0];
        await deletePhoto(publicId);
      }

      const uploaded = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(file.buffer).pipe(stream);
      });

      user.profilePicture = uploaded.secure_url;
    }

    await user.save();
    res.status(200).json({ message: "Profile Updated", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};