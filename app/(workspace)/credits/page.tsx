"use client";

import { motion } from "framer-motion";
import { Zap, Check, Sparkles, Building2 } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function CreditsPage() {
  const user = useQuery(api.users.getUser);

  const handleUpgrade = (tierName: string) => {
    alert(`Payment integration for the ${tierName} plan is coming soon!`);
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-12 pb-12">
      <div className="space-y-2">
        <h1 className="text-[36px] font-medium tracking-tight text-[#1c1c1e]">Credits & Billing</h1>
        <p className="text-[16px] text-[#555a6a]">Manage your balance and subscription plans.</p>
      </div>

      {/* Current Balance Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[24px] bg-[#ffd02f] p-8 shadow-[0_12px_32px_-4px_rgba(5,0,56,0.08)]"
      >
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#fcb900]/20 blur-[80px]" />
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-[13px] font-bold text-[#746019] uppercase tracking-wider">Current Balance</p>
            <div className="flex items-center gap-3">
              <Zap className="h-10 w-10 text-[#1c1c1e]" />
              <span className="text-[64px] font-medium text-[#1c1c1e] tracking-tight">
                {user === undefined ? "..." : user === null ? "0" : user.credits}
              </span>
            </div>
            <p className="text-[16px] text-[#1c1c1e]">Credits Available</p>
          </div>
          <button className="rounded-full bg-[#1c1c1e] px-6 py-3 text-[14px] font-medium text-[#ffffff] transition-transform hover:scale-105 shadow-md">
            Auto-Refill: OFF
          </button>
        </div>
      </motion.div>

      {/* Subscription Plans (Matching Landing Page) */}
      <div className="space-y-6">
        <h2 className="text-[22px] font-medium text-[#1c1c1e]">Subscription Plans</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 items-stretch">
          
          {/* Basic */}
          <motion.div 
            whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0, 0, 0, 0.05)" }}
            className="flex flex-col h-full rounded-[16px] border border-[#e0e2e8] bg-white p-8 transition-all duration-300"
          >
            <div className="mb-4">
              <div className="flex h-10 w-10 mb-4 items-center justify-center rounded-xl bg-[#f7f8fa] border border-[#e0e2e8]">
                <Zap className="h-5 w-5 text-[#555a6a]" />
              </div>
              <div className="text-[20px] font-semibold text-[#1c1c1e] mb-1">VeriLens Basic</div>
              <div className="text-[13px] text-[#555a6a]">For individuals and light scanning needs.</div>
            </div>
            
            <div className="mb-6 flex items-baseline gap-1">
              <span className="text-[36px] font-bold tracking-tight text-[#1c1c1e]">Free</span>
            </div>
            
            <ul className="mb-8 flex flex-1 flex-col gap-3">
              {[
                "20 scans per month", 
                "Image analysis", 
                "Basic forensic reports", 
                "Scan history"
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-[13px] text-[#555a6a]">
                  <Check size={16} className="text-[#1c1c1e] shrink-0 mt-0.5" /> 
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <button 
              onClick={() => handleUpgrade("Basic")}
              className="mt-auto flex w-full items-center justify-center rounded-full border border-[#e0e2e8] bg-transparent py-3 px-6 text-[14px] font-medium text-[#1c1c1e] transition-all hover:bg-gray-50 hover:border-[#1c1c1e]"
            >
              Current Plan
            </button>
          </motion.div>

          {/* Pro */}
          <motion.div 
            whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0, 0, 0, 0.05)" }}
            className="relative flex flex-col h-full rounded-[16px] bg-[#1c1c1e] p-8 transition-all duration-300 text-white"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#1c1c1e]">
              Save 20%
            </div>
            <div className="mb-4 pt-2">
              <div className="flex h-10 w-10 mb-4 items-center justify-center rounded-xl bg-[#ffd02f]/20 border border-[#ffd02f]/30">
                <Sparkles className="h-5 w-5 text-[#ffd02f]" />
              </div>
              <div className="text-[20px] font-semibold text-white mb-1">VeriLens Pro</div>
              <div className="text-[13px] text-white/60">For professionals and newsrooms.</div>
            </div>
            
            <div className="mb-6 flex items-baseline gap-1">
              <span className="text-[36px] font-bold tracking-tight text-white">$29</span>
              <span className="text-[14px] text-white/50">/ month</span>
            </div>
            
            <ul className="mb-8 flex flex-1 flex-col gap-3">
              {[
                "Everything in Basic",
                "Unlimited scans",
                "Video analysis",
                "PDF export",
                "Origin tracing"
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-[13px] text-white/80">
                  <Check size={16} className="text-white shrink-0 mt-0.5" /> 
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <button 
              onClick={() => handleUpgrade("Pro")}
              className="mt-auto flex w-full items-center justify-center rounded-full bg-white py-3 px-6 text-[14px] font-medium text-[#1c1c1e] transition-all hover:bg-[#f0f0f0]"
            >
              Upgrade to Pro
            </button>
          </motion.div>

          {/* Enterprise */}
          <motion.div 
            whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0, 0, 0, 0.05)" }}
            className="flex flex-col h-full rounded-[16px] border border-[#e0e2e8] bg-white p-8 transition-all duration-300"
          >
            <div className="mb-4">
              <div className="flex h-10 w-10 mb-4 items-center justify-center rounded-xl bg-[#f5f3ff] border border-[#4262ff]/20">
                <Building2 className="h-5 w-5 text-[#4262ff]" />
              </div>
              <div className="text-[20px] font-semibold text-[#1c1c1e] mb-1">Enterprise</div>
              <div className="text-[13px] text-[#555a6a]">For teams and organizations at scale.</div>
            </div>
            
            <div className="mb-6 flex items-baseline gap-1">
              <span className="text-[36px] font-bold tracking-tight text-[#1c1c1e]">Custom</span>
            </div>
            
            <ul className="mb-8 flex flex-1 flex-col gap-3">
              {[
                "Everything in Pro",
                "API access",
                "Custom integrations",
                "Dedicated support",
                "SLA guarantee"
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-[13px] text-[#555a6a]">
                  <Check size={16} className="text-[#1c1c1e] shrink-0 mt-0.5" /> 
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <button 
              onClick={() => handleUpgrade("Enterprise")}
              className="mt-auto flex w-full items-center justify-center rounded-full border border-[#e0e2e8] bg-transparent py-3 px-6 text-[14px] font-medium text-[#1c1c1e] transition-all hover:bg-gray-50 hover:border-[#1c1c1e]"
            >
              Contact Sales
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
