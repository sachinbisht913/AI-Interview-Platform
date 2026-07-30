import { BrainCircuit } from "lucide-react";
import { useSidebar } from "../../context/SidebarContext";

function Logo() {

    const { collapsed } = useSidebar();

    return (

        <div className={`flex items-center ${collapsed ? "justify-center" : "gap-3"} px-4`}>

            <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 flex items-center justify-center">

                <BrainCircuit size={22} className="text-white" />

            </div>

            {

                !collapsed && (

                    <div>

                        <h1 className="text-xl font-bold text-white">

                            AI Interview

                        </h1>

                        <p className="text-xs text-slate-400">

                            Career Platform

                        </p>

                    </div>

                )

            }

        </div>

    );

}

export default Logo;