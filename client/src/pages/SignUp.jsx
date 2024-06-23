import { Link } from "react-router-dom";

const SignUp = () => {
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-white text-center font-semibold my-7 border border-red-500 max-w-36 mx-auto rounded-lg bg-black p-2 opacity-90 border-x-8 border-y-2">Signup</h1>
            <form className="flex flex-col gap-4">
                <input className="bg-slate-100 p-3 rounded-lg outline-none" type="text" placeholder='Username' id='username' />
                <input className="bg-slate-100 p-3 rounded-lg outline-none" type="email" placeholder='Email' id='email' />
                <input className="bg-slate-100 p-3 rounded-lg outline-none" type="password" placeholder='Password' id='password' />
                <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90">Sign up</button>
            </form>
            <div className="flex gap-2 mt-5">
                <p>Have an account?</p>
                <Link to="/sign-in"><span className="text-blue-500">Sign in</span></Link>
            </div>
        </div>
    )
}

export default SignUp
