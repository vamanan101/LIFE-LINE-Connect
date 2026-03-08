"use client";

import { motion, Variants } from "framer-motion";
import { Search, HeartPulse, ShieldPlus, Activity, BedDouble, Droplets } from "lucide-react";

export default function Home() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4 } },
  };

  const HOSPITALS = [
    { name: "KMCH", type: "Multi-Specialty", status: "Available", beds: 14, color: "bg-blue-50 text-blue-700" },
    { name: "PSG Hospitals", type: "Teaching Hospital", status: "Critical Load", beds: 3, color: "bg-rose-50 text-rose-700" },
    { name: "Ganga", type: "Orthopaedics", status: "Available", beds: 21, color: "bg-emerald-50 text-emerald-700" },
    { name: "GKNM", type: "Multi-Specialty", status: "High Load", beds: 7, color: "bg-amber-50 text-amber-700" },
  ];

  return (
    <main className="min-h-screen p-6 md:p-12 lg:p-24 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center justify-between mb-16"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md">
            <HeartPulse size={20} />
          </div>
          <h1 className="font-serif text-2xl font-semibold tracking-tight">Coimbatore Elite</h1>
        </div>
        <div className="flex gap-4">
          <button className="text-sm font-medium px-4 py-2 text-slate-500 hover:text-slate-900 transition-colors">Emergency Protocol</button>
          <button className="text-sm font-medium px-6 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all shadow-md hover:shadow-lg">
            Admin Portal
          </button>
        </div>
      </motion.div>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-3xl mb-16"
      >
        <h2 className="font-serif text-5xl md:text-7xl font-semibold text-slate-900 leading-tight mb-6">
          Premium Care,<br /> Instantly Accessible.
        </h2>
        <p className="text-lg text-slate-500 font-sans max-w-xl leading-relaxed mb-8">
          The definitive portal for Coimbatore's top 10 elite medical institutions. 
          Real-time insights across ICUs, bed availability, and blood repositories.
        </p>

        {/* Search Bar - Airbnb Style */}
        <div className="flex items-center bg-white rounded-full p-2 shadow-sm border border-slate-200 max-w-md focus-within:ring-2 focus-within:ring-slate-900/5 transition-all">
          <div className="pl-4 text-slate-400">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Search hospitals or specialties..."
            className="flex-1 bg-transparent border-none outline-none px-4 py-3 placeholder:text-slate-400 text-slate-900 font-medium"
          />
          <button className="bg-slate-900 text-white px-6 py-3 rounded-full font-medium hover:bg-slate-800 transition-colors">
            Search
          </button>
        </div>
      </motion.div>

      {/* Bento Grid layout */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Network Status Card */}
        <motion.div variants={itemVariants} className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 mb-6">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-bold uppercase tracking-wider">Live Network Status</span>
            </div>
            <h3 className="font-serif text-3xl font-semibold text-slate-900 mb-2">94% Availability</h3>
            <p className="text-slate-500 text-sm">Across top 10 institutions combined</p>
          </div>
          <div className="mt-12 bg-slate-50 rounded-2xl p-4 flex gap-4">
             <div className="flex-1">
               <div className="text-xs text-slate-400 font-medium mb-1">Total ICU Beds</div>
               <div className="text-2xl font-semibold tabular-nums text-slate-900">142</div>
             </div>
             <div className="w-px bg-slate-200" />
             <div className="flex-1">
               <div className="text-xs text-slate-400 font-medium mb-1">Blood Units</div>
               <div className="text-2xl font-semibold tabular-nums text-slate-900">8,405</div>
             </div>
          </div>
        </motion.div>

        {/* Top Hospitals List */}
        <motion.div variants={itemVariants} className="md:col-span-2 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-serif text-2xl font-semibold text-slate-900">Featured Institutions</h3>
            <button className="text-sm font-medium text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-1">
              View All 10
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {HOSPITALS.map((hospital, i) => (
              <div key={i} className="group p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 cursor-pointer flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-semibold text-slate-900 text-lg group-hover:text-slate-700 transition-colors">{hospital.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">{hospital.type}</p>
                </div>
                <div className={`px-3 py-1.5 rounded-full text-xs font-semibold ${hospital.color}`}>
                  {hospital.beds} ICU Beds
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </motion.div>

    </main>
  );
}
