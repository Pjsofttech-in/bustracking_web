// Sidebar.jsx - Alternative with NavLink
import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

function Sidebar({ onClose }) {
    const location = useLocation();
    const [openDropdowns, setOpenDropdowns] = useState({
        students: true, // Initially open
        drivers: false,
        buses: false
    });

    const toggleDropdown = (key) => {
        setOpenDropdowns(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    // Check if any child path is active
    const hasActiveChild = (items) => {
        return items.some(item => location.pathname === item.path);
    };

    const navItems = [
        { id: 'dashboard', icon: 'fa-chart-pie', label: 'DASHBOARD', path: '/dashboard' },
        { id: 'signin', icon: 'fa-user-plus', label: 'SIGNIN', path: '/signin' },
        { id: 'academic-years', icon: 'fa-calendar-alt', label: 'ACADEMIC YEAR', path: '/academic-years' },
       {
            id: 'student',
            icon: 'fa-users',
            label: 'STUDENTS',
            badge: '186',
            dropdown: true,
            dropdownKey: 'student',
            items: [
                 { id: 'student', label: 'StudentDetail', path: '/student' },
                { id: 'studentsignup', label: 'Registration', path: '/studentsignup' },
                { id: 'studentfee', label: 'Fee Payment', path: '/studentfee' },
                { id: 'scan', label: 'Scan', path: '/scan' },
                { id: 'class', label: 'Class', path: '/class' },
                { id: 'medium', label: 'Medium', path: '/medium' },
            ]
        },

        {
            id: 'drivers',
            icon: 'fa-user-tie',
            label: 'DRIVERS',
            badge: '1',
            dropdown: true,
            dropdownKey: 'drivers',
            items: [
                { id: 'driver', label: 'Driver', path: '/driver' },
                { id: 'conductor', label: 'conductor', path: '/conductor' },
                { id: 'division', label: 'Division', path: '/division' },

            ]
        },
         
        {
            id: 'buses',
            icon: 'fa-bus',
            label: 'BUSES',
            badge: '4',
            dropdown: true,
            dropdownKey: 'buses',
            items: [
                { id: 'bus', label: 'Buses', path: '/bus' },
                { id: 'bbusroutes', label: 'Bus Routes', path: '/busroutes' },
                { id: 'busstop', label: 'Bus Stops', path: '/busstop' },
                { id: 'bustrip', label: 'Bus Trips', path: '/bustrip' },
                { id: 'bussupplier', label: 'Bus Suppliers', path: '/bussupplier' },
                { id: 'serviceprovider', label: 'Service Provider', path: '/serviceprovider' },

            ]
        },
        // { id: 'routes', icon: 'fa-route', label: 'Routes', badge: '12', path: '/busroutes' },
        // { id: 'bus-stops', icon: 'fa-map-pin', label: 'Bus Stops', path: '/busstop' },
        // { id: 'suppliers', icon: 'fa-truck', label: 'Suppliers', path: '/bussupplier' },
        // { id: 'bus-trips', icon: 'fa-route', label: 'Bus Trips', badge: '28', path: '/bustrip' },

        // { id: 'conductors', icon: 'fa-user-cog', label: 'Conductors', path: '/conductor' },
        // { id: 'divisions', icon: 'fa-school', label: 'Divisions', path: '/division' },
        // { id: 'medium', icon: 'fa-language', label: 'Medium', path: '/medium' },
        // { id: 'fee-payments', icon: 'fa-credit-card', label: 'Fee Payments', path: '/studentfee' },
        // { id: 'scans', icon: 'fa-qrcode', label: 'Scans', path: '/scans' },
        // { id: 'studentsignup', icon: 'fa-user-plus', label: 'Register Student', path: '/studentsignup' },

    ];

    return (
        <aside className="w-full h-full flex flex-col">
            {/* Close button for mobile */}
            <div className="lg:hidden flex items-center justify-between p-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-xl flex items-center justify-center text-lg">
                        <i className="fas fa-bus"></i>
                    </div>
                    <span className="text-lg font-bold text-slate-800">BusTracking</span>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                    <i className="fas fa-times text-slate-600"></i>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 lg:p-6">
                {/* Brand */}
                <div className="hidden lg:flex items-center gap-3 mb-6 pl-1">
                    <div className="bg-blue-600 text-white w-11 h-11 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-blue-600/20">
                        <i className="fas fa-bus"></i>
                    </div>
                    <span className="text-2xl font-bold sidebar-brand-gradient tracking-tight">BusTracking</span>
                </div>

                <nav className="flex flex-col gap-0.5">
                    <div className="text-[0.65rem] font-semibold text-slate-400 uppercase tracking-wider ml-2.5 mt-1 mb-2">Main</div>

                    {navItems.map((item) => {
                        // Render dropdown items
                        if (item.dropdown) {
                            const isOpen = openDropdowns[item.dropdownKey];
                            const hasActive = hasActiveChild(item.items);

                            return (
                                <div key={item.id} className="mb-1">
                                    <button
                                        onClick={() => toggleDropdown(item.dropdownKey)}
                                        className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-sm font-medium transition-colors ${hasActive
                                            ? 'nav-item-active'
                                            : 'text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        <i className={`fas ${item.icon} w-5 ${hasActive ? 'text-blue-600' : 'text-slate-500'}`}></i>
                                        <span className="flex-1 text-left">{item.label}</span>
                                        {item.badge && (
                                            <span className={`text-[0.6rem] font-semibold px-2 py-0.5 rounded-full ${hasActive ? 'bg-blue-100 text-blue-800' : 'bg-blue-50 text-blue-800'
                                                }`}>
                                                {item.badge}
                                            </span>
                                        )}
                                        <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} text-xs text-slate-400 transition-transform duration-200`}></i>
                                    </button>

                                    {/* Dropdown items with animation */}
                                    <div className={`overflow-hidden transition-all duration-200 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-slate-200 pl-3">
                                            {item.items.map((subItem) => (
                                                <NavLink
                                                    key={subItem.id}
                                                    to={subItem.path}
                                                    onClick={() => {
                                                        onClose();
                                                        // Keep dropdown open
                                                    }}
                                                    className={({ isActive }) => `
                                                        flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors
                                                        ${isActive
                                                            ? 'bg-blue-50 text-blue-700'
                                                            : 'text-slate-600 hover:bg-slate-50'
                                                        }
                                                    `}
                                                >
                                                    {({ isActive }) => (
                                                        <>
                                                            <i className={`fas fa-circle text-[0.4rem] ${isActive ? 'text-blue-600' : 'text-slate-300'}`}></i>
                                                            <span>{subItem.label}</span>
                                                            {isActive && (
                                                                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                                                            )}
                                                        </>
                                                    )}
                                                </NavLink>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        // Render regular nav items
                        return (
                            <NavLink
                                key={item.id}
                                to={item.path}
                                onClick={onClose}
                                className={({ isActive }) => `
                                    flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-sm font-medium transition-colors
                                    ${isActive
                                        ? 'nav-item-active'
                                        : 'text-slate-600 hover:bg-slate-50'
                                    }
                                `}
                            >
                                {({ isActive }) => (
                                    <>
                                        <i className={`fas ${item.icon} w-5 ${isActive ? 'text-blue-600' : 'text-slate-500'}`}></i>
                                        <span>{item.label}</span>
                                        {item.badge && (
                                            <span className={`ml-auto text-[0.6rem] font-semibold px-2 py-0.5 rounded-full ${isActive ? 'bg-blue-100 text-blue-800' : 'bg-blue-50 text-blue-800'
                                                }`}>
                                                {item.badge}
                                            </span>
                                        )}
                                    </>
                                )}
                            </NavLink>
                        );
                    })}

                    <div className="text-[0.65rem] font-semibold text-slate-400 uppercase tracking-wider ml-2.5 mt-4 mb-2">Account</div>
                    <NavLink
                        to="/settings"
                        onClick={onClose}
                        className={({ isActive }) => `
                            flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-sm font-medium transition-colors
                            ${isActive ? 'nav-item-active' : 'text-slate-600 hover:bg-slate-50'}
                        `}
                    >
                        <i className="fas fa-cog w-5 text-slate-500"></i><span>SETTING </span>
                    </NavLink>
                    <NavLink
                        to="/logout"
                        onClick={onClose}
                        className={({ isActive }) => `
                            flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-sm font-medium transition-colors
                            ${isActive ? 'nav-item-active' : 'text-slate-600 hover:bg-slate-50'}
                        `}
                    >
                        <i className="fas fa-sign-out-alt w-5 text-slate-500"></i><span>LOGOUT</span>
                    </NavLink>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;