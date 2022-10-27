const express = require("express");
const User = require("../model/user");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken")
//router creation
// and. router is going to be a function and we want to use a functionality of authrouter

/*
for this is time it is used as private 
and we want to make it public so that in index can be used for
*/
const authRouter = express.Router();

/*
in case we was using for checking them 

authRouter.get('/user',(req,res)=>{
    res.json({msg:"wiron"})

})
*/

// for making used for our main entry point and it can be used anywhere in our application

/*
we need to create post req for client side so that we can sign up
*/
authRouter.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // then we can user user model here in auth.js we will use find one if it there it will return an existing usr and one thing you have to know
    // find one is a promise
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // niba umu user ari gukoresha same status code due to registr it not server error it client error
      /*
        dont forget to use return becouse if not using it will continue execute and if you use return it will return and give us message
        */
      return res
        .status(400)
        .json({ msg: "user with same email already exist" });
    }
    const hashedPassword = await bcryptjs.hash(password, 8);

    //salt is randon string
    // here i use let becouse of scope problem functionality
    let user = new User({
      email,
      password: hashedPassword,
      name,
    });
    user = await user.save();
    //making sure that we send data to the client side
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }

  //why everything in js is object kugez aho NaN (not an nbr) nayo ihinduka object
});
/*
    all thing we will be needed for the client now we are going to pass into the body
    becouse that all we need for making sign up email,password,name and whatever we are 
    passing in the body it going to be map
    and all thing to care about before doing anything 
    for really posting data in database what we have to care about but 
    we already know that firebase authentication handle everything for us
    */
//get data from the client
//post data in database
//return data from the user so that we can save those data
// sign in route
/*
jwt it gonna make us who we are like authenticating data suppose we need to get user data 
authenticated user can do that but we need to make sure that the user are say who they are we
will get help from jwt 
*/

authRouter.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "user with this email does not exit please" });
    }
    /*
   our passcode in real is wiron123
   but becouse we encrypty it became something else 
   so we will used hashed passcode in 
   */

    /*
   for this case we will use boolean cdtn for check both of them  if it true is going to give us true other wise false
  */
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
        return res
        .status(400)
        .json({ msg: "incorrect password try again" });
    }
   const token = jwt.sign({id:user._id},"passwordKey");
   res.json({token,...user._doc});
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
module.exports = authRouter;
