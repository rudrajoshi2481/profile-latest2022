import { Schema } from "mongoose";

const jwt = require("jsonwebtoken");


const UserTokenSchema = new Schema({
  uid:{
    type:String,
    required:true,
  },
  token:{
    type:String,
    required:true,
  },
})

const secreteKey =
  "a6a2ee99f2852508cb305900ba4872b11edcabb88f7678e1513d3d3b07abc71052e61da9b15f67b9f0a8ab877aafd29c259a839995422e116fa3f206a0385179";

const refreshToken =
  "2de88a68a920e886a3e00ea9d53165075cf5a4bce2c324d0284749011d9a830dfcbb2c9534d1ac60c02ef221f2fca81b5c63dfa0ab6988cca093a2567464c98b";



const middleWare = () => {

}



export const createToken = async (uid:String) => {
    return await jwt.sign({uid},secreteKey);   
}


export const createRefresh = async (uid:String) => {
  return await jwt.sign({uid},refreshToken,{expiresIn:"1h"});   
}


export const verifyToken = async(req:any,res:any,next:any) => {

  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  console.log(req.headers);
  
  if(token == null) return res.sendStatus(401)

  await jwt.verify(token,secreteKey,(err:any,uid:any) => {
    if(err) {
      return res.send({s:"401",err}) 
    }

    
    next()

  })
  
  
}