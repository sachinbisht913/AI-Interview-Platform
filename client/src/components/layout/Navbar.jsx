import { Link, useNavigate } from "react-router-dom";
import { BrainCircuit, LogOut, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.clear();

        navigate("/login");

    };

    return (

        <motion.nav

            initial={{ y: -60 }}

            animate={{ y: 0 }}

            className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800"

        >

            <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

                <Link
                    to="/dashboard"
                    className="flex items-center gap-3"
                >

                    <BrainCircuit
                        className="text-blue-500"
                        size={32}
                    />

                    <h1 className="text-white text-2xl font-bold">

                        AI Interview

                    </h1>

                </Link>

                <div className="flex gap-4">

                    <Link
                        to="/dashboard"
                        className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-5 py-2 rounded-xl text-white transition"
                    >

                        <LayoutDashboard size={18} />

                        Dashboard

                    </Link>

                    <button

                        onClick={logout}

                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl text-white transition"

                    >

                        <LogOut size={18} />

                        Logout

                    </button>

                </div>

            </div>

        </motion.nav>

    );

}

export default Navbar;