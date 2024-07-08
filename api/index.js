import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
dotenv.config();

const __dirname = path.resolve();
const app = express();

app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
}); 


app.use(express.json());
app.use(cookieParser());
app.use(cors());


const port = process.env.port || 5000
const uri = process.env.MONGODB_URL;


app.use("/api/user", userRoute)
app.use("/api/auth", authRoute);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
})

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