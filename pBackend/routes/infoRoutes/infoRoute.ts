"use strict"
// import { Express as express} from "express"; 
import Express from "express"
import { verifyToken } from "../../jwtAuth"
import { ImagesUpload } from "./functions/photosUpload"

const Router  = Express.Router()
const {getAllUsers} = require("./functions/getAllUsers")

// Router.post("/updateinfo",verifyToken,(req:any,res:any)=>{
    
// })
Router.post("/updateinfo",ImagesUpload)


// only after reciving the berearer token
Router.get("/getallusers",verifyToken,getAllUsers)


module.exports = Router