import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    const userName = await User.findOne({ username });
    if (userName) {
        return res.status(401).json({ message: "Username already exists" });
    }

    const userEmail = await User.findOne({ email });
    if (userEmail) {
        return res.status(401).json({ message: "Email already exists" });
    }

    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashPassword,
    })
    try {
        await newUser.save();
        res.status(201).json({
            message: "User created Successfully",
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        })

    } catch (error) {
        console.log(error);
        next(error);
    }
}