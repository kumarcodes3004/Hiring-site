const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const Applicant =require('./Modules/applicant');
const User =require('./Modules/users');
const app = express();
var bodyParser = require("body-parser");
const bcrypt =require("bcrypt");

mongoose.connect("mongodb://localhost:27017/frontend-assign", {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("database connected");
});
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("vews", path.join(__dirname, "views"));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
    res.send("hello");
  });


  
app.get("/Home", async (req, res) => {
    res.render("pages/Home");
  });

  app.get("/Login", async (req, res) => {
    res.render("pages/Login");
  });

  
  app.get("/Newapplicant", async (req, res) => {
    res.render("pages/Newapplicant");
  });

app.post("/applicant",async(req,res)=>{
    const newApplicant =new Applicant(req.body);
    await newApplicant.save();
    console.log(newApplicant);
    res.render("pages/Home");
})

app.get("/register",async(req,res)=>{
    res.render("pages/register");
})
// app.get("/search",async(req,res)=>{
//     res.render("pages/search");
// })
// app.get("/show",async(req,res)=>{
//     res.render("pages/show");
// })
app.post("/register",async(req,res)=>{
    const {email ,password}=req.body;
    const hash =await bcrypt.hash(password,12);
    const user =new User({
        email,
        password:hash
    })
    await user.save();
    res.render("pages/Home");
})
app.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const email1= await User.findOne({email});
    const validPassword =await bcrypt.compare(password,email1.password);
    if(validPassword){
        // res.send("worked");
        res.render("pages/search");
    }else{
        // alert("TRY AGAIN WRONG CREDENTIALS");
        // res.status(500);
        res.render("pages/Login");
    }
})


app.post("/search",async(req,res)=>{
    // const d1=await Applicant.findById(req.params.key);
        const {applicant} =req.body;
        console.log(applicant);
        const d1 =await Applicant.find(
            {
                "$or":[
                    {"jobtype":applicant}
                ]
            }
        )
        // console.log(req.params.key);
        console.log(d1);
        // const id= <%=d1._id%>;
        // console.log(id);
        res.render("pages/show",{d1});
})
  app.listen(3000, () => {
    console.log("serving on port 3000", );
  });
  