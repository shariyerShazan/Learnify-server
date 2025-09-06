import jwt from "jsonwebtoken"
import { User } from "../models/user.model"

export const isAuthenticated = async (req , res , next)=>{
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(400).json({
                message : "User not authenticated!" ,
                success: false
            })
        }
        const decode = jwt.verify(token , process.env.JWT_SECRET_KEY)
        if(!decode){
            return res.status(401).json({
                message : "Invalid token" ,
                success: false
            })
        }
        req.userId = decode.userId
        next()
    } catch (error) {
        console.log(error) 
        return res.status(500).json({
            message : "Internal server error" ,
            success: false
        })
    }
}


