//imported from mongoose.js as here we will write only the schema and model code 
const mongoose = require('mongoose');


// User schema define kar rahe hain (yeh structure decide karega ki DB mein kya fields honge)
const userSchema = mongoose.Schema({
    first_name: { type: String, required: true }, // first_name compulsory hai
    last_name: { type: String },                  // last_name optional hai
    email: { type: String, required: true, unique: true }, // email compulsory + unique
    jobTitle: { type: String },                   // jobTitle optional hai
    gender: { type: String },                     // gender optional hai
  },
  { timestamps: true } // createdAt aur updatedAt automatically add ho jayenge
);
const User = mongoose.model("user", userSchema);
module.exports=User;