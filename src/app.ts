import express from 'express'
import dotenv from 'dotenv'
import userRouter from './router/user'
import datbase = require('./Database/db')
import mysql from 'mysql2'
// console.log(datbase)
// import cloudinary from 'cloudinary'
dotenv.config()

const app = express()

app.use(express.json())

app.use("/User", userRouter)
app.listen(3001,()=>{
    console.log(`Listing on port ${process.env.PORT}`)
})
