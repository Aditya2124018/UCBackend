const express = require("express")
const app = express()
app.use(express.json())
require("dotenv").config()
const dbconnect = require("./config/dbconnect")
const {cloudinaryConnect} = require("./config/cloudinary")
const  route  = require("./routes/route")
const cors = require('cors')
const fileupload = require("express-fileupload")
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))
app.use(cors({
    origin: 'https://ucclone.netlify.app',
    credentials: true,
    methods: ['GET', 'POST','PUT','DELETE'],
    headers: ['Content-Type', 'Authorization']
  }));
app.listen(process.env.PORT,()=>{
    console.log("APP at http://localhost:"+process.env.PORT)
})

app.use("/api/v1",route)

dbconnect()
cloudinaryConnect()
