// import { useState, useEffect } from 'react'
// import './CSS.css'
// import { Routes, Route, Link } from 'react-router'

// function Content() {
//   const [data, setData] = useState({
//     academicYear: '',
//     buses: [], busLocations: [], busStops: [], conductors: [], drivers: [],
//     divisions: [], mediums: [], routes: [], routeStops: [], serviceProviders: [],
//     students: [], studentFeePayments: [], studentScans: [],
//     stats: { activeBuses: 0, totalStudents: 0, onTimeRate: 0, totalTrips: 0 }
//   });
//   const [loading, setLoading] = useState(true);

//   const api = {
//     fetchDashboard: async () => {
//       await new Promise(resolve => setTimeout(resolve, 300));
//       return {
//         academicYear: '2025-2026',
//         buses: [
//           { id: 24, name: 'Bus #24', route: 'Elm St', students: 22, stops: 6, status: 'on-time', eta: '8 min', supplier: 'First Transit', trip: 'AM-01' },
//           { id: 12, name: 'Bus #12', route: 'Oak Av', students: 18, stops: 4, status: 'delayed', eta: '18 min', supplier: 'Student Transport', trip: 'PM-03' },
//           { id: 8, name: 'Bus #08', route: 'Pine Rd', students: 14, stops: 5, status: 'approaching', eta: '2 min', supplier: 'EcoRide', trip: 'AM-02' },
//           { id: 31, name: 'Bus #31', route: 'Lake Dr', students: 9, stops: 3, status: 'on-time', eta: '12 min', supplier: 'First Transit', trip: 'PM-01' },
//         ],
//         busLocations: [
//           { busId: 24, lat: 40.7128, lng: -74.0060, lastUpdate: '2 min ago' },
//           { busId: 12, lat: 40.7135, lng: -74.0072, lastUpdate: '1 min ago' },
//         ],
//         busStops: ['Elm St & 5th', 'Oak Av & 12th', 'Pine Rd & Main', 'Lake Dr & Park'],
//         conductors: ['Maria Gonzalez', 'James Carter', 'Linda Park'],
//         drivers: ['Robert Miller', 'Sarah Johnson', 'David Kim'],
//         divisions: ['North', 'South', 'East', 'West'],
//         mediums: ['English', 'Spanish', 'Bilingual'],
//         routes: [
//           { id: 1, name: 'Route A', stops: 8, students: 45 },
//           { id: 2, name: 'Route B', stops: 6, students: 32 },
//         ],
//         routeStops: [
//           { route: 'Route A', stop: 'Elm St', order: 1 },
//           { route: 'Route A', stop: 'Oak Av', order: 2 },
//           { route: 'Route B', stop: 'Pine Rd', order: 1 },
//         ],
//         serviceProviders: ['First Transit', 'Student Transport', 'EcoRide'],
//         students: [
//           { id: 1, name: 'Emma Johnson', bus: '24', feePaid: true, scan: '2025-02-10 08:15' },
//           { id: 2, name: 'Liam Smith', bus: '12', feePaid: true, scan: '2025-02-10 08:22' },
//           { id: 3, name: 'Olivia Davis', bus: '24', feePaid: false, scan: '2025-02-09 08:10' },
//           { id: 4, name: 'Noah Wilson', bus: '08', feePaid: true, scan: '2025-02-10 08:05' },
//           { id: 5, name: 'Mia Brown', bus: '31', feePaid: true, scan: '2025-02-10 08:30' },
//           { id: 6, name: 'James Taylor', bus: '12', feePaid: true, scan: '2025-02-10 08:18' },
//         ],
//         studentFeePayments: [
//           { student: 'Emma Johnson', amount: 120, date: '2025-01-15', status: 'Paid' },
//           { student: 'Liam Smith', amount: 120, date: '2025-01-20', status: 'Paid' },
//           { student: 'Olivia Davis', amount: 120, date: '2025-02-05', status: 'Pending' },
//         ],
//         studentScans: [
//           { student: 'Emma Johnson', bus: '24', time: '2025-02-10 08:15', type: 'Board' },
//           { student: 'Liam Smith', bus: '12', time: '2025-02-10 08:22', type: 'Board' },
//           { student: 'Noah Wilson', bus: '08', time: '2025-02-10 08:05', type: 'Board' },
//         ],
//         stats: { activeBuses: 14, totalStudents: 186, onTimeRate: 94, totalTrips: 28 }
//       };
//     }
//   };

//   useEffect(() => {
//     api.fetchDashboard().then(res => {
//       setData(res);
//       setLoading(false);
//     });
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex h-screen items-center justify-center bg-slate-50">
//         <i className="fas fa-spinner fa-pulse text-4xl text-[#6495ED]"></i>
//       </div>
//     );
//   }

//   const {
//     academicYear, buses, busLocations, busStops, conductors, drivers,
//     divisions, mediums, routes, routeStops, serviceProviders,
//     students, studentFeePayments, studentScans, stats
//   } = data;

//   const StatusBadge = ({ status }) => {
//     if (status === 'on-time') return <span className="bg-green-100 text-green-700 px-2 sm:px-3 py-1 rounded-full text-[0.6rem] sm:text-[0.65rem] font-semibold flex items-center gap-1"><i className="fas fa-circle text-[0.3rem]"></i> On time</span>;
//     if (status === 'delayed') return <span className="bg-red-100 text-red-700 px-2 sm:px-3 py-1 rounded-full text-[0.6rem] sm:text-[0.65rem] font-semibold flex items-center gap-1"><i className="fas fa-circle text-[0.3rem]"></i> Delayed</span>;
//     if (status === 'approaching') return <span className="bg-[#dbeafe] text-[#6495ED] px-2 sm:px-3 py-1 rounded-full text-[0.6rem] sm:text-[0.65rem] font-semibold flex items-center gap-1"><i className="fas fa-circle text-[0.3rem]"></i> Approaching</span>;
//     return <span className="bg-slate-100 text-slate-700 px-2 sm:px-3 py-1 rounded-full text-[0.6rem] sm:text-[0.65rem] font-semibold">{status}</span>;
//   };

//   return (
//     <div className="flex min-h-screen relative">
//       {/* Main Content */}
//       <main className="flex-1 w-full min-h-screen bg-slate-50/80">
//         <div className="p-4 sm:p-6 md:p-8 max-w-full overflow-x-hidden">
//           {/* NAVBAR with Academic Year */}
//           <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 bg-white rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-sm border border-slate-100">
//             <div className="flex flex-wrap items-center gap-2 sm:gap-4">
//               <Link 
//                 className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-slate-600 bg-slate-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-slate-100 transition-colors"
//                 to="/academicyear"
//               >
//                 <i className="fas fa-calendar-alt text-[#6495ED]"></i>
//                 <span className="hidden xs:inline">Academic Year:</span>
//                 <span className="font-bold text-slate-800">{academicYear}</span>
//               </Link>
//               <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-500">
//                 <i className="fas fa-bus text-[#6495ED]"></i>
//                 <span className="font-medium">{stats.activeBuses}</span>
//                 <span className="hidden sm:inline">Active</span>
//               </div>
//               <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-500">
//                 <i className="fas fa-user-graduate text-[#6495ED]"></i>
//                 <span className="font-medium">{stats.totalStudents}</span>
//                 <span className="hidden sm:inline">Students</span>
//               </div>
//             </div>
//             <div className="flex items-center gap-3 sm:gap-4">
//               <i className="fas fa-bell text-lg sm:text-xl text-slate-400 hover:text-slate-600 cursor-default"></i>
//               <div className="hidden sm:flex px-4 h-10 bg-[#dbeafe] rounded-full items-center justify-center font-semibold text-[#6495ED] border-2 border-white shadow-sm">
//                 Admin
//               </div>
//             </div>
//           </div>

//           {/* Map Card - Responsive */}
//           <section className="bg-[#eef2f6] rounded-2xl sm:rounded-3xl p-4 sm:p-5 mb-5 sm:mb-7 border border-white/60 bg-[radial-gradient(circle_at_20%_30%,#d9e2ef_1px,transparent_1px)] bg-[length:28px_28px]">
//             <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
//               <h3 className="font-semibold text-base sm:text-lg flex items-center gap-2">
//                 <i className="fas fa-map-pin text-[#6495ED]"></i> 
//                 <span className="hidden xs:inline">Live route ·</span> Bus #24
//               </h3>
//               <span className="bg-white rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold text-slate-700 border border-slate-200 flex items-center gap-1.5 sm:gap-2">
//                 <span className="live-dot"></span> 
//                 <span className="hidden xs:inline">3 min delay</span>
//                 <span className="xs:hidden">Delay</span>
//               </span>
//             </div>
//             <div className="map-preview rounded-xl sm:rounded-2xl h-[150px] sm:h-[190px] relative overflow-hidden">
//               <div className="route-line"></div>
//               <div className="bus-marker text-xs sm:text-sm">
//                 <i className="fas fa-bus"></i> 
//                 <span className="hidden xs:inline">24 · ETA 8 min</span>
//                 <span className="xs:hidden">ETA 8m</span>
//               </div>
//               <div className="stop-marker stop1"></div>
//               <div className="stop-marker stop2"></div>
//               <div className="stop-marker stop3"></div>
//               <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-4 bg-black/5 backdrop-blur-sm rounded-full px-2 sm:px-4 py-0.5 sm:py-1 text-[0.6rem] sm:text-xs text-slate-600 border border-white/30">
//                 <i className="fas fa-route"></i> <span className="hidden xs:inline">6 stops</span>
//                 <span className="xs:hidden">6</span>
//               </div>
//             </div>
//             <div className="flex flex-wrap justify-between gap-2 mt-3 text-xs sm:text-sm font-medium text-slate-600">
//               <span><i className="fas fa-location-dot text-[#6495ED] mr-1"></i> <span className="hidden xs:inline">Pickup:</span> Elm St · 2:30 PM</span>
//               <span><i className="fas fa-clock text-[#6495ED] mr-1"></i> <span className="hidden xs:inline">Updated</span> 12s ago</span>
//             </div>
//           </section>

//           {/* Stats - Responsive Grid */}
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-7">
//             <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-100 shadow-sm text-center">
//               <div className="text-xl sm:text-2xl font-bold text-[#6495ED]">{stats.activeBuses}</div>
//               <p className="text-[0.65rem] sm:text-sm text-slate-500 font-medium">Active Buses</p>
//             </div>
//             <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-100 shadow-sm text-center">
//               <div className="text-xl sm:text-2xl font-bold text-[#6495ED]">{stats.totalStudents}</div>
//               <p className="text-[0.65rem] sm:text-sm text-slate-500 font-medium">Students</p>
//             </div>
//             <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-100 shadow-sm text-center">
//               <div className="text-xl sm:text-2xl font-bold text-green-600">{stats.onTimeRate}%</div>
//               <p className="text-[0.65rem] sm:text-sm text-slate-500 font-medium">On-time Rate</p>
//             </div>
//             <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-100 shadow-sm text-center">
//               <div className="text-xl sm:text-2xl font-bold text-[#6495ED]">{stats.totalTrips}</div>
//               <p className="text-[0.65rem] sm:text-sm text-slate-500 font-medium">Total Trips</p>
//             </div>
//           </div>

//           {/* Entity Cards Grid - Responsive */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-5 sm:mb-7">
//             {/* Bus Suppliers */}
//             <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-100 shadow-sm">
//               <h4 className="font-semibold text-xs sm:text-sm flex items-center gap-2 mb-2 sm:mb-3">
//                 <i className="fas fa-truck text-[#6495ED]"></i> Suppliers
//               </h4>
//               <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
//                 {serviceProviders.map((s, i) => <li key={i} className="flex items-center gap-2 truncate"><i className="fas fa-check-circle text-green-500 text-xs"></i> {s}</li>)}
//               </ul>
//             </div>
//             {/* Drivers */}
//             <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-100 shadow-sm">
//               <h4 className="font-semibold text-xs sm:text-sm flex items-center gap-2 mb-2 sm:mb-3">
//                 <i className="fas fa-user-tie text-[#6495ED]"></i> Drivers
//               </h4>
//               <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
//                 {drivers.map((d, i) => <li key={i} className="flex items-center gap-2 truncate"><i className="fas fa-circle text-green-500 text-[0.4rem]"></i> {d}</li>)}
//               </ul>
//             </div>
//             {/* Conductors */}
//             <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-100 shadow-sm">
//               <h4 className="font-semibold text-xs sm:text-sm flex items-center gap-2 mb-2 sm:mb-3">
//                 <i className="fas fa-user-cog text-[#6495ED]"></i> Conductors
//               </h4>
//               <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
//                 {conductors.map((c, i) => <li key={i} className="flex items-center gap-2 truncate"><i className="fas fa-circle text-[#6495ED] text-[0.4rem]"></i> {c}</li>)}
//               </ul>
//             </div>
//             {/* Divisions */}
//             <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-100 shadow-sm">
//               <h4 className="font-semibold text-xs sm:text-sm flex items-center gap-2 mb-2 sm:mb-3">
//                 <i className="fas fa-school text-[#6495ED]"></i> Divisions
//               </h4>
//               <div className="flex flex-wrap gap-1 sm:gap-1.5">
//                 {divisions.map((d, i) => <span key={i} className="bg-slate-100 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[0.6rem] sm:text-xs font-medium">{d}</span>)}
//               </div>
//             </div>
//             {/* Medium */}
//             <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-100 shadow-sm">
//               <h4 className="font-semibold text-xs sm:text-sm flex items-center gap-2 mb-2 sm:mb-3">
//                 <i className="fas fa-language text-[#6495ED]"></i> Medium
//               </h4>
//               <div className="flex flex-wrap gap-1 sm:gap-1.5">
//                 {mediums.map((m, i) => <span key={i} className="bg-[#dbeafe] text-[#6495ED] px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[0.6rem] sm:text-xs font-medium">{m}</span>)}
//               </div>
//             </div>
//             {/* Bus Stops */}
//             <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-100 shadow-sm">
//               <h4 className="font-semibold text-xs sm:text-sm flex items-center gap-2 mb-2 sm:mb-3">
//                 <i className="fas fa-map-pin text-[#6495ED]"></i> Bus Stops
//               </h4>
//               <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
//                 {busStops.slice(0, 4).map((s, i) => <li key={i} className="flex items-center gap-2 truncate"><i className="fas fa-location-dot text-[#6495ED] text-xs"></i> {s}</li>)}
//                 {busStops.length > 4 && <li className="text-[0.6rem] sm:text-xs text-slate-400">+{busStops.length - 4} more</li>}
//               </ul>
//             </div>
//           </div>

//           {/* Route Stops & Trips - Responsive */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-5 sm:mb-7">
//             <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-100 shadow-sm">
//               <h4 className="font-semibold text-xs sm:text-sm flex items-center gap-2 mb-2 sm:mb-3">
//                 <i className="fas fa-route text-[#6495ED]"></i> Route Stops
//               </h4>
//               <div className="space-y-1.5 sm:space-y-2">
//                 {routeStops.map((rs, i) => (
//                   <div key={i} className="flex flex-wrap items-center justify-between text-xs sm:text-sm border-b border-slate-50 pb-1.5 sm:pb-2">
//                     <span className="font-medium">{rs.route}</span>
//                     <span className="text-slate-500">Stop {rs.order}: {rs.stop}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-100 shadow-sm">
//               <h4 className="font-semibold text-xs sm:text-sm flex items-center gap-2 mb-2 sm:mb-3">
//                 <i className="fas fa-credit-card text-[#6495ED]"></i> Recent Fee Payments
//               </h4>
//               <div className="space-y-1.5 sm:space-y-2">
//                 {studentFeePayments.slice(0, 3).map((p, i) => (
//                   <div key={i} className="flex flex-wrap items-center justify-between text-xs sm:text-sm border-b border-slate-50 pb-1.5 sm:pb-2">
//                     <span className="font-medium">{p.student}</span>
//                     <span className="text-slate-500">${p.amount} <span className={`ml-1 sm:ml-2 text-[0.6rem] sm:text-xs font-semibold ${p.status === 'Paid' ? 'text-green-600' : 'text-amber-600'}`}>{p.status}</span></span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Students + Scans - Responsive */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
//             <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm">
//               <div className="flex items-center justify-between mb-2 sm:mb-3">
//                 <h4 className="font-semibold text-xs sm:text-sm flex items-center gap-2">
//                   <i className="fas fa-users text-[#6495ED]"></i> Students
//                 </h4>
//                 <span className="text-[0.6rem] sm:text-xs text-slate-400">{students.length} total</span>
//               </div>
//               <div className="space-y-1.5 sm:space-y-2 max-h-48 overflow-y-auto pr-1">
//                 {students.map(s => (
//                   <div key={s.id} className="flex flex-wrap items-center justify-between text-xs sm:text-sm border-b border-slate-50 pb-1.5 sm:pb-2">
//                     <div className="flex items-center gap-1.5 sm:gap-2">
//                       <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#dbeafe] rounded-full flex items-center justify-center text-[0.6rem] sm:text-xs font-semibold text-[#6495ED]">
//                         {s.name.split(' ').map(n => n[0]).join('')}
//                       </div>
//                       <span className="truncate max-w-[80px] sm:max-w-none">{s.name}</span>
//                     </div>
//                     <div className="flex items-center gap-2 sm:gap-3">
//                       <span className="text-[0.55rem] sm:text-xs bg-slate-100 px-1.5 sm:px-2 py-0.5 rounded">Bus {s.bus}</span>
//                       <span className={`text-[0.55rem] sm:text-xs font-medium ${s.feePaid ? 'text-green-600' : 'text-amber-600'}`}>
//                         {s.feePaid ? 'Paid' : 'Pending'}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm">
//               <div className="flex items-center justify-between mb-2 sm:mb-3">
//                 <h4 className="font-semibold text-xs sm:text-sm flex items-center gap-2">
//                   <i className="fas fa-qrcode text-[#6495ED]"></i> Recent Scans
//                 </h4>
//                 <span className="text-[0.6rem] sm:text-xs text-slate-400">Last 24h</span>
//               </div>
//               <div className="space-y-1.5 sm:space-y-2">
//                 {studentScans.map((scan, i) => (
//                   <div key={i} className="flex flex-wrap items-center justify-between text-xs sm:text-sm border-b border-slate-50 pb-1.5 sm:pb-2">
//                     <div className="flex items-center gap-1 sm:gap-2">
//                       <span className="font-medium">{scan.student}</span>
//                       <span className="text-[0.55rem] sm:text-xs text-slate-400 ml-1 sm:ml-2">Bus {scan.bus}</span>
//                     </div>
//                     <div className="flex items-center gap-1.5 sm:gap-2">
//                       <span className="text-[0.55rem] sm:text-xs bg-green-50 text-green-700 px-1.5 sm:px-2 py-0.5 rounded">{scan.type}</span>
//                       <span className="text-[0.55rem] sm:text-xs text-slate-400">{scan.time}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="mt-6 sm:mt-8 pt-4 border-t border-slate-200/70 flex flex-wrap justify-between gap-2 sm:gap-3 text-[0.6rem] sm:text-xs text-slate-400">
//             <span><i className="fas fa-code"></i> React + Vite + Tailwind · Spring Boot ready</span>
//             <span className="flex gap-2 sm:gap-4"><i className="fas fa-check-circle text-green-500"></i> API: /api/dashboard</span>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Content;