// File: src/components/common/PrimaryButton.jsx

import { motion } from "framer-motion";

function PrimaryButton({
    children,
    onClick,
    className = "",
}) {
    return (
        <motion.button
            whileHover={{
                scale: 1.03,
            }}
            whileTap={{
                scale: 0.97,
            }}
            onClick={onClick}
            className={`
                rounded-xl
                bg-gradient-to-r
                from-blue-600
                to-purple-600
                px-4
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-xl
                transition
                sm:px-6
                sm:py-3
                sm:text-base
                ${className}
            `}
        >
            {children}
        </motion.button>
    );
}

export default PrimaryButton;