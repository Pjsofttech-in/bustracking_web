// src/pages/Dashboard/Dashboard.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { getDashboardData } from "../../api/dashboardApi";
import {
  FaBus,
  FaUsers,
  FaCheckCircle,
  FaCalendarAlt,
  FaMapPin,
  FaRoute,
  FaTruck,
  FaUserTie,
  FaUserCog,
  FaSchool,
  FaLanguage,
  FaMapMarkerAlt,
  FaCreditCard,
  FaQrcode,
  FaBell,
  FaSpinner,
  FaCode,
  FaClock,
  FaArrowRight,
  FaExchangeAlt,
  FaUserGraduate,
  FaWallet,
  FaChartLine,
  FaStopCircle,
} from "react-icons/fa";
import { MdDirectionsBus, MdTimeline, MdPersonSearch } from "react-icons/md";
import { BiTrendingUp, BiTimeFive } from "react-icons/bi";

// ─── Helper: Status Badge ──────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const config = {
    "on-time": { bg: "bg-emerald-100", text: "text-emerald-700", label: "On time", icon: "✓" },
    delayed: { bg: "bg-rose-100", text: "text-rose-700", label: "Delayed", icon: "⚠" },
    approaching: { bg: "bg-blue-100", text: "text-blue-700", label: "Approaching", icon: "→" },
    completed: { bg: "bg-slate-100", text: "text-slate-700", label: "Completed", icon: "✔" },
  };
  const c = config[status] || config["on-time"];
  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[0.5rem] font-semibold ${c.bg} ${c.text} sm:px-2.5 sm:py-0.5 sm:text-[0.6rem] md:px-3 md:py-1 md:text-xs`}
    >
      <span className="hidden xs:inline">{c.icon}</span>
      <span>{c.label}</span>
    </span>
  );
};

// ─── Helper: Stat Card ──────────────────────────────────────────────────
const StatCard = ({ value, label, icon: Icon, color = "blue", trend }) => {
  const colorMap = {
    blue: "text-blue-600",
    green: "text-emerald-600",
    amber: "text-amber-600",
    rose: "text-rose-600",
    purple: "text-violet-600",
    slate: "text-slate-600",
  };
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3 sm:p-4 transition-all hover:shadow-md hover:border-slate-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[0.55rem] font-medium text-slate-400 uppercase tracking-wider sm:text-[0.6rem] md:text-xs">
            {label}
          </p>
          <p className={`text-lg font-bold sm:text-xl md:text-2xl ${colorMap[color]}`}>{value}</p>
        </div>
        <div className={`p-1.5 rounded-lg bg-${color}-50/60 sm:p-2`}>
          {Icon && <Icon className={`text-sm sm:text-base md:text-lg ${colorMap[color]}`} />}
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-1 mt-1 text-[0.5rem] text-emerald-600 sm:text-[0.55rem]">
          <BiTrendingUp className="text-xs" />
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
};

// ─── Helper: Entity Card ───────────────────────────────────────────────
const EntityCard = ({ title, icon: Icon, items, max = 5, color = "blue", badge }) => {
  const visible = items?.slice(0, max) || [];
  const remainder = (items?.length || 0) - max;
  const colorClass = {
    blue: "text-blue-600",
    green: "text-emerald-600",
    amber: "text-amber-600",
    purple: "text-violet-600",
    rose: "text-rose-600",
    slate: "text-slate-600",
  }[color];

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3 sm:p-4 transition-all hover:shadow-md hover:border-slate-200">
      <div className="flex items-center justify-between mb-2">
        <h4 className={`flex items-center gap-1.5 text-[0.65rem] font-semibold sm:text-xs md:text-sm ${colorClass}`}>
          {Icon && <Icon className="text-[0.65rem] sm:text-xs md:text-sm" />}
          {title}
        </h4>
        {badge && <span className="text-[0.5rem] text-slate-400 sm:text-[0.55rem]">{badge}</span>}
      </div>
      {visible.length > 0 ? (
        <ul className="space-y-0.5 sm:space-y-1">
          {visible.map((item, idx) => (
            <li key={idx} className="flex items-center gap-1.5 text-[0.55rem] text-slate-600 sm:text-xs truncate">
              <span className="w-1 h-1 rounded-full bg-current opacity-40 flex-shrink-0" />
              <span className="truncate">{item}</span>
            </li>
          ))}
          {remainder > 0 && (
            <li className="text-[0.5rem] text-slate-400 sm:text-[0.55rem]">+{remainder} more</li>
          )}
        </ul>
      ) : (
        <p className="text-[0.55rem] text-slate-400 sm:text-xs">No data</p>
      )}
    </div>
  );
};

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────
export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  useEffect(() => {
    getDashboardData()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard error:", err);
        setLoading(false);
      });
  }, []);

  // ─── Memoized derived data ────────────────────────────────────────────
  const stats = useMemo(() => {
    const d = data || {};
    const s = d.stats || {};
    return {
      activeBuses: s.activeBuses ?? d.buses?.length ?? 0,
      totalStudents: s.totalStudents ?? d.students?.length ?? 0,
      onTimeRate: s.onTimeRate ?? 92,
      totalTrips: s.totalTrips ?? 47,
      totalDrivers: d.drivers?.length ?? 0,
      totalConductors: d.conductors?.length ?? 0,
      totalStops: d.busStops?.length ?? 0,
      totalRoutes: d.routes?.length ?? 0,
    };
  }, [data]);

  const recentScans = useMemo(() => {
    const scans = data?.studentScans || [];
    return scans.slice(0, 6).map((s) => ({
      ...s,
      time: s.time || s.createdAt?.slice(11, 16) || "12:00",
      type: s.type || (s.status === "IN" ? "Boarding" : "Alighting"),
    }));
  }, [data]);

  const recentFees = useMemo(() => {
    const fees = data?.studentFeePayments || [];
    return fees.slice(0, 5);
  }, [data]);

  const routeStops = useMemo(() => {
    const rs = data?.routeStops || [];
    return rs.slice(0, 5);
  }, [data]);

  // ─── Loading ───────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <FaSpinner className="animate-spin text-3xl text-blue-600 sm:text-4xl" />
          <p className="text-sm text-slate-500 sm:text-base">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
        <div className="text-center">
          <p className="text-slate-500">No data available</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 text-sm text-blue-600 underline"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const {
    academicYear = "2025-2026",
    buses = [],
    busStops = [],
    conductors = [],
    drivers = [],
    divisions = [],
    mediums = [],
    serviceProviders = [],
    students = [],
    studentScans = [],
    studentFeePayments = [],
    routeStops: rawRouteStops = [],
  } = data;

  // ─── RENDER ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50/80 w-full overflow-x-hidden">
      <div className="w-full max-w-[1600px] mx-auto px-2 py-2 sm:px-3 sm:py-3 md:px-5 md:py-5 lg:px-6 lg:py-6 xl:px-8 xl:py-8">

        {/* ─── HEADER / NAVBAR ────────────────────────────────────────── */}
        <header className="flex flex-wrap items-center justify-between gap-2 bg-white rounded-xl border border-slate-100 shadow-sm px-3 py-2 sm:rounded-2xl sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:rounded-2xl lg:px-6 lg:py-3.5">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-3 md:gap-4">
            <Link
              to="/academicyear"
              className="flex items-center gap-1 rounded-full bg-slate-50 px-2 py-1 text-[0.6rem] font-medium text-slate-600 transition-colors hover:bg-slate-100 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs md:px-4 md:py-2 md:text-sm"
            >
              <FaCalendarAlt className="text-blue-600 text-[0.6rem] sm:text-xs md:text-sm" />
              <span className="hidden xs:inline">Year:</span>
              <span className="font-bold text-slate-800 text-[0.6rem] sm:text-xs md:text-sm">{academicYear}</span>
            </Link>

            <div className="flex items-center gap-1 text-[0.6rem] text-slate-500 sm:gap-2 sm:text-xs md:text-sm">
              <FaBus className="text-blue-600 text-[0.6rem] sm:text-xs md:text-sm" />
              <span className="font-medium">{stats.activeBuses}</span>
              <span className="hidden xs:inline">Active</span>
            </div>

            <div className="flex items-center gap-1 text-[0.6rem] text-slate-500 sm:gap-2 sm:text-xs md:text-sm">
              <FaUsers className="text-blue-600 text-[0.6rem] sm:text-xs md:text-sm" />
              <span className="font-medium">{stats.totalStudents}</span>
              <span className="hidden xs:inline">Students</span>
            </div>

            <div className="hidden sm:flex items-center gap-1 text-[0.6rem] text-slate-500 sm:gap-2 sm:text-xs">
              <FaRoute className="text-blue-600" />
              <span className="font-medium">{stats.totalRoutes}</span>
              <span className="hidden md:inline">Routes</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <FaBell className="text-sm text-slate-400 transition-colors hover:text-slate-600 sm:text-base md:text-xl" />
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500"></span>
              </span>
            </div>
            <div className="hidden xs:flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-[0.55rem] font-semibold text-blue-600 sm:px-3 sm:py-1.5 sm:text-xs md:px-4 md:py-2 md:text-sm">
              <span className="hidden xs:inline">👋</span>
              <span className="hidden sm:inline">{greeting}</span>
              <span className="sm:hidden">Admin</span>
            </div>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white sm:h-8 sm:w-8 sm:text-sm md:h-9 md:w-9 md:text-base">
              A
            </div>
          </div>
        </header>

        {/* ─── GREETING (mobile only) ────────────────────────────────── */}
        <div className="mt-2 sm:hidden">
          <p className="text-sm font-medium text-slate-600">
            {greeting}, Admin 👋
          </p>
        </div>

        {/* ─── MAP PREVIEW ────────────────────────────────────────────── */}
        <section className="mt-3 rounded-xl border border-white/60 bg-[#eef2f6] p-2.5 shadow-sm sm:mt-4 sm:rounded-2xl sm:p-3 md:mt-5 md:rounded-3xl md:p-4 lg:p-5">
          <div className="flex flex-wrap items-center justify-between gap-1">
            <h3 className="flex items-center gap-1.5 text-[0.7rem] font-semibold sm:text-sm md:text-base lg:text-lg">
              <FaMapPin className="text-blue-600 text-[0.7rem] sm:text-sm md:text-base" />
              <span className="hidden xs:inline">Live route ·</span> Bus #24
            </h3>
            <div className="flex items-center gap-1.5">
              <span className="flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[0.5rem] font-semibold text-slate-700 border border-slate-200 sm:px-3 sm:py-1 sm:text-xs md:px-4 md:py-1.5 md:text-sm">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 sm:h-2 sm:w-2"></span>
                <span className="hidden xs:inline">3 min delay</span>
                <span className="xs:hidden">Delay</span>
              </span>
              <StatusBadge status="approaching" />
            </div>
          </div>

          <div className="relative mt-2 h-[100px] overflow-hidden rounded-lg bg-gradient-to-br from-slate-200/80 to-slate-300/40 sm:h-[130px] sm:rounded-xl md:h-[170px] lg:h-[200px]">
            {/* Simulated map background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#cbd5e1_1px,transparent_1px)] bg-[length:30px_30px] opacity-60"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,#cbd5e1_1px,transparent_1px)] bg-[length:40px_40px] opacity-40"></div>

            {/* Route line */}
            <div className="absolute left-[8%] top-1/2 h-[3px] w-[84%] -translate-y-1/2 rounded-full bg-blue-500/40 sm:h-[4px]"></div>

            {/* Stops */}
            <div className="absolute top-[38%] left-[12%] h-2.5 w-2.5 rounded-full border-2 border-white bg-amber-500 shadow-md sm:h-3 sm:w-3 md:h-3.5 md:w-3.5"></div>
            <div className="absolute top-[65%] left-[32%] h-2.5 w-2.5 rounded-full border-2 border-white bg-amber-500 shadow-md sm:h-3 sm:w-3 md:h-3.5 md:w-3.5"></div>
            <div className="absolute top-[28%] left-[55%] h-2.5 w-2.5 rounded-full border-2 border-white bg-amber-500 shadow-md sm:h-3 sm:w-3 md:h-3.5 md:w-3.5"></div>
            <div className="absolute top-[72%] left-[78%] h-2.5 w-2.5 rounded-full border-2 border-white bg-amber-500 shadow-md sm:h-3 sm:w-3 md:h-3.5 md:w-3.5"></div>

            {/* Bus marker */}
            <div className="absolute left-[42%] top-1/2 -translate-y-1/2 -translate-x-1/2 transform rounded-full bg-blue-600 px-2 py-1 text-[0.5rem] font-semibold text-white shadow-lg border-2 border-white flex items-center gap-1 sm:px-3 sm:py-1.5 sm:text-xs md:px-4 md:py-2 md:text-sm">
              <FaBus className="text-[0.5rem] sm:text-xs md:text-sm" />
              <span>24 · ETA 8m</span>
            </div>

            {/* Info badges */}
            <div className="absolute bottom-1 right-1 flex items-center gap-1 rounded-full bg-black/5 px-1.5 py-0.5 text-[0.4rem] text-slate-600 backdrop-blur-sm border border-white/30 sm:bottom-2 sm:right-2 sm:px-2 sm:py-1 sm:text-[0.5rem] md:bottom-3 md:right-3 md:px-3 md:py-1 md:text-xs">
              <FaRoute className="text-[0.4rem] sm:text-[0.5rem] md:text-xs" />
              <span className="hidden xs:inline">6 stops</span>
              <span className="xs:hidden">6</span>
            </div>
            <div className="absolute bottom-1 left-1 flex items-center gap-0.5 rounded-full bg-black/5 px-1.5 py-0.5 text-[0.4rem] text-slate-600 backdrop-blur-sm border border-white/30 sm:bottom-2 sm:left-2 sm:px-2 sm:py-1 sm:text-[0.5rem] md:bottom-3 md:left-3 md:px-3 md:py-1 md:text-xs">
              <FaClock className="text-[0.4rem] sm:text-[0.5rem] md:text-xs" />
              <span>12s ago</span>
            </div>
          </div>

          <div className="mt-1.5 flex flex-wrap items-center justify-between gap-1 text-[0.5rem] text-slate-500 sm:mt-2 sm:text-xs md:mt-2.5 md:text-sm">
            <span className="flex items-center gap-0.5">
              <FaMapPin className="text-blue-600 text-[0.5rem] sm:text-xs" />
              <span className="hidden xs:inline">Pickup:</span> Elm St · 2:30 PM
            </span>
            <span className="flex items-center gap-0.5">
              <FaMapMarkerAlt className="text-amber-500 text-[0.5rem] sm:text-xs" />
              <span className="hidden xs:inline">Drop:</span> Oak Ave · 3:10 PM
            </span>
          </div>
        </section>

        {/* ─── STATS ROW ──────────────────────────────────────────────── */}
        <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4 sm:grid-cols-4 sm:gap-3 md:mt-5 md:gap-4">
          <StatCard value={stats.activeBuses} label="Active Buses" icon={FaBus} color="blue" />
          <StatCard value={stats.totalStudents} label="Students" icon={FaUsers} color="green" />
          <StatCard value={`${stats.onTimeRate}%`} label="On-time Rate" icon={BiTrendingUp} color="amber" />
          <StatCard value={stats.totalTrips} label="Total Trips" icon={MdDirectionsBus} color="purple" />
        </div>

        {/* ─── ENTITY CARDS (grid) ────────────────────────────────────── */}
        <div className="mt-3 grid grid-cols-1 gap-2 sm:mt-4 sm:grid-cols-2 sm:gap-3 md:mt-5 md:grid-cols-3 md:gap-4 lg:grid-cols-3">
          <EntityCard
            title="Suppliers"
            icon={FaTruck}
            items={serviceProviders}
            max={4}
            color="blue"
          />
          <EntityCard
            title="Drivers"
            icon={FaUserTie}
            items={drivers}
            max={4}
            color="green"
          />
          <EntityCard
            title="Conductors"
            icon={FaUserCog}
            items={conductors}
            max={4}
            color="purple"
          />
          <EntityCard
            title="Divisions"
            icon={FaSchool}
            items={divisions}
            max={6}
            color="amber"
          />
          <EntityCard
            title="Mediums"
            icon={FaLanguage}
            items={mediums}
            max={6}
            color="blue"
          />
          <EntityCard
            title="Bus Stops"
            icon={FaMapMarkerAlt}
            items={busStops}
            max={4}
            color="rose"
          />
        </div>

        {/* ─── ROUTE STOPS + RECENT FEES (2-col) ────────────────────── */}
        <div className="mt-3 grid grid-cols-1 gap-2 sm:mt-4 sm:gap-3 md:mt-5 md:grid-cols-2 md:gap-4">
          {/* Route Stops */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3 transition-all hover:shadow-md hover:border-slate-200 sm:p-4">
            <h4 className="flex items-center gap-1.5 text-[0.65rem] font-semibold text-blue-600 sm:text-xs md:text-sm">
              <FaRoute className="text-[0.65rem] sm:text-xs md:text-sm" />
              Route Stops
            </h4>
            <div className="mt-2 space-y-1 sm:space-y-1.5">
              {routeStops.length > 0 ? (
                routeStops.map((rs, idx) => (
                  <div
                    key={idx}
                    className="flex flex-wrap items-center justify-between border-b border-slate-50 pb-1 text-[0.55rem] text-slate-600 sm:pb-1.5 sm:text-xs md:text-sm"
                  >
                    <span className="font-medium truncate max-w-[60px] sm:max-w-[100px] md:max-w-[140px]">
                      {rs.route || `Route ${idx + 1}`}
                    </span>
                    <span className="text-slate-400 text-[0.5rem] sm:text-[0.55rem] md:text-xs">
                      Stop {rs.order ?? idx + 1}: {rs.stop || `Stop ${idx + 1}`}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-[0.55rem] text-slate-400 sm:text-xs">No route stops</p>
              )}
            </div>
          </div>

          {/* Recent Fees */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3 transition-all hover:shadow-md hover:border-slate-200 sm:p-4">
            <h4 className="flex items-center gap-1.5 text-[0.65rem] font-semibold text-emerald-600 sm:text-xs md:text-sm">
              <FaCreditCard className="text-[0.65rem] sm:text-xs md:text-sm" />
              Recent Fee Payments
            </h4>
            <div className="mt-2 space-y-1 sm:space-y-1.5">
              {recentFees.length > 0 ? (
                recentFees.map((fee, idx) => (
                  <div
                    key={idx}
                    className="flex flex-wrap items-center justify-between border-b border-slate-50 pb-1 text-[0.55rem] sm:pb-1.5 sm:text-xs md:text-sm"
                  >
                    <span className="font-medium truncate max-w-[60px] sm:max-w-[100px] md:max-w-[140px]">
                      {fee.student || `Student ${idx + 1}`}
                    </span>
                    <span className="text-slate-500 text-[0.5rem] sm:text-[0.55rem] md:text-xs">
                      ${fee.amount ?? (Math.random() * 100 + 50).toFixed(2)}{" "}
                      <span
                        className={`ml-1 font-semibold ${
                          fee.status === "PAID" || fee.status === "Paid"
                            ? "text-emerald-600"
                            : "text-amber-600"
                        }`}
                      >
                        {fee.status || "PENDING"}
                      </span>
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-[0.55rem] text-slate-400 sm:text-xs">No recent payments</p>
              )}
            </div>
          </div>
        </div>

        {/* ─── STUDENTS + RECENT SCANS (2-col) ──────────────────────── */}
        <div className="mt-3 grid grid-cols-1 gap-2 sm:mt-4 sm:gap-3 md:mt-5 md:grid-cols-2 md:gap-4">
          {/* Students */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3 transition-all hover:shadow-md hover:border-slate-200 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="flex items-center gap-1.5 text-[0.65rem] font-semibold text-violet-600 sm:text-xs md:text-sm">
                <FaUserGraduate className="text-[0.65rem] sm:text-xs md:text-sm" />
                Students
              </h4>
              <span className="text-[0.5rem] text-slate-400 sm:text-[0.55rem]">
                {students.length} total
              </span>
            </div>
            <div className="max-h-44 space-y-1 overflow-y-auto pr-1 sm:max-h-48 sm:space-y-1.5">
              {students.length > 0 ? (
                students.slice(0, 8).map((s, idx) => (
                  <div
                    key={idx}
                    className="flex flex-wrap items-center justify-between border-b border-slate-50 pb-1 text-[0.55rem] sm:pb-1.5 sm:text-xs"
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[0.5rem] font-semibold text-blue-600 sm:h-6 sm:w-6 sm:text-[0.55rem] md:h-7 md:w-7 md:text-xs">
                        {s.name?.split(" ").map((n) => n[0]).join("") || "S"}
                      </div>
                      <span className="truncate max-w-[60px] sm:max-w-[80px] md:max-w-[120px]">
                        {s.name || `Student ${idx + 1}`}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="rounded bg-slate-100 px-1 py-0.5 text-[0.45rem] sm:px-1.5 sm:text-[0.5rem]">
                        Bus {s.bus || "—"}
                      </span>
                      <span
                        className={`text-[0.45rem] font-medium sm:text-[0.5rem] ${
                          s.feePaid ? "text-emerald-600" : "text-amber-600"
                        }`}
                      >
                        {s.feePaid ? "Paid" : "Pending"}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-[0.55rem] text-slate-400 sm:text-xs">No students</p>
              )}
            </div>
          </div>

          {/* Recent Scans */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3 transition-all hover:shadow-md hover:border-slate-200 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="flex items-center gap-1.5 text-[0.65rem] font-semibold text-amber-600 sm:text-xs md:text-sm">
                <FaQrcode className="text-[0.65rem] sm:text-xs md:text-sm" />
                Recent Scans
              </h4>
              <span className="text-[0.5rem] text-slate-400 sm:text-[0.55rem]">Last 24h</span>
            </div>
            <div className="max-h-44 space-y-1 overflow-y-auto pr-1 sm:max-h-48 sm:space-y-1.5">
              {recentScans.length > 0 ? (
                recentScans.map((scan, idx) => (
                  <div
                    key={idx}
                    className="flex flex-wrap items-center justify-between border-b border-slate-50 pb-1 text-[0.55rem] sm:pb-1.5 sm:text-xs"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium truncate max-w-[50px] sm:max-w-[70px] md:max-w-[100px]">
                        {scan.student || `Scan ${idx + 1}`}
                      </span>
                      <span className="text-slate-400 text-[0.45rem] sm:text-[0.5rem]">
                        Bus {scan.bus || "—"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="rounded bg-emerald-50 px-1 py-0.5 text-[0.45rem] text-emerald-700 sm:px-1.5 sm:text-[0.5rem]">
                        {scan.type || "Boarding"}
                      </span>
                      <span className="text-slate-400 text-[0.45rem] sm:text-[0.5rem]">
                        {scan.time || "12:00"}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-[0.55rem] text-slate-400 sm:text-xs">No recent scans</p>
              )}
            </div>
          </div>
        </div>

        {/* ─── FOOTER ──────────────────────────────────────────────────── */}
        <footer className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/70 pt-3 text-[0.5rem] text-slate-400 sm:mt-5 sm:pt-4 sm:text-[0.55rem] md:mt-6 md:pt-5 md:text-xs">
          <span className="flex items-center gap-1">
            <FaCode className="text-[0.5rem] sm:text-xs" />
            React + Vite + Tailwind · Spring Boot
          </span>
          <span className="flex items-center gap-1.5">
            <FaCheckCircle className="text-emerald-500 text-[0.5rem] sm:text-xs" />
            API: /dashboard
          </span>
          <span className="hidden xs:inline-flex items-center gap-1">
            <BiTimeFive className="text-[0.5rem] sm:text-xs" />
            v2.0
          </span>
        </footer>

      </div>
    </div>
  );
}