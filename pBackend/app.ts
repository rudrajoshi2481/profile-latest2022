export {};
const express = require("express");
const app = express();
const cors = require("cors")
const fileUpload  = require("express-fileupload")

import { verifyToken } from "./jwtAuth";
import createConDB = require("./mongdbServer");
createConDB;



app.use(express.json());
app.use(cors())
app.use(fileUpload())

// RoutesFiles
const AuthRoute = require("./routes/authRoutes/authRoutes");
const InfoRoute = require("./routes/infoRoutes/infoRoute");

app.get("/ping", (req: any, res: any) => {
  res.status(200).send({});
});

app.use("/auth/",AuthRoute);

app.use("/info/",InfoRoute);

app.listen("5000", () => {
  console.log("Listning 5000");
});
