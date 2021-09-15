import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoute from "./routes/posts.js";

dotenv.config();

const app = express();

// APP config

// Middlewares
app.use(cors());
app.use(express.json())
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/posts', postRoute) // plug in the middleware to postRoute (analogy)



//Connect to DB
const connection_url = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5001;

mongoose
  .connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));


// Listen to the server
app.listen(PORT, () => console.log("Connected to server")); 
