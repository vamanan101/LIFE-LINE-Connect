"use client";

import { motion } from "framer-motion";
import { Activity, Shield, LogOut, BedDouble, Droplets, Heart, Plus, Minus, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { HOSPITALS } from "@/lib/data";

export default function AdminDashboard() {
  // Simulating KMCH data locally for purely visual UI demonstration
  const [data, setData] = useState(HOSPITALS[0]);
  const [saved, setSaved] = useState(false);

  const updateWard = (ward: "icu_available" | "general_available" | "maternity_available", increment: number) => {
    setData((prev) => ({
      ...prev,
      wards: {
        ...prev.wards,
        [ward]: Math.max(0, Math.min(prev.wards[ward] + increment, prev.wards[ward.replace("_available", "_total") as keyof typeof prev.wards]))
      }
    }));
  };

  const updateBlood = (type: keyof typeof data.blood_units, increment: number) => {
    setData((prev) => ({
      ...prev,
      blood_units: {
        ...prev.blood_units,
        [type]: Math.max(0, prev.blood_units[type] + increment)
      }
    }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const DataStepper = ({ label, value, max, onInc, onDec }: any) => (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100/50 shadow-sm hover:shadow-md transition-shadow group">
      <div>
        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest">{label}</h4>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-3xl font-bold tabular-nums text-slate-900 leading-none">{value}</span>
          {max && <span className="text-xs font-semibold text-slate-400">/ {max}</span>}
        </div>
      </div>
      <div className="flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <motion.button whileTap={{ scale: 0.85 }} onClick={onInc} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-colors">
          <Plus size={16} strokeWidth={3} />
        </motion.button>
        <motion.button whileTap={{ scale: 0.85 }} onClick={onDec} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-colors">
          <Minus size={16} strokeWidth={3} />
        </motion.button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden text-slate-900 selection:bg-blue-200 font-sans">
      
      {/* Massive Glass Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-100 flex flex-col p-6 shadow-[8px_0_30px_rgb(0,0,0,0.02)] z-20">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Shield size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="font-serif text-lg font-bold tracking-tight text-slate-900 leading-none">Hospital Command</h1>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Uplink</span>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-2xl font-bold cursor-pointer transition-colors shadow-sm">
            <BedDouble size={18} />
            Capacity & Flow
          </div>
          <div className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-2xl font-bold cursor-pointer transition-colors">
            <Droplets size={18} />
            Blood Repository
          </div>
          <div className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-2xl font-bold cursor-pointer transition-colors">
            <Heart size={18} />
            Organ Logistics
          </div>
        </nav>

        <div className="mt-auto">
          <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Connected Inst.</p>
              <p className="font-serif font-bold tracking-tight mt-0.5">{data.name}</p>
            </div>
          </div>
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-rose-500 hover:bg-rose-50 rounded-2xl font-bold transition-colors">
            <LogOut size={18} /> Sever Uplink
          </Link>
        </div>
      </aside>

      {/* Main Command Dashboard */}
      <main className="flex-1 p-10 overflow-y-auto">
        <motion.div 
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
          }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <motion.header variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } }} className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-serif text-4xl font-bold text-slate-900 tracking-tight leading-none mb-2">Capacity & Flow</h2>
              <p className="text-sm font-medium text-slate-500">Modify telemetry. Changes are instantly broadcast to dispatchers.</p>
            </div>
            
            <button 
              onClick={handleSave}
              className={`px-8 py-3.5 rounded-full font-bold flex items-center gap-2 transition-all shadow-[0_4px_16px_rgba(15,23,42,0.1)] ${saved ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-slate-800 hover:scale-[1.02] active:scale-95'}`}
            >
              {saved ? (
                <><CheckCircle2 size={18} /> Broadcast Confirmed</>
              ) : (
                <><Activity size={18} className="animate-pulse" /> Broadcast Telemetry</>
              )}
            </button>
          </motion.header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Intensive Care Unit Panel */}
            <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } }} className="bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100">
              <div className="flex items-center gap-4 mb-8 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-[1.2rem] bg-slate-50 text-slate-900 flex items-center justify-center shadow-sm">
                  <BedDouble size={22} />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold tracking-tight">Ward Management</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Patient Flow Logistics</p>
                </div>
              </div>

              <div className="space-y-4">
                <DataStepper 
                  label="ICU Availability" 
                  value={data.wards.icu_available} 
                  max={data.wards.icu_total} 
                  onInc={() => updateWard("icu_available", 1)} 
                  onDec={() => updateWard("icu_available", -1)} 
                />
                <DataStepper 
                  label="General Wards" 
                  value={data.wards.general_available} 
                  max={data.wards.general_total} 
                  onInc={() => updateWard("general_available", 1)} 
                  onDec={() => updateWard("general_available", -1)} 
                />
                <DataStepper 
                  label="Maternity Wing" 
                  value={data.wards.maternity_available} 
                  max={data.wards.maternity_total} 
                  onInc={() => updateWard("maternity_available", 1)} 
                  onDec={() => updateWard("maternity_available", -1)} 
                />
              </div>
            </motion.div>

            {/* Blood Supply Unit Panel */}
            <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } }} className="bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100">
              <div className="flex items-center gap-4 mb-8 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-[1.2rem] bg-rose-50 text-rose-500 flex items-center justify-center shadow-sm">
                  <Droplets size={22} />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold tracking-tight">Blood Repository</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Critical Typed Inventory (Units)</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <DataStepper label="A+" value={data.blood_units.a_pos} onInc={() => updateBlood("a_pos", 1)} onDec={() => updateBlood("a_pos", -1)} />
                <DataStepper label="O+" value={data.blood_units.o_pos} onInc={() => updateBlood("o_pos", 1)} onDec={() => updateBlood("o_pos", -1)} />
                <DataStepper label="B+" value={data.blood_units.b_pos} onInc={() => updateBlood("b_pos", 1)} onDec={() => updateBlood("b_pos", -1)} />
                <DataStepper label="O-" value={data.blood_units.o_neg} onInc={() => updateBlood("o_neg", 1)} onDec={() => updateBlood("o_neg", -1)} />
                <DataStepper label="AB+" value={data.blood_units.ab_pos} onInc={() => updateBlood("ab_pos", 1)} onDec={() => updateBlood("ab_pos", -1)} />
              </div>
            </motion.div>

          </div>

        </motion.div>
      </main>

    </div>
  );
}
