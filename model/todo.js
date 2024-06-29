const mongoose = require("mongoose")
// define the schema 
const todoSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true,  
    },
    desc : String
},{timestamps:true});
const todo =mongoose.model("todo",todoSchema);
module.exports=todo