import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
dotenv.config();
const app = express()

app.use(express.json())

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to MongoDB Atlas");
}).catch((err)=>console.log(err))

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)

app.listen(PORT,()=>{
    console.log(`Server running at localhost http://localhost:${PORT}`)
})

