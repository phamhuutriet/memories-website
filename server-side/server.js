import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoute from "./routes/posts.js";

// APP config
dotenv.config(); // Get to access dotenv type file
const app = express(); // Set up the base of node to our app


// Middlewares
app.use(cors()); // Remember to put before using Routes
app.use(express.json({limit: '50mb'})); // Allow json file to pass through the middleware
app.use(express.urlencoded({limit: '50mb'})); // Set the limit of passing files
app.use('/posts', postRoute) // plug in the middleware to postRoute. 2nd argument -> the execution when reaching the endpoint



//Connect to DB
const connection_url = process.env.CONNECTION_URL;
const PORT = process.env.PORT;

mongoose
  .connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB")) // Signal that the DB has been connected
  .catch((err) => console.log(err)); 


// Listen to the server
app.listen(PORT, () => console.log("Connected to server")); 
