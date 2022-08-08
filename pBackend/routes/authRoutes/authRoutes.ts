// const express = require("express")

// const Router = express.Router()

import Express from "express"
import { verifyToken } from "../../jwtAuth"
// import { deleteModel } from "mongoose"
const Router = Express.Router()

const {CreateUser,loginUser,DeleteUser,getAllUsers}  = require("./authControllers")

Router.get("/",(req:any,res:any) => {
    res.send("Working")
})

Router.post("/createuser",CreateUser)

Router.post("/loginuser",loginUser)
Router.delete("/deleteuser",verifyToken,DeleteUser)








module.exports = Router