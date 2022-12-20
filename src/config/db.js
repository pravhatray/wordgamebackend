const mongoose=require("mongoose")

const connect=()=>{
    return mongoose.connect("mongodb+srv://pravhatray:pravhat@cluster0.owoykwh.mongodb.net/wordgame")
}

module.exports=connect