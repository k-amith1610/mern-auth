import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userName = await User.findOne({ username });
        if (userName) {
            return res.status(400).json({ message: "User Name already Exists" });
        }
        const userEmail = await User.findOne({ email });
        if (userEmail) {
            return res.status(400).json({ message: "Email Already Exists" });
        }

        const hashPassword = bcryptjs.hashSync(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashPassword,
        })
        await newUser.save();
        res.status(200).json({
            message: "User created Successfully",
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}