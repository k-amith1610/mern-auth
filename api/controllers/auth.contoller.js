import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = newUser._doc;
        const expiryDate = new Date(Date.now() + 3600000);
        res.cookie("access_token", token, { httpOnly: true, expires: expiryDate }).status(201).json(rest);
        // res.status(201).json({
        //     message: "User created Successfully",
        //     user: {
        //         _id: newUser._id,
        //         username: newUser.username,
        //         email: newUser.email
        //     }
        // })

    } catch (error) {
        console.log(error);
        next(error);
    }
}


export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(401, "Invalid Email or Password"));

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "Invalid Email or Password"));
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: hashPassword, ...rest } = validUser._doc;
        const expiryDate = new Date(Date.now() + 3600000);
        res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(201).json(rest);
        // res.status(201).json({
        //     message: "Signin Successfull!!",
        //     user: {
        //         _id: validUser._id,
        //         username: validUser.username,
        //         email: validUser.email
        //     }
        // })

    } catch (error) {
        console.log(error);
        next(error);
    }
}


export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: hashedPassword, ...rest } = user._doc;
            const expiryDate = new Date(Date.now() + 3600000);
            res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(201).json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: req.body.name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 10000).toString(),
                email: req.body.email,
                password: hashPassword,
                profilePicture: req.body.photo,
            })
            await newUser.save();

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: hashedPassword, ...rest } = newUser._doc;
            const expiryDate = new Date(Date.now() + 3600000);
            res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(201).json(rest);
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}