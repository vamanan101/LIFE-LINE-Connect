"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { Search, Activity, MapPin, ChevronRight, Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HOSPITALS } from "@/lib/data";

export default function Home() {
  const [search, setSearch] = useState("");

  const filteredHospitals = HOSPITALS.filter(
    (h) => h.name.toLowerCase().includes(search.toLowerCase()) || 
           h.type.toLowerCase().includes(search.toLowerCase()) ||
           h.map.toLowerCase().includes(search.toLowerCase())
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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
            <Link href="/admin/login" className="text-sm font-bold px-6 py-2.5 bg-slate-900 text-white rounded-full hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-[0_4px_16px_rgba(15,23,42,0.2)]">
              Admin Portal
            </Link>
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
          className="max-w-4xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-slate-200 shadow-sm text-xs font-bold uppercase tracking-wider text-slate-600 mb-6">
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            Coimbatore Elite Network
          </div>
          
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-gradient leading-[1.05] tracking-tight mb-8">
            Premium Care, <br /> Beautifully Curated.
          </h2>
          
          <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl leading-relaxed mb-10">
            Select a prestigious medical institution below to view real-time telemetry across Intensive Care, Blood Repositories, and Organ Availability.
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
                placeholder="Search hospitals or locations..."
                className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-slate-900 font-semibold placeholder:text-slate-400 placeholder:font-medium"
              />
            </div>
          </div>
        </motion.div>

        {/* Uncongested Airbnb Style Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredHospitals.map((hospital) => (
              <motion.div 
                layout 
                variants={itemVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                key={hospital.id} 
              >
                <Link href={`/hospital/${hospital.id}`} className="group block relative card-hover-fx">
                  {/* Large Edge-to-Edge Image Card */}
                  <div className="relative h-80 w-full rounded-[2rem] overflow-hidden mb-4 shadow-sm border border-slate-100">
                    <Image 
                      src={hospital.image} 
                      alt={hospital.name} 
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                    
                    {/* Status Badge overlay */}
                    <div className="absolute top-4 right-4 glass-panel px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                       <div className={`w-2 h-2 rounded-full ${hospital.status === "Critical Load" ? "bg-rose-500" : hospital.status === "Moderate" ? "bg-amber-500" : "bg-emerald-500"} animate-pulse`} />
                       <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">{hospital.status}</span>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full text-slate-900 flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-xl">
                      <ChevronRight size={20} />
                    </div>
                  </div>

                  {/* Clean Text Below */}
                  <div className="px-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-serif text-2xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{hospital.name}</h3>
                    </div>
                    <div className="flex justify-between items-center text-slate-500">
                      <div className="flex items-center gap-1.5 text-sm font-medium">
                        <MapPin size={14} />
                        {hospital.map}
                      </div>
                      <span className="text-sm font-semibold text-slate-400">{hospital.type}</span>
                    </div>
                  </div>
                </Link>
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
