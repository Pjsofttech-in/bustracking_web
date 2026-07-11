import { NavLink } from "react-router-dom";
import {
    FaHome,
    FaBuilding,
    FaBus,
    FaUsers,
    FaRoute,
    FaMapMarkedAlt
} from "react-icons/fa";

const menus = [
    {
        name: "Dashboard",
        path: "/",
        icon: <FaHome />
    },
    {
        name: "Service Providers",
        path: "/service-provider",
        icon: <FaBuilding />
    },
    {
        name: "Drivers",
        path: "/drivers",
        icon: <FaUsers />
    },
    {
        name: "Vehicles",
        path: "/vehicles",
        icon: <FaBus />
    },
    {
        name: "Routes",
        path: "/routes",
        icon: <FaRoute />
    },
    {
        name: "Tracking",
        path: "/tracking",
        icon: <FaMapMarkedAlt />
    }
];

export default function Sidebar() {
    return (
        <aside className="w-64 bg-slate-900 text-white">

            <div className="text-center text-2xl font-bold py-6 border-b border-slate-700">

                BUS TRACKING

            </div>

            <nav className="mt-4">

                {menus.map((menu) => (
                    <NavLink
                        key={menu.name}
                        to={menu.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-6 py-3 hover:bg-slate-700 ${isActive ? "bg-blue-600" : ""
                            }`
                        }
                    >
                        {menu.icon}

                        {menu.name}

                    </NavLink>
                ))}

            </nav>

        </aside>
    );
}