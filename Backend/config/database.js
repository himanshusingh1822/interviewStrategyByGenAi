const mongoose = require('mongoose'); 

const connectToDb = ()=>{
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected successfully ...")
    } catch (error) {
        console.log("Error while connecting mongoDB...." , error.message)
    }
}

module.exports = connectToDb ;