import mongoose from "mongoose";

const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;