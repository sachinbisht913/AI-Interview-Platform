import { ArrowLeft, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function PageHeader({ title, subtitle }) {

    const navigate = useNavigate();

    return (

        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center mb-10"
        >

            <div>

                <h1 className="text-4xl font-bold text-white">

                    {title}

                </h1>

                <p className="text-slate-400 mt-2">

                    {subtitle}

                </p>

            </div>

            <div className="flex gap-4">

                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-5 py-3 rounded-xl text-white transition"
                >

                    <ArrowLeft size={18} />

                    Back

                </button>

                <button
                    onClick={() => navigate("/dashboard")}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl text-white transition"
                >

                    <LayoutDashboard size={18} />

                    Dashboard

                </button>

            </div>

        </motion.div>

    );

}

export default PageHeader;