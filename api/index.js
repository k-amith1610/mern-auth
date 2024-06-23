import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
dotenv.config();

const app = express();
app.use(express.json());


const port = process.env.port || 5000
const uri = process.env.MONGODB_URL;


app.use("/api/user", userRoute)
app.use("/api/auth", authRoute);

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