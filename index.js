import cookieParser from "cookie-parser"
import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import connectDB from "./db/connectDB.js"


const app = express()

// middlewares
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: [
        "http://localhost:5173"
    ],
    credentials: true
}))


// default api
app.get("/" , (_ , res)=>{
    try {
        res.status(200).json({
            message : "Internal server error" ,
            success: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "Internal server error" ,
            success: false
        })
    }
})


// created apis






// server run
const PORT = process.env.PORT || 9000
const runServer = async ()=>{
    try {
        await connectDB()
        app.listen(PORT , ()=>{
       console.log(`Your server is runnig at http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}
runServer()