import { mongo, Schema,model, Model } from "mongoose";
import mongodbcon = require("../mongdbServer")

interface SocialLinks{
    
    twitter : String,
    instagram : String,
    github : String,
    linkedin:String
}

const SocialLinksSchema = new Schema<SocialLinks>({
    github:String,
    instagram:String,
    twitter:String,
    linkedin:String
})


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    body:{
        type: String,
        // required: true,
    },
    email:{
        type: String,
        required: true,
        unique:true,
    },
    phNumber:{
        type: String,
        required: true,
    },
    profileImgUrl:{
        type: String,
        // required: true,
    },
    backgroundImgUrl:{
        type: String,
        // required: true,
    },
    verified:{
        type:Boolean,
        // required: true,
    },
    socialLinks:{
        type: SocialLinksSchema,
        // required: true,
    },
    workHistory:{
        type:String,
        // required:true
    },
    password:{
        type:String,
        required:true
    }
    
});


module.exports = model("User",userSchema)
