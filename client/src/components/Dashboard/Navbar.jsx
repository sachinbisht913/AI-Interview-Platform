import { FaBell, FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <header className="bg-slate-800 h-20 px-8 flex items-center justify-between border-b border-slate-700">

      <div>
        <h1 className="text-2xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-slate-400 text-sm">
          Welcome back 👋
        </p>
      </div>

      <div className="flex items-center gap-6">

        <button className="text-white text-xl hover:text-blue-400 transition">
          <FaBell />
        </button>

        <div className="flex items-center gap-3">

          <FaUserCircle className="text-4xl text-blue-400" />

          <div>
            <h3 className="text-white font-semibold">
              Sachin
            </h3>

            <p className="text-slate-400 text-sm">
              MCA Student
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;