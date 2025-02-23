const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log("inside jwtMiddleware");
    const token = req.headers["authorization"].split(" ")[1]
    console.log(token);

    
        if(token){
           try {
      const jwtresponce = jwt.verify(token,process.env.JWTPASSWORD)
      console.log(jwtresponce);
      req.userId = jwtresponce.userId
      next()
    }catch(err){
        res.status(401).json("authorization failed ..please login")
    }
      
    }else{
        res.status(404).json("authorization failed .. token is missing")
    }
    
    
}

module.exports = jwtMiddleware