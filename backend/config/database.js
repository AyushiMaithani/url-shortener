const mongoose = require('mongoose');
const config=require('./config');

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(config.databaseURL);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch(error){
        console.error(`Connection Failed: ${error.message}`);
        process.exit();
    }
}

    module.exports=connectDB;