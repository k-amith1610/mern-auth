import React from 'react'
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import {signInSuccess} from "../redux/user/userSlice"

const OAuth = () => {
    
    const dispatch = useDispatch();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const res = await fetch("/api/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            })
            const data = await res.json();
            dispatch(signInSuccess(data));
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <button type='button' onClick={handleGoogleClick} className="border flex justify-center items-center gap-4 rounded-lg p-2 uppercase font-semibold bg-gradient-to-r hover:bg-gradient-to-tr from-blue-400 to-red-400 text-[17px]">Continue with Google <FaGoogle className="rounded-full p-1 text-3xl bg-gradient-to-tr from-red-500 to-blue-500" /></button>
    )
}

export default OAuth
