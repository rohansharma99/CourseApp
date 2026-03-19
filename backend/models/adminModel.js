import mongoose from "mongoose";

const AdminSchema=new mongoose.Schema({
    firstName:{
        type:String,    
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        select:false,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
});
export const Admin=mongoose.model("Admin",AdminSchema)





