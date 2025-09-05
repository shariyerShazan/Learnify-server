import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

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
        const token = await jwt.sign({userId: user._id} , process.env.JWT_SECRET_KEY , {expiresIn: "3d"})
        return res.status(200).cookie("token" , token , {
            maxAge: 3*24*60*60*1000,
            httpOnly: true ,
            sameSite : "strict" ,
        }).json({
            message : `Welcome back ${user.fullName}`,
            success: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            meesage : "Internal server error"
        })
    }
}