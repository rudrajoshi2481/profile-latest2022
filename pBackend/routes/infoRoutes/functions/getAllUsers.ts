const userSchema = require("../../../schema/UserSchema")


export const getAllUsers = (req:any,res:any) => {
    const userMod = userSchema.find().then((ress:any) => {
        res.json({msg:"GET ALL USER LIST",ress})
    }).catch((err:any) => {
        res.send(err)
    })
}

