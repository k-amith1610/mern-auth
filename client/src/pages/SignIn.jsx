import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

const SignIn = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    // const [error, setError] = useState(false);
    // const [loading, setLoading] = useState(false);
    const { loading, error } = useSelector((state) => state.user);

    const validate = () => {
        const newErrors = {};
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
            // setError(validationErrors);
            dispatch(signInFailure(validationErrors));
            return;
        }

        dispatch(signInStart());
        try {
            const res = await axios.post("/api/auth/signin", formData);
            if (res.data) {
                console.log(res.data);
                alert("Sign In Successful");
                dispatch(signInSuccess(res.data));
                setTimeout(() => {
                    navigate("/");
                }, 2000)
                setTimeout(() => {
                    // window.location.reload();
                }, 3000);
                // setError(false);
            }
        } catch (error) {
            console.log(error);
            if (error.response) {
                setTimeout(() => {
                    alert(error.response.data.message);
                    // setError({ apiError: error.response.data.message ? error.response.data.message : "" });
                }, 0);
                if (error.response.data.message) {
                    dispatch(signInFailure({ apiError: error.response.data.message ? error.response.data.message : "" }));
                }
            } else {
                dispatch(signInFailure());
            }
        }
    }

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-white text-center font-semibold my-7 border border-red-500 max-w-36 mx-auto rounded-lg bg-black p-2 opacity-90 border-x-8 border-y-2">SignIn</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input onChange={handleChange} className="bg-slate-100 p-3 rounded-lg outline-none" type="email" placeholder='Email' id='email' />
                {error.email && <p className="text-red-500 font-bold text-sm">{error.email}</p>}
                <input onChange={handleChange} className="bg-slate-100 p-3 rounded-lg outline-none" type="password" placeholder='Password' id='password' />
                {error.password && <p className="text-red-500 font-bold text-sm">{error.password}</p>}
                <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90">{loading ? 'Loading...' : 'Sign In'}</button>
                <OAuth />
            </form>
            <div className="flex gap-2 mt-5">
                <p>Don't have an account?</p>
                <Link to="/sign-up"><span className="text-blue-500">Sign up</span></Link>
            </div>
            {error.apiError && <p className="text-red-500 font-bold">*{error.apiError}</p>}
        </div>
    )
}

export default SignIn
