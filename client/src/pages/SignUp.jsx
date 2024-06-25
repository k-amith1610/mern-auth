import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const SignUp = () => {

    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);


    const validate = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = "*Username is required";
        if (!formData.email) newErrors.email = "*Email is required";
        if (!formData.password) newErrors.password = "*Password is required";
        return newErrors;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setError(validationErrors);
            return;
        }
        await axios.post("/api/auth/signup", formData)
            .then((res) => {
                setLoading(true);
                console.log(res);
                if (res.data) {
                    alert("Sign Up Successfull");
                    setLoading(false);
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                    setError(false);
                }
            }).catch((error) => {
                setLoading(true);
                console.log(error);
                if (error.response) {
                    setTimeout(() => {
                        setLoading(false);
                        alert(error.response.data.message);
                        setError({ apiError: error.response.data.message ? error.response.data.message : "" });
                    }, 3000);
                }
            })
    }

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-white text-center font-semibold my-7 border border-red-500 max-w-36 mx-auto rounded-lg bg-black p-2 opacity-90 border-x-8 border-y-2">Signup</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input onChange={handleChange} className="bg-slate-100 p-3 rounded-lg outline-none" type="text" placeholder='Username' id='username' />
                {error.username && <p className="text-red-500 font-bold text-sm">{error.username}</p>}
                <input onChange={handleChange} className="bg-slate-100 p-3 rounded-lg outline-none" type="email" placeholder='Email' id='email' />
                {error.email && <p className="text-red-500 font-bold text-sm">{error.email}</p>}
                <input onChange={handleChange} className="bg-slate-100 p-3 rounded-lg outline-none" type="password" placeholder='Password' id='password' />
                {error.password && <p className="text-red-500 font-bold text-sm">{error.password}</p>}
                <button onChange={handleChange} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90">{loading ? 'Loading...' : 'Sign up'}</button>
            </form>
            <div className="flex gap-2 mt-5">
                <p>Have an account?</p>
                <Link to="/sign-in"><span className="text-blue-500">Sign in</span></Link>
            </div>
            {error.apiError && <p className="text-red-500 font-bold">*{error.apiError}</p>}
        </div>
    )
}

export default SignUp
