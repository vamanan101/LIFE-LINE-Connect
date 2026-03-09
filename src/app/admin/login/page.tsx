"use client";

import { motion } from "framer-motion";
import { Activity, Shield, KeyRound, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/admin/dashboard");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center relative overflow-hidden text-slate-900 selection:bg-blue-200">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Global Navigation Override */}
      <nav className="absolute top-0 w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center text-white z-20">
        <Link href="/" className="group flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:text-white/80 transition-colors">
            <div className="flex items-center gap-2">
              <Activity size={18} className="text-blue-400 group-hover:scale-110 transition-transform" />
              <span className="font-serif">LIFE LINE <span className="text-white/60">Connect</span></span>
            </div>
        </Link>
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          <Shield size={14} className="text-emerald-400" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Secure Terminal</span>
        </div>
      </nav>

      {/* Massive Sleek Login Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative z-10 w-full max-w-lg px-6"
      >
        <div className="bg-white/5 backdrop-blur-2xl p-10 md:p-14 rounded-[3rem] border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.4)] relative overflow-hidden">
          {/* Shimmer Effect */}
          <div className="absolute top-0 left-[-100%] w-[200%] h-1 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent animate-shimmer" />

          <div className="flex flex-col items-center justify-center text-center mb-10">
            <div className="w-20 h-20 rounded-[1.8rem] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 mb-8 border border-white/20">
              <Shield size={36} strokeWidth={2} />
            </div>
            <h2 className="font-serif text-3xl font-bold text-white tracking-tight mb-2">Hospital Command</h2>
            <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-[280px]">
              Authenticate to access live telemetry manipulation and routing directives.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                  <Activity size={18} />
                </div>
                <input 
                  type="text" 
                  required
                  placeholder="Institution ID" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pr-5 pl-12 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all font-medium"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                  <KeyRound size={18} />
                </div>
                <input 
                  type="password" 
                  required
                  placeholder="Security Passkey" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pr-5 pl-12 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all font-medium"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-white text-slate-900 rounded-full py-4 px-6 font-bold flex items-center justify-center gap-2 hover:bg-slate-100 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70 disabled:hover:scale-100"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Establish Uplink <ChevronRight size={18} />
                </>
              )}
            </button>
          </form>

        </div>
      </motion.div>
    </main>
  );
}
