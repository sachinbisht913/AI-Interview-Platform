// File: src/components/resume/SkillBadge.jsx

import { motion } from "framer-motion";

function SkillBadge({ skill }) {

    return (

        <motion.span
            whileHover={{
                scale: 1.08,
                y: -2,
            }}
            className="
                resume-skill-badge
                inline-flex
                max-w-full
                cursor-default
                items-center
                justify-center
                break-words
                rounded-full
                bg-gradient-to-r
                from-blue-600
                to-purple-600
                px-4
                py-2
                text-sm
                font-medium
                text-white
                shadow-lg

                sm:px-5
                sm:text-base
            "
        >
            {skill}
        </motion.span>

    );
}

export default SkillBadge;