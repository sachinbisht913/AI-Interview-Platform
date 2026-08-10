// File: src/components/layout/Logo.jsx

import { BrainCircuit } from "lucide-react";
import { useSidebar } from "../../context/SidebarContext";

function Logo() {

    const { collapsed } = useSidebar();


    return (

        <div
            className={`
                flex
                h-14
                items-center
                px-4

                transition-all
                duration-500
                ease-in-out

                ${
                    collapsed
                        ? "justify-center"
                        : "justify-start"
                }
            `}
        >

            {/* Logo Icon */}

            <div
                className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-gradient-to-r
                    from-blue-500
                    to-violet-600
                "
            >

                <BrainCircuit
                    size={22}
                    className="text-white"
                />

            </div>


            {/* Logo Text */}

            <div
                className={`
                    overflow-hidden
                    whitespace-nowrap

                    transition-all
                    duration-500
                    ease-in-out

                    ${
                        collapsed
                            ? "ml-0 max-w-0 opacity-0"
                            : "ml-3 max-w-xs opacity-100"
                    }
                `}
            >

                <h1
                    className="
                        text-xl
                        font-bold
                        text-slate-400
                        light:text-slate-600
                        
                    
                    "
                >
                    AI Interview
                </h1>


                <p
                    className="
                        text-xs
                        text-slate-400
                        light:text-slate-600
                    "
                >
                    Career Platform
                </p>

            </div>

        </div>

    );

}

export default Logo;