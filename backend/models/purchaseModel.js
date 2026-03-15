import mongoose from "mongoose";

const PurchaseSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    courseId:{
        type:mongoose.Types.ObjectId,
       ref:"course"
    },
    courseTitle:{
        type:String,
    },
});

export const Purchase = mongoose.model("Purchase",PurchaseSchema);