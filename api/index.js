import express from "express"; // Importing the Express framework to create a web server

import dotenv from "dotenv"; // Importing the dotenv module for environment variable management

import mongoose from "mongoose"; // Importing the Mongoose library for MongoDB integration

import authRoute from './routes/auth.js'; // Importing the authentication route
import usersRoute from './routes/users.js'; // Importing the users route
import hotelsRoute from './routes/hotels.js'; // Importing the hotels route
import roomsRoute from './routes/rooms.js'; // Importing the rooms route

import cookieParser from "cookie-parser"; // Importing the cookie-parser middleware for parsing cookies

dotenv.config(); // Loading environment variables from a .env file

const app = express(); // Creating an instance of the Express application to handle HTTP requests and responses

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO); // Connecting to the MongoDB database using the MONGO environment variable
    console.log('Connected to Mongo db'); // Logging a message indicating a successful connection to the database
  } catch (error) {
    throw(error); // Throwing an error if there is a problem connecting to the database
  }
}

mongoose.connection.on('disconnected', () => {
  console.log('Mongo db disconnected'); // Logging a message when the connection to the MongoDB database is disconnected
})

//middlewares
app.use(cookieParser()); // Using the cookie-parser middleware for parsing cookies
app.use(express.json()); // Parsing incoming JSON data
app.use("/api/auth", authRoute); // Mounting the authentication route at /api/auth
app.use("/api/users", usersRoute); // Mounting the users route at /api/users
app.use("/api/hotels", hotelsRoute); // Mounting the hotels route at /api/hotels
app.use("/api/rooms", roomsRoute); // Mounting the rooms route at /api/rooms


app.use((err, req, res, next) => {
  const errStatus = err.status || 500; // Retrieving the error status code or defaulting to 500 (Internal Server Error)
  const errMessage = err.message || 'Something Went Wrong'; // Retrieving the error message or defaulting to 'Something Went Wrong'
  res.status(errStatus).json({ // Sending the error response with the appropriate status code, message, and error stack
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack
  })
})

app.listen(8800, () => {
  connect(); // Calling the connect function to establish a connection to the MongoDB database
  console.log('Connected To Backend!'); // Logging a message indicating that the backend server is running
})
