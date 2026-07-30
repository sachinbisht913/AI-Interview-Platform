import { ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";

function UserMenu() {

    const { user } = useSelector((state) => state.auth);

    return (

        <button

            className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-2xl px-3 py-2 hover:bg-slate-800 transition"

        >

            <div

                className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold"

            >

                {

                    user?.fullName

                        ? user.fullName.charAt(0).toUpperCase()

                        : "U"

                }

            </div>

            <div className="text-left">

                <h3 className="text-white font-semibold">

                    {user?.fullName || "User"}

                </h3>

                <p className="text-xs text-slate-400">

                    Welcome Back

                </p>

            </div>

            <ChevronDown

                size={18}

                className="text-slate-400"

            />

        </button>

    );

}

export default UserMenu;