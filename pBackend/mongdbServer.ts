// import { Db, MongoClient } from "mongodb";

// let url = "mongodb://0.0.0.0:27525/profileDatabase";
// const client = new MongoClient(url);
// const databaseName = "newProfile";

// const createCon = async () => {



//   await client.connect();
//   console.log("DB CONNECTED SUCCESSFULLY");

//   const db = client.db(databaseName)

//   const usersCol = db.collection("users")
  
// return "DONE"

// };

// module.exports = createCon();

import mongoose from "mongoose";

const createCon = () => {

return mongoose
.connect(
  "mongodb://0.0.0.0:27525/profileDatabase"
)
.then((msg) => {
  console.log("Connected to database\n\n ");
})
.catch(() => {
  console.error("Error Connection database");
});

}

let db = createCon()

console.log(db);

module.exports = db
