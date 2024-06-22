import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
dotenv.config();

const app = express();
const port = process.env.port || 5000
const uri = process.env.MONGODB_URL;

const start = () => {
    try {
        connectDB(uri);
        app.listen(port, () => {
            console.log(`running on http://localhost:${port}`);

        })
    } catch (error) {
        console.log(error);
    }
}

start();