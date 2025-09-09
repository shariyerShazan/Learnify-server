import mongoose from "mongoose";

const purchaseSchema = new  mongoose.Schema({
       courseId :{
          type : mongoose.Schema.Types.ObjectId ,
          ref : "Course",
          required: true
       } ,
       amount: {
          type: Number ,
          required: true
       },
       status: {
        type: String ,
        enum: ["Pending" , "Completed" , "Failed"],
        default: "Pending"
       } ,
       paymentId: {
          type: String ,
          required: true
       } ,
       purchaseBy: {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User",
        required: true
       }
} , {timestamps: true})

export const Purchase = mongoose.model("Purchase" , purchaseSchema)