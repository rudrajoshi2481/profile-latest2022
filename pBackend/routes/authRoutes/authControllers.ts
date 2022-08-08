

import mongoose from "mongoose";
const User = require("../../schema/UserSchema");
import db = require("../../mongdbServer");
import { findUser } from "./authcunctions/findUserinDatabaseforLogin";
const jwt = require("jsonwebtoken");
import { createToken } from "../../jwtAuth";

const loginUser = (req: any, res: any) => {
  findUser(req.body).then(async (ress) => {
    console.log(ress,"LOGIN USER");
    
    if (ress[0].email) {
      let token = "";

      await createToken(ress[0].email).then((t) => {
        token = t;
      });
      let finaldata = ress[0] 
      res.send({ ...finaldata, token });
    } else {
      res.send({ ress: "user not Found" });
    }
  });
};

const DeleteUser = async (req: any, res: any) => {
  await User.deleteOne({
    email: req.body.email,
    password: req.body.password,
  })
    .then((r: any) => {
      res.send({ r, mssg: "DELETED" });
    })
    .catch((err: any) => {
      console.log(err);
      res.send({ err, mssg: "ERROR DELETING USER" });
    });
};

const CreateUser = async (req: any, res: any) => {
  User.create(req.body)
    .then(async (docs: any) => {
      createToken(docs._id).then((t) => {
        const filterdata = { ...docs, password: null };
        res.send({ mssg: "login User", infoDatabase: filterdata, token: t });
      });
    })
    .catch((e: any) => {
      res.send({ error: e });
    });

  // const UserMod = User(req.body);
  // // console.log("CREATE USER",req.body);

  // UserMod.save()
  //   .then(async (ress: any) => {
  //     createToken(ress._id).then((t) => {
  //       res.send({ mssg: "login User", infoDatabase: ress, token: t });
  //     });
  //   })
  //   .catch((e: any) => {

  //     res.send({ error: e });
  //   });
};

module.exports = { loginUser, CreateUser, DeleteUser };
