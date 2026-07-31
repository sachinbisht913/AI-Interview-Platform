import { BrainCircuit } from "lucide-react";
import { useSidebar } from "../../context/SidebarContext";

function Logo() {
    const { collapsed } = useSidebar();

    return (
        <div
            className={`flex items-center px-4 h-14 transition-all duration-500 ease-in-out ${
                collapsed ? "justify-center" : "justify-start"
            }`}
        >
            {/* Logo Icon */}
            <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                <BrainCircuit size={22} className="text-white" />
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
                            ? "max-w-0 opacity-0 ml-0"
                            : "max-w-xs opacity-100 ml-3"
                    }
                `}
            >
                <h1 className="text-xl font-bold text-white">
                    AI Interview
                </h1>

                <p className="text-xs text-slate-400">
                    Career Platform
                </p>
            </div>
        </div>
    );
}

export default Logo;