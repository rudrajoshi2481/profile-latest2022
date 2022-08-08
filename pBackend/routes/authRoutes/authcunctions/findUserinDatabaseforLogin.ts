const UserSchema = require("../../../schema/UserSchema");

export const findUser =async (body: any) => {
  // console.log(body, "asd");
  let ret:any = []
 await UserSchema.find({ email: body.email  ,password:body.password})
    .exec()
    .then(async(ress: any) => {
      let filterData =await {...ress,password:null} 
      // console.log(filterData);
      
      ret = await filterData
    });

    return ret
};
