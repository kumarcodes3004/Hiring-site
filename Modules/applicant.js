const mongoose = require("mongoose");
// const passportLocaslMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const applicantSchema = new Schema({
    name:{
        type:String,
        // required: true,e
    },
  email: {
    type: String,
    // required: true,
    unique: true,
  },
  location:{
    type:String,
    // required: tru,
  },
  jobtype:{
    type:String,
    enum:['frontend','backend','react','fullstack']
  },
  description:{
    type:String,
  }


});
//this will add on to our schema username and passsowrd field make sure that username are unique and not duplicate
// UserSchema.plugin(passportLocaslMongoose);

const Applicant =mongoose.model('Applicant',applicantSchema);
 module.exports=Applicant;