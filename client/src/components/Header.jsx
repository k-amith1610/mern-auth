import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const Header = () => {

    const { currentUser } = useSelector((state) => state.user);

    return (
        <div className="bg-slate-400">
            <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
                <Link to="/"><h1 className="font-bold flex gap-2 justify-center items-center">Auth App <span className="border-red-500 rounded-full font-bold text-lg bg-slate-900 text-red-500 border-x-4">_A_</span></h1></Link>
                <ul className="flex justify-center items-center gap-5 font-semibold">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/profile">
                        {currentUser ? <img src={currentUser.profilePicture} className="w-[40px] h-[40px] rounded-full" alt="" /> : <li>Sign In</li>}
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default Header
