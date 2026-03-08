"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { Search, HeartPulse, Activity, BedDouble, Droplets, MapPin, ChevronRight, Menu } from "lucide-react";
import { useState } from "react";

// The true 10 Coimbatore Elite Institutions mapped with realistic UI data metrics
const HOSPITALS = [
  { id: 'kmch', name: "KMCH", type: "Multi-Specialty", status: "Optimal", icu_available: 12, icu_total: 45, blood_units: 450, glow: "bg-emerald-200/40", map: "Avinashi Road" },
  { id: 'psg', name: "PSG Hospitals", type: "Teaching Hospital", status: "High Load", icu_available: 4, icu_total: 60, blood_units: 820, glow: "bg-blue-200/40", map: "Peelamedu" },
  { id: 'ganga', name: "Ganga Hospital", type: "Orthopaedics & Trauma", status: "Optimal", icu_available: 18, icu_total: 35, blood_units: 320, glow: "bg-teal-200/40", map: "Mettupalayam Road" },
  { id: 'gknm', name: "GKNM Hospital", type: "Multi-Specialty", status: "Moderate", icu_available: 9, icu_total: 40, blood_units: 540, glow: "bg-amber-200/40", map: "Pappanaickenpalayam" },
  { id: 'srh', name: "Sri Ramakrishna", type: "Multi-Specialty", status: "Optimal", icu_available: 15, icu_total: 50, blood_units: 610, glow: "bg-indigo-200/40", map: "Avarampalayam" },
  { id: 'royal', name: "Royal Care", type: "Super Specialty", status: "Critical Load", icu_available: 2, icu_total: 30, blood_units: 210, glow: "bg-rose-200/40", map: "Neelambur" },
  { id: 'gem', name: "GEM Hospital", type: "Gastroenterology", status: "Optimal", icu_available: 8, icu_total: 20, blood_units: 180, glow: "bg-cyan-200/40", map: "Ramanathapuram" },
  { id: 'kg', name: "KG Hospital", type: "Multi-Specialty", status: "Moderate", icu_available: 6, icu_total: 25, blood_units: 390, glow: "bg-orange-200/40", map: "Arts College Road" },
  { id: 'kongunad', name: "Kongunad", type: "Multi-Specialty", status: "Optimal", icu_available: 14, icu_total: 30, blood_units: 260, glow: "bg-pink-200/40", map: "Tatabad" },
  { id: 'womens', name: "Women's Center", type: "Maternity", status: "Moderate", icu_available: 5, icu_total: 15, blood_units: 150, glow: "bg-violet-200/40", map: "Mettupalayam Road" },
];

export default function Home() {
  const [search, setSearch] = useState("");

  const filteredHospitals = HOSPITALS.filter(
    (h) => h.name.toLowerCase().includes(search.toLowerCase()) || h.type.toLowerCase().includes(search.toLowerCase())
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-slate-50 text-slate-900 pb-24">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-rose-50/50 rounded-full blur-3xl pointer-events-none" />

      {/* Navigation Layer */}
      <nav className="sticky top-0 z-50 glass-panel border-b border-white/40 mb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 text-white flex items-center justify-center shadow-[0_4px_12px_rgba(15,23,42,0.2)]">
              <Activity size={20} strokeWidth={2.5} />
            </div>
            <h1 className="font-serif text-2xl font-bold tracking-tight text-slate-900">
              LIFE LINE <span className="text-slate-500 font-medium">Connect</span>
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">Documentation</button>
            <button className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">Emergency Protocol</button>
            <button className="text-sm font-bold px-6 py-2.5 bg-slate-900 text-white rounded-full hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-[0_4px_16px_rgba(15,23,42,0.2)]">
              Admin Portal
            </button>
          </div>
          <button className="md:hidden p-2 text-slate-500">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Dynamic Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-slate-200 shadow-sm text-xs font-bold uppercase tracking-wider text-slate-600 mb-6">
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            Coimbatore Live Network
          </div>
          
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-gradient leading-[1.05] tracking-tight mb-8">
            Elite Care, <br /> Intelligent Routing.
          </h2>
          
          <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl leading-relaxed mb-10">
            The master terminal bridging the top 10 Coimbatore elite institutions. 
            Real-time telemetry across intensive care units, bio-repositories, and emergency loads.
          </p>

          {/* Interactive Search Bar */}
          <div className="relative group max-w-xl">
            <div className="absolute inset-0 bg-slate-900/5 rounded-2xl blur-xl group-focus-within:bg-blue-500/10 transition-colors duration-500" />
            <div className="relative flex items-center glass-panel rounded-2xl p-2 pl-5 transition-shadow duration-300 group-focus-within:shadow-[0_8px_30px_rgb(0,0,0,0.08)] group-focus-within:border-blue-200">
              <Search className="text-slate-400 group-focus-within:text-blue-500 transition-colors" size={22} />
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search hospitals, specialties, or locations..."
                className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-slate-900 font-semibold placeholder:text-slate-400 placeholder:font-medium"
              />
            </div>
          </div>
        </motion.div>

        {/* Dynamic Bento Grid of 10 Hospitals */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max"
        >
          <AnimatePresence>
            {filteredHospitals.map((hospital, i) => (
              <motion.div 
                layout // Enables smooth position swapping when filtering
                variants={itemVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                key={hospital.id} 
                className={`group glass-panel rounded-[2rem] p-6 lg:p-8 relative overflow-hidden card-hover-fx ${
                  i === 0 ? "md:col-span-2 lg:col-span-2 bg-gradient-to-br from-white/80 to-slate-50/20" : ""
                }`}
              >
                {/* Visual Flair Background */}
                <div className={`absolute top-0 right-0 w-32 h-32 ${hospital.glow} rounded-full mix-blend-multiply blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  {/* Top Bar */}
                  <div className="flex justify-between items-start mb-12">
                    <div>
                      <h3 className="font-serif text-2xl lg:text-3xl font-bold text-slate-900 mb-1">{hospital.name}</h3>
                      <div className="flex items-center gap-1.5 text-sm font-medium text-slate-500">
                        <MapPin size={14} />
                        {hospital.map}
                      </div>
                    </div>
                    {/* Status Badge */}
                    <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      hospital.status === "Critical Load" ? "bg-rose-100 text-rose-700" :
                      hospital.status === "Moderate" ? "bg-amber-100 text-amber-700" :
                      "bg-emerald-100 text-emerald-700"
                    }`}>
                      {hospital.status}
                    </div>
                  </div>

                  {/* Data Metrics */}
                  <div className="space-y-6">
                    {/* Specialty row */}
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Classification</span>
                      <p className="text-slate-700 font-semibold text-lg">{hospital.type}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* ICU Info */}
                      <div className="bg-slate-100/50 rounded-xl p-4 border border-slate-200/60">
                        <div className="flex items-center justify-between mb-2">
                          <BedDouble size={16} className="text-slate-500" />
                          <span className="text-sm font-bold text-slate-900 tabular-nums">
                            {hospital.icu_available} <span className="text-slate-400 font-medium">/ {hospital.icu_total}</span>
                          </span>
                        </div>
                        {/* Progress Bar */}
                        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(hospital.icu_available / hospital.icu_total) * 100}%` }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                            className={`h-full rounded-full ${hospital.icu_available < 5 ? "bg-rose-500" : "bg-emerald-500"}`}
                          />
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-2">Available ICU Beds</p>
                      </div>

                      {/* Blood Info */}
                      <div className="bg-slate-100/50 rounded-xl p-4 border border-slate-200/60 flex flex-col justify-center">
                        <div className="flex items-center gap-2 text-rose-500 mb-1">
                          <Droplets size={16} />
                          <span className="text-xl font-bold tabular-nums text-slate-900 tracking-tight">{hospital.blood_units}</span>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Blood Units</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtle Hover Arrow */}
                <div className="absolute bottom-6 right-6 w-10 h-10 bg-slate-900 rounded-full text-white flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                  <ChevronRight size={20} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredHospitals.length === 0 && (
          <div className="text-center py-20 text-slate-500 font-medium">
            <Search className="mx-auto mb-4 opacity-30" size={40} />
            No elite institutions found matching "{search}"
          </div>
        )}

      </div>
    </main>
  );
}
