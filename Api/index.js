import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express()
app.use(cors())
app.use(cookieParser());

app.use(express.json())

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to MongoDB Atlas");
}).catch((err)=>console.log(err))

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message||"Internal Server Error";
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode,
    })
})
app.listen(PORT,()=>{
    console.log(`Server running at localhost http://localhost:${PORT}`)
})

