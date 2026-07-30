import SearchBar from "./SearchBar";
import NotificationButton from "./NotificationButton";
import UserMenu from "./UserMenu";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useSidebar } from "../../context/SidebarContext";

function TopNavbar() {
    const {
        collapsed,
        toggleSidebar,
    } = useSidebar();

    return (

        <header className="h-20 bg-slate-900 border-b border-slate-800 px-8 flex items-center justify-between">
           <button
    onClick={toggleSidebar}
    className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-slate-800 transition"
>
    {
        collapsed
            ? <PanelLeftOpen size={20} />
            : <PanelLeftClose size={20} />
    }
</button>
            <SearchBar />

            <div className="flex items-center gap-5">

                <NotificationButton />

                <UserMenu />

            </div>

        </header>

    );

}

export default TopNavbar;