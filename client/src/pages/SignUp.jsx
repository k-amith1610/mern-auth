import { useState } from "react";
import { Link } from "react-router-dom";    
import axios from "axios";
import { Navigate } from "react-router-dom";
const SignUp = () => {

    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5001/api/auth/signup", formData)
        .then((res) => {
            console.log(res);
            if(res.data) {
                alert("Sign Up Successfull");
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        }).catch((error) => {
            console.log(error);
            if(error.response) {
                alert(error.response.data.message);
            }
        })
    }

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-white text-center font-semibold my-7 border border-red-500 max-w-36 mx-auto rounded-lg bg-black p-2 opacity-90 border-x-8 border-y-2">Signup</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input onChange={handleChange} className="bg-slate-100 p-3 rounded-lg outline-none" type="text" placeholder='Username' id='username' />
                <input onChange={handleChange} className="bg-slate-100 p-3 rounded-lg outline-none" type="email" placeholder='Email' id='email' />
                <input onChange={handleChange} className="bg-slate-100 p-3 rounded-lg outline-none" type="password" placeholder='Password' id='password' />
                <button onChange={handleChange} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90">Sign up</button>
            </form>
            <div className="flex gap-2 mt-5">
                <p>Have an account?</p>
                <Link to="/sign-in"><span className="text-blue-500">Sign in</span></Link>
            </div>
        </div>
    )
}

export default SignUp
