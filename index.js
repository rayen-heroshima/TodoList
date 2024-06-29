const express = require("express");
const path = require("path");
const bodyParse =require("body-parser");
const connectionMongoose = require("./init/mongodb")
const todoroute = require("./routes/todo")
connectionMongoose()
//init app 
const app = express();
app.use(bodyParse.urlencoded({ extended: true }));
app.use(express.json());
app.use(todoroute)


//view engine 
app.set("view engine","ejs");

//add the css
app.use(express.static(path.join(__dirname,"public")));
//listen server
app.listen(8000,()=>{
    console.log("server is running on port 800")
});