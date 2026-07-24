import { motion } from "framer-motion";

function SkillBadge({ skill }) {

    return (

        <motion.span
            whileHover={{
                scale: 1.08,
                y: -2,
            }}
            className="
                px-5
                py-2
                rounded-full
                bg-gradient-to-r
                from-blue-600
                to-purple-600
                text-white
                font-medium
                shadow-lg
                cursor-default
            "
        >
            {skill}
        </motion.span>

    );

}

export default SkillBadge;