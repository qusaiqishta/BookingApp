import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';

dotenv.config();

const app=express();
const connect= async ()=>{
try {
    await mongoose.connect(process.env.MONGO);
    console.log('Connected to Mongo db')
  } catch (error) {
    throw(error);
  }
}
mongoose.connection.on('disconnected',()=>{
    console.log('Mongo db disconnected')
})

//middlewares
app.use(express.json())
app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/rooms",roomsRoute);
app.use((err,req,res,next)=>{
  const errStatus=err.status || 500;
  const errMessage=err.message || 'Something Went Wrong';
  res.status(errStatus).json({
    success:false,
    status:errStatus,
    message:errMessage,
    stack:err.stack
  })
})

app.listen(8800,()=>{
    connect();
    console.log('Connected To Backend!');
})