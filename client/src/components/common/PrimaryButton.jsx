import { motion } from "framer-motion";

function PrimaryButton({

    children,

    onClick,

    className = "",

}) {

    return (

        <motion.button

            whileHover={{
                scale: 1.03
            }}

            whileTap={{
                scale: .97
            }}

            onClick={onClick}

            className={`
                bg-gradient-to-r
                from-blue-600
                to-purple-600
                text-white
                px-6
                py-3
                rounded-xl
                font-semibold
                shadow-xl
                ${className}
            `}

        >

            {children}

        </motion.button>

    );

}

export default PrimaryButton;