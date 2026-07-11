import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout() {
    return (
        <div className="flex h-screen bg-slate-100">

            <Sidebar />

            <div className="flex flex-col flex-1">

                <Navbar />

                <main className="overflow-y-auto p-6 flex-1">

                    <Outlet />

                </main>

            </div>

        </div>
    );
}