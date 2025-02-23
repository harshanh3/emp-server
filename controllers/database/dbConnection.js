const mongoose = require('mongoose')

const connectionString = process.env.DBCONNECTIONSTRING

mongoose.connect(connectionString).then(res=>{
    console.log("Connected to MongoDB")
}).catch(err=>{
    console.log("connection fail");
    console.log(err);
    
    
})