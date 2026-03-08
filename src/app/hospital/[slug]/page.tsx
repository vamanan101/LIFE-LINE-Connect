"use client";

import { useParams } from "next/navigation";
import { HOSPITALS } from "@/lib/data";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Activity, BedDouble, Droplets, Heart, ChevronLeft, MapPin, Navigation } from "lucide-react";
import Link from "next/link";

export default function HospitalPortfolio() {
  const params = useParams();
  const hospital = HOSPITALS.find((h) => h.id === params.slug);

  if (!hospital) {
    return notFound();
  }

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  // Helper macro components
  const ProgressRing = ({ available, total, title, icon: Icon, colorClass }: any) => {
    const percentage = Math.round((available / total) * 100) || 0;
    const isCritical = percentage < 20;
    const strokeClass = isCritical ? "stroke-rose-500" : "stroke-emerald-500";
    const bgClass = isCritical ? "bg-rose-50" : "bg-emerald-50";
    const textClass = isCritical ? "text-rose-600" : "text-emerald-700";

    return (
      <div className={`flex flex-col items-center justify-center p-6 glass-panel rounded-3xl border border-slate-100 shadow-sm card-hover-fx ${colorClass || ""}`}>
        <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90 pointer-events-none" viewBox="0 0 36 36">
            <path className="stroke-slate-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" />
            <motion.path 
              initial={{ strokeDasharray: "0, 100" }}
              animate={{ strokeDasharray: `${percentage}, 100` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className={strokeClass} 
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
              fill="none" 
              strokeWidth="3" 
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-slate-900">
            <Icon size={20} className={isCritical ? "text-rose-500" : "text-emerald-500"} />
          </div>
        </div>
        <div className="text-center">
          <h4 className="text-2xl font-bold tabular-nums text-slate-900 leading-none mb-1">{available}</h4>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">/ {total} Total</p>
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${bgClass} ${textClass}`}>
            {title}
          </span>
        </div>
      </div>
    );
  };

  const BloodCard = ({ type, units }: { type: string, units: number }) => (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-[0_2px_10px_rgba(15,23,42,0.03)] flex flex-col justify-between hover:-translate-y-1 transition-transform">
      <div className="flex justify-between items-start mb-6">
        <span className="text-sm font-bold text-slate-500 uppercase">{type}</span>
        <Droplets size={16} className={units < 20 ? "text-rose-500" : "text-slate-400"} />
      </div>
      <div>
        <span className="text-3xl font-bold tabular-nums text-slate-900">{units}</span>
        <span className="text-xs text-slate-400 font-medium ml-1">units</span>
      </div>
    </div>
  );

  const OrganCard = ({ type, count }: { type: string, count: number }) => (
    <div className="glass-panel p-5 rounded-2xl flex items-center justify-between border border-white">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-[1rem] flex items-center justify-center shadow-sm ${count > 0 ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-400"}`}>
          <Heart size={20} />
        </div>
        <div>
          <h5 className="font-bold text-slate-900 text-lg">{type}</h5>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{count > 0 ? 'Ready for transport' : 'Unavailable'}</p>
        </div>
      </div>
      <div className="text-3xl font-bold tabular-nums text-slate-900">{count}</div>
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-rose-200">
      
      {/* Immersive Hero Header */}
      <div className="relative h-[60vh] min-h-[500px] w-full bg-slate-900 flex flex-col overflow-hidden">
        {/* Absolute Background Image */}
        <div className="absolute inset-0 z-0">
          <img src={hospital.image} alt={hospital.name} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        </div>

        {/* Global Navigation Override */}
        <nav className="relative z-20 w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center text-white">
          <Link href="/" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:text-blue-300 transition-colors">
             <div className="p-2 glass-panel border border-white/20 rounded-full group-hover:-translate-x-1 transition-transform">
               <ChevronLeft size={16} />
             </div>
             Back to Terminal
          </Link>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            <Activity size={16} className="text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider">Live Telemetry Active</span>
          </div>
        </nav>

        {/* Hero Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 max-w-7xl mx-auto px-6 mt-auto pb-16 w-full"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
              hospital.status === "Critical Load" ? "bg-rose-500 text-white" : "bg-emerald-500 text-white"
            } shadow-lg`}>
              {hospital.status}
            </span>
            <span className="text-white/80 font-medium text-sm border-l border-white/20 pl-3">{hospital.type}</span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            {hospital.name}
          </h1>
          
          <div className="flex items-center gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span className="font-medium text-lg">{hospital.map}</span>
            </div>
            <button className="flex items-center gap-2 text-sm font-bold hover:text-white transition-colors">
               <Navigation size={16} /> Get Directions
            </button>
          </div>
        </motion.div>
      </div>

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-6 pb-24 -mt-8 relative z-30">
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="space-y-10"
        >
          {/* Section 1: Intensive & Ward Availability */}
          <motion.section variants={fadeUp}>
            <div className="flex items-center justify-between mb-6 pt-10">
              <h2 className="font-serif text-3xl font-bold text-slate-900 tracking-tight">Ward Availability</h2>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Updated {hospital.last_updated}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ProgressRing available={hospital.wards.icu_available} total={hospital.wards.icu_total} title="ICU Beds" icon={BedDouble} colorClass={hospital.glow} />
              <ProgressRing available={hospital.wards.general_available} total={hospital.wards.general_total} title="General Wards" icon={BedDouble} />
              <ProgressRing available={hospital.wards.maternity_available} total={hospital.wards.maternity_total} title="Maternity" icon={BedDouble} />
            </div>
          </motion.section>

           {/* Layout Grid for Blood & Organs */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              
              {/* Section 2: Blood Bank */}
              <motion.section variants={fadeUp}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                    <Droplets size={20} />
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-slate-900 tracking-tight">Blood Repository</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-3 gap-4">
                  <BloodCard type="A+" units={hospital.blood_units.a_pos} />
                  <BloodCard type="O+" units={hospital.blood_units.o_pos} />
                  <BloodCard type="B+" units={hospital.blood_units.b_pos} />
                  <BloodCard type="O-" units={hospital.blood_units.o_neg} />
                  <BloodCard type="AB+" units={hospital.blood_units.ab_pos} />
                </div>
              </motion.section>

              {/* Section 3: Organ Availability */}
              <motion.section variants={fadeUp}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Heart size={20} />
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-slate-900 tracking-tight">Organ Donor Registry</h2>
                </div>
                <div className="space-y-4">
                  <OrganCard type="Heart" count={hospital.organs.heart} />
                  <OrganCard type="Liver" count={hospital.organs.liver} />
                  <OrganCard type="Kidneys" count={hospital.organs.kidney} />
                  <OrganCard type="Corneas" count={hospital.organs.cornea} />
                </div>
              </motion.section>

           </div>
           
        </motion.div>
      </div>

    </main>
  );
}
