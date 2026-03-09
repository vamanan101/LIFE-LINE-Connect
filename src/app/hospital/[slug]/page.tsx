"use client";

import { useParams } from "next/navigation";
import { HOSPITALS } from "@/lib/data";
import { notFound } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { Activity, BedDouble, Droplets, Heart, ChevronLeft, MapPin, Navigation, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const MOCK_HISTORY = [
  { time: "72h", load: 65, avg: 50 },
  { time: "60h", load: 78, avg: 55 },
  { time: "48h", load: 85, avg: 60 },
  { time: "36h", load: 95, avg: 65 },
  { time: "24h", load: 88, avg: 70 },
  { time: "12h", load: 92, avg: 75 },
  { time: "Now", load: 89, avg: 80 },
];

export default function HospitalPortfolio() {
  const params = useParams();
  const hospital = HOSPITALS.find((h) => h.id === params.slug);

  if (!hospital) {
    return notFound();
  }

  // Animation variants
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };

  // Sleek Progress Ring Macro Widget
  const ProgressRing = ({ available, total, title, icon: Icon }: any) => {
    const percentage = Math.round((available / total) * 100) || 0;
    const isCritical = percentage < 20;

    return (
      <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 flex flex-col items-center relative overflow-hidden group border border-slate-100/50">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="relative w-36 h-36 mb-6 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90 pointer-events-none" viewBox="0 0 36 36">
            <path className="stroke-slate-50" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="2.5" />
            <motion.path 
              initial={{ strokeDasharray: "0, 100" }}
              animate={{ strokeDasharray: `${percentage}, 100` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className={isCritical ? "stroke-rose-500" : "stroke-slate-900"} 
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
              fill="none" 
              strokeWidth="2.5" 
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center mt-1">
            <span className={`text-4xl font-bold tracking-tighter leading-none ${isCritical ? 'text-rose-500' : 'text-slate-900'}`}>{available}</span>
            <span className="text-xs font-semibold text-slate-400 mt-1">/ {total}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <Icon size={18} className="text-slate-400" />
          <h4 className="font-semibold text-slate-900 text-lg">{title}</h4>
        </div>
        
        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${isCritical ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-500'}`}>
          {isCritical ? 'Critical Load' : 'Optimal Capacity'}
        </span>
      </div>
    );
  };

  // Sleek Horizontal Blood Row
  const BloodRow = ({ type, units, max = 300 }: { type: string, units: number, max?: number }) => {
    const isLow = units < 25;
    const percentage = Math.min((units / max) * 100, 100);
    
    return (
      <div className="flex items-center gap-5 group">
        <div className="w-12 font-bold text-slate-900 text-lg tracking-tight tabular-nums flex-shrink-0">{type}</div>
        <div className="flex-1 h-2.5 bg-slate-50 rounded-full overflow-hidden relative">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className={`absolute top-0 left-0 h-full rounded-full ${isLow ? 'bg-rose-500' : 'bg-slate-900'}`}
          />
        </div>
        <div className={`w-16 text-right font-bold tabular-nums tracking-tight ${isLow ? 'text-rose-500' : 'text-slate-500'}`}>
           {units} <span className="text-xs font-semibold opacity-60">u</span>
        </div>
      </div>
    );
  };

  // Sleek Organ Pill
  const OrganPill = ({ type, count }: { type: string, count: number }) => {
    const isAvailable = count > 0;
    return (
      <div className={`p-6 rounded-[2rem] border transition-colors duration-300 ${isAvailable ? 'border-indigo-100 bg-indigo-50/30' : 'border-slate-100 bg-slate-50/50'}`}>
         <h4 className="text-sm font-semibold text-slate-500 mb-3">{type}</h4>
         <div className="flex items-baseline gap-2">
           <span className={`text-4xl font-bold tracking-tighter leading-none ${isAvailable ? 'text-indigo-600' : 'text-slate-300'}`}>{count}</span>
           {isAvailable && <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Ready</span>}
         </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-rose-200 font-sans">
      
      {/* Immersive Hero Header - Kept clean and majestic */}
      <div className="relative h-[65vh] min-h-[550px] w-full bg-slate-900 flex flex-col overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={hospital.image} alt={hospital.name} fill className="object-cover opacity-60" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-900/20" />
        </div>

        <nav className="relative z-20 w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center text-white">
          <Link href="/" className="group flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:text-white/80 transition-colors">
             <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-full group-hover:-translate-x-1 transition-transform border border-white/10">
               <ChevronLeft size={16} />
             </div>
             Back to Terminal
          </Link>
          <div className="flex items-center gap-2.5 bg-black/20 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10">
            <Activity size={16} className="text-emerald-400 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">Live Telemetry Active</span>
          </div>
        </nav>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-20 max-w-7xl mx-auto px-6 mt-auto pb-20 w-full"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest ${
              hospital.status === "Critical Load" ? "bg-rose-500 text-white" : "bg-emerald-500 text-white"
            } shadow-lg shadow-${hospital.color}-500/20`}>
              {hospital.status}
            </span>
            <span className="text-white/70 font-semibold text-sm tracking-wide">{hospital.type}</span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
            {hospital.name}
          </h1>
          
          <div className="flex items-center gap-8 text-white/80">
            <div className="flex items-center gap-2.5 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/10">
              <MapPin size={18} className="text-white/60" />
              <span className="font-medium text-sm">{hospital.map}</span>
            </div>
            <button className="flex items-center gap-2 text-sm font-bold hover:text-white transition-colors group">
               <Navigation size={16} className="group-hover:translate-x-1 transition-transform" /> 
               Get Directions
            </button>
          </div>
        </motion.div>
      </div>

      {/* Main Dashboard - Redesigned for Absolute Premium Sleekness */}
      <div className="max-w-7xl mx-auto px-6 pb-32 -mt-10 relative z-30">
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="space-y-12"
        >
          {/* Section 1: Ward Availability (Sleek Macro Rings) */}
          <motion.section variants={fadeUp}>
            <div className="flex items-center justify-between mb-8 px-2">
              <h2 className="font-serif text-4xl font-bold text-slate-900 tracking-tight">Ward Availability</h2>
              <div className="flex items-center gap-2 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Updated {hospital.last_updated}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ProgressRing available={hospital.wards.icu_available} total={hospital.wards.icu_total} title="ICU Beds" icon={BedDouble} />
              <ProgressRing available={hospital.wards.general_available} total={hospital.wards.general_total} title="General Wards" icon={BedDouble} />
              <ProgressRing available={hospital.wards.maternity_available} total={hospital.wards.maternity_total} title="Maternity" icon={BedDouble} />
            </div>
          </motion.section>

           {/* Layout Grid for Blood & Organs - Bento Style */}
           <motion.section variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Blood Bank Dashboard */}
              <div className="bg-white rounded-[3rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100/50">
                <div className="flex items-start justify-between mb-10">
                   <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-[1.5rem] bg-rose-50 flex items-center justify-center text-rose-500">
                        <Droplets size={26} strokeWidth={2.5} />
                      </div>
                      <div>
                        <h3 className="font-serif text-3xl font-bold text-slate-900 tracking-tight">Blood Repository</h3>
                        <p className="text-sm font-medium text-slate-500 mt-1">Live critical typed inventory</p>
                      </div>
                   </div>
                </div>
                
                <div className="space-y-6">
                   <BloodRow type="A+" units={hospital.blood_units.a_pos} />
                   <BloodRow type="O+" units={hospital.blood_units.o_pos} />
                   <BloodRow type="B+" units={hospital.blood_units.b_pos} />
                   <BloodRow type="O-" units={hospital.blood_units.o_neg} max={100} />
                   <BloodRow type="AB+" units={hospital.blood_units.ab_pos} max={150} />
                </div>
              </div>

              {/* Organ Donor Registry Dashboard */}
              <div className="bg-white rounded-[3rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100/50 flex flex-col">
                <div className="flex items-center gap-5 mb-10">
                  <div className="w-14 h-14 rounded-[1.5rem] bg-indigo-50 flex items-center justify-center text-indigo-500">
                    <Heart size={26} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="font-serif text-3xl font-bold text-slate-900 tracking-tight">Organ Registry</h3>
                    <p className="text-sm font-medium text-slate-500 mt-1">Immediate transport availability</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5 flex-1 content-start">
                  <OrganPill type="Heart" count={hospital.organs.heart} />
                  <OrganPill type="Liver" count={hospital.organs.liver} />
                  <OrganPill type="Kidneys" count={hospital.organs.kidney} />
                  <OrganPill type="Corneas" count={hospital.organs.cornea} />
                </div>
              </div>

           </motion.section>

           {/* Section 4: Historical Telemetry Visualization (Massive Premium Widget) */}
           <motion.section variants={fadeUp}>
             <div className="bg-white rounded-[3.5rem] p-12 shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-slate-100/50 w-full mt-4">
               
               <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                  <div className="flex items-center gap-5 mb-6 md:mb-0">
                    <div className="w-14 h-14 rounded-[1.5rem] bg-slate-900 text-white flex items-center justify-center shadow-lg shadow-slate-900/20">
                      <TrendingUp size={26} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h2 className="font-serif text-4xl font-bold text-slate-900 tracking-tight leading-none mb-2">ICU Load Telemetry</h2>
                      <p className="text-sm font-medium text-slate-500">72-Hour Historical Utilization Trend</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 bg-slate-50 px-5 py-3 rounded-full border border-slate-100">
                    <div className="flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                      <div className={`w-2.5 h-2.5 rounded-full ${hospital.status === "Critical Load" ? 'bg-rose-500' : 'bg-slate-900'}`} /> 
                      Current Load
                    </div>
                    <div className="flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-200" /> 
                      City Average
                    </div>
                  </div>
               </div>

               <div className="h-[400px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={MOCK_HISTORY} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                     <defs>
                       <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor={hospital.status === "Critical Load" ? "#f43f5e" : "#0f172a"} stopOpacity={0.15}/>
                         <stop offset="95%" stopColor={hospital.status === "Critical Load" ? "#f43f5e" : "#0f172a"} stopOpacity={0}/>
                       </linearGradient>
                       <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#e2e8f0" stopOpacity={0.4}/>
                         <stop offset="95%" stopColor="#e2e8f0" stopOpacity={0}/>
                       </linearGradient>
                     </defs>
                     <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#94a3b8', fontWeight: 600 }} dy={20} />
                     <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#94a3b8', fontWeight: 600 }} dx={-10} />
                     <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
                     <Tooltip 
                       contentStyle={{ borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 20px 40px rgba(15,23,42,0.08)', padding: '16px 24px' }}
                       itemStyle={{ fontWeight: 700, color: '#0f172a', fontSize: '16px' }}
                       labelStyle={{ color: '#64748b', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}
                       cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                     />
                     <Area type="monotone" dataKey="avg" stroke="#cbd5e1" strokeWidth={3} fillOpacity={1} fill="url(#colorAvg)" activeDot={{ r: 6, fill: '#cbd5e1', stroke: '#fff', strokeWidth: 3 }} />
                     <Area type="monotone" dataKey="load" stroke={hospital.status === "Critical Load" ? "#e11d48" : "#0f172a"} strokeWidth={4} fillOpacity={1} fill="url(#colorLoad)" activeDot={{ r: 8, fill: hospital.status === "Critical Load" ? "#e11d48" : "#0f172a", stroke: '#fff', strokeWidth: 4, shadow: '0 4px 12px rgba(0,0,0,0.2)' }} />
                   </AreaChart>
                 </ResponsiveContainer>
               </div>
               
             </div>
           </motion.section>
           
        </motion.div>
      </div>

    </main>
  );
}
