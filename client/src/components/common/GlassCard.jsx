import { motion } from "framer-motion";

function GlassCard({ children, className = "" }) {

    return (

        <motion.div

            whileHover={{
                y: -5,
                scale: 1.01,
            }}

            transition={{
                duration: .25
            }}

            className={`
                bg-slate-900/70
                backdrop-blur-xl
                border
                border-slate-700
                rounded-3xl
                shadow-2xl
                ${className}
            `}

        >

            {children}

        </motion.div>

    );

}

export default GlassCard;