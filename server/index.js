//this part will be used for import
const express = require("express"); //  never mind similiar with import in flutter like import 'package/express/dart'
const authRouter = require("./routes/auth");

// it wont work we need to add something like middleware
/*
to understand concept of middleware we have example we have
our client which is let say it flutter and from client we are going to 
send data to server side and that server is going to return something and again to client 
client -> server -> client
*/

//this part will be used for other file

// middleware
// .use is how you use middleware
// the reason we use authRouter in our index or our node.js is becouse application know  abt the extinses of auth.js we have to create an
// object or map
const PORT = 1000;
const app = express();
const mongoose = require("mongoose");
const DB =
  "mongodb+srv://wiron:VBRMZ9Btdf6aYbc@cluster0.m93zoyb.mongodb.net/?retryWrites=true&w=majority";
app.use(express.json()) ; // for handling comming request
app.use(authRouter);
// creating a port
// for initialize
// making some connection and finally we will pass 'then 'function becouse this is like promise or fututre
/*
you can meet with the uri parameter uri must be String got undefined and undefined in javascript is 
assigned to any variiable or an aboject before using it and on connect () then after we will pass db into connect
we have not assign anything that why we was getting an error 
*/
mongoose
  .connect(DB)
  .then(() => {
    console.log("Database Connected Successfully ");
  })
  .catch((e) => {
    console.log(e);
  }); 
app.listen(PORT, "0.0.0.0", () => {
  console.log(`connected succefuly at port ${PORT} `);
});


/*
for the first time in database in cluster you 
connot see anydata we will create our own data 
dynamic by code

*/
