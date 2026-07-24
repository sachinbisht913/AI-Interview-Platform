import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaFileAlt,
  FaMicrophone,
  FaCode,
  FaChartBar,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout =()=>{
    dispatch(logout());
    navigate('/login');
  }
  return (
    <aside className="w-64 min-h-screen bg-slate-800 text-white p-6">

      <h1 className="text-2xl font-bold text-blue-400 mb-10">
        AI Interview
      </h1>

      <nav className="flex flex-col gap-2">

        <Link
        to="/dashboard"
          className="flex items-center gap-3 hover:bg-slate-700 px-4 py-3 rounded-lg transition"
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/resume"
          className="flex items-center gap-3 hover:bg-slate-700 px-4 py-3 rounded-lg transition"
        >
          <FaFileAlt />
          <span>Resume Analyzer</span>
        </Link>

        <Link
          to="/mock-interview"
          className="flex items-center gap-3 hover:bg-slate-700 px-4 py-3 rounded-lg transition"
        >
          <FaMicrophone />
          <span>Mock Interview</span>
        </Link>

        <Link
          to="/coding-round"
          className="flex items-center gap-3 hover:bg-slate-700 px-4 py-3 rounded-lg transition"
        >
          <FaCode />
          <span>Coding Round</span>
        </Link>

        <Link
          to="/analytics"
          className="flex items-center gap-3 hover:bg-slate-700 px-4 py-3 rounded-lg transition"
        >
          <FaChartBar />
          <span>Analytics</span>
        </Link>

        <Link
          to="/profile"
          className="flex items-center gap-3 hover:bg-slate-700 px-4 py-3 rounded-lg transition"
        >
          <FaUser />
          <span>Profile</span>
        </Link>

        <button onClick={handleLogout}
          className="mt-8 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 py-3 rounded-lg transition"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

      </nav>

    </aside>
  );
}

export default Sidebar;