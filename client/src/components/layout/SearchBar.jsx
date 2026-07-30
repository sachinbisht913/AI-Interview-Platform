import { Search } from "lucide-react";
import { useSidebar } from "../../context/SidebarContext";
function SearchBar() {
  const { collapsed } = useSidebar();
  return (

    <div className="hidden md:flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 w-[420px]">

      <Search size={18} className="text-slate-400" />

      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent outline-none text-white placeholder:text-slate-500 w-full"
      />

    </div>
  );
}

export default SearchBar;