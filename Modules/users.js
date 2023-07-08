const mongoose = require("mongoose");
// const passportLocaslMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    // required: true,
    unique: true,
  },
  password:{
    type:String,
    required: true,
  }
});
//this will add on to our schema username and passsowrd field make sure that username are unique and not duplicate
// UserSchema.plugin(passportLocaslMongoose);

module.exports = mongoose.model("User", UserSchema);
