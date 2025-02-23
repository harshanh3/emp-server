const users = require('../models/userModel')
const jwt = require('jsonwebtoken')
// reqister 
exports.registerController = async (req,res) => {
    console.log("inside reqister ");
    console.log(req.body);
    const { username, email, password } = req.body
    try {
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("Already existingUser please login!!!")

        }else{
            const newUser = new users({
                username,email,password,profilepik:""
            })
            await newUser.save()
            res.status(200).json(newUser)

        }
    } catch (err) {
        res.status(401).json(err)
    }


    res.status(200).json("Register request recived")
}

// login
exports.loginController = async (req,res)=>{
    console.log(" inside loginController");
    const {email,password} = req.body
    console.log(email,password);
    try{
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            // token generation
            const token = jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)
            res.status(200).json({user:existingUser,token})
        }else{
            res.status(404).json("incorrect Email / Password")
        }
    }catch(err){
        res.status(401).json(err)
    }  
}