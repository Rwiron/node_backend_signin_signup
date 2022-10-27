const mongoose = require("mongoose");
/*we dont need require express or anything becouse
we direclty creating a model here we are having no interaction
with express or node.js api only by following structure of our project

and schema it like basic structure of our application or the user model
then we will defined the application that are going to be used
Nb: we dont have to specify anything like string becouse js is not statically language it dynamically type language
we need name and specify it property that we will contain and the reason the name we are just passing (string) give the property String it becouse it for mongoose
not doiing this for js
for trim if the user enter like an example' wiron ' it will remove all emply spaces
*/

const userSchema = mongoose.Schema({
  name: {
    required:true,
    type:String,
    trim:true
  },
  email:{
    required:true,
    type:String,
    trim:true,
    validate: {
       validator: (value) =>{
       // we will use something like regix for validate and regex it a sequence of chr that specify a search pattern in text
       const re = 
       /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
       return value.match(re);
       },
       messge:'please enter a valid email',
    }
  },
  password:{
    required: true,
    type:String,
  },
  address: {
    type:String,
    default:'',
  },
  type : {
    type:String,
    // impamvu nuko i dont want everyone to become a admin 
    default:'user'
  }, 

});
 // below are the user schema not a model  it a structure
/*
    validate: {
       validator: (value) =>{
       return value.lengh >6;
       },
       messge:'please enter a long pscode',
    }
*/
 // for create user model 
 const User = mongoose.model('User',userSchema);
 module.exports = User;