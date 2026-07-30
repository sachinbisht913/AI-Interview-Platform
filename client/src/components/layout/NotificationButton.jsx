import { Bell } from "lucide-react";

function NotificationButton() {

    return (

        <button className="relative w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-slate-700 transition">

            <Bell size={20} className="text-slate-300" />

            <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-blue-500"></span>

        </button>

    );

}

export default NotificationButton;