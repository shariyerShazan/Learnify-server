import { User } from "../models/user.model"
import bcrypt from "bcryptjs"
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
       const newUser = await User.create({
            fullName ,
            email ,
            password: hashPassword
       })
       return res.status(200).json({
          message: "User registered successfully" ,
          success: true ,
          newUser
       })
 } catch (error) {
        console.log(error)
        res.status(500).json({
            meesage : "Internal server error"
        })
    }
}