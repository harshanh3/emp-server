require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
require('./controllers/database/dbConnection')


const emServer = express()


emServer.use(cors())
emServer.use(express.json())
emServer.use(router)
emServer.use('/uploads',express.static('./uploads'))

const PORT = 3000 || process.env.PORT

emServer.listen(PORT,()=>{
    console.log(`emServer started `);
})
emServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:red;" >emServer started</h1>`)
})

