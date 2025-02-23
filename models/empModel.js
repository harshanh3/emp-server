const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    id:{
        type:Number,
        required:true,
        unique:true
    },
     postion:{
        type:String,
        required:true
     },
      department:{
        type:String,
        required:true
      },
       salary:{
        type:Number,
        required:true
       },
        empImg:{
            type:String,
            required:true
        },
        userId:{
            type:String,
            required:true
        } 

})

const employees = mongoose.model("employees",employeeSchema)
module.exports = employees



