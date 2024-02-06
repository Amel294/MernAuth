import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to MongoDB Atlas");
}).catch((err)=>console.log(err))
const app = express()


app.listen(PORT,()=>{
    console.log(`Server running at localhost http://localhost:${PORT}`)
})