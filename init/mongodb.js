const mongoose = require("mongoose")
const conUrl = "mongodb://localhost:27017/tododb";
const connectionMongodb=async ()=>{
    try {
        await mongoose.connect(conUrl).then(console.log("connection is done "))
    } catch (error) {
        console.log(error.message)
        process.exit(1)
        
    }

}
module.exports=connectionMongodb