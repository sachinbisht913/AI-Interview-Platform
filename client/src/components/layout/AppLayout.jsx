import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function AppLayout({ children }) {

    return (

        <div className="min-h-screen bg-slate-950">

            <Navbar />

            <div className="flex">

                <Sidebar />

                <main className="flex-1 p-10 overflow-auto">

                    {children}

                </main>

            </div>

        </div>

    );

}

export default AppLayout;