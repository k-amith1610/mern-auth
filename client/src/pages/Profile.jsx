import React from 'react'
import { useSelector } from "react-redux";

const Profile = () => {
    const { currentUser } = useSelector((state) => state.user);
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-center text-2xl font-semibold my-6"><span className="border p-2 border-red-500 bg-slate-800 text-white border-y-[2px] border-x-[9px] rounded-full">_Profile_</span></h1>
            <form className="flex flex-col gap-4">
                <img src={currentUser.profilePicture} className="w-28 border-red-500 border-y-4 border-x-4 rounded-full self-center cursor-pointer" alt="" />
                <input  defaultValue={currentUser.username} type="text" id="username" placeholder="Username" className="outline-none bg-slate-100 rounded-lg p-3 text-lg font-semibold" />
                <input defaultValue={currentUser.email} type="email" id="email" placeholder="Email" className="outline-none bg-slate-100 rounded-lg p-3 text-lg" />
                <input type="password" id="password" placeholder="Password" className="outline-none bg-slate-100 rounded-lg p-3 text-lg" />
                <button className="uppercase font-bold border bg-slate-700 text-white rounded-lg p-3 hover:bg-opacity-95">update</button>
            </form>
            <div className="flex justify-between mt-3"> 
                <span className="border p-2 rounded-lg border-slate-600 border-y-4 border-x-4 hover:opacity-90 cursor-pointer bg-red-400 font-semibold">Delete Account</span>
                <span className="border p-2 rounded-lg border-slate-600 border-y-4 border-x-4 hover:opacity-90 cursor-pointer bg-green-400 font-semibold">Sign out</span>
            </div>
        </div>
    )
}

export default Profile
