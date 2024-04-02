import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please Provide an Username'],
        unique:true
    },
    email:{
        type:String,
        required:[true,'Please Provide an email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please Provide an Password'],
        unique:true
    },
    idVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:{
        type:String
    },
    forgotPasswordTokenExpiry:{
        type:Date
    },
    verifyToken:{
        type:String
    },
    verifyTokenEpiry:{
        type:Date
    }
})

const User = mongoose.models.users || mongoose.model('users',userSchema)
export default User