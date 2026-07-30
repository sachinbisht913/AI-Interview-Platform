import { motion } from "framer-motion";

function StatCard({ title, value }) {

    return (

        <motion.div

            initial={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}

            className="bg-slate-900 border border-slate-800 rounded-3xl p-8"

        >

            <h3 className="text-slate-400">

                {title}

            </h3>

            <h2 className="text-5xl font-bold text-white mt-4">

                {value}

            </h2>

        </motion.div>

    );

}

export default StatCard;