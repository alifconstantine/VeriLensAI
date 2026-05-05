"use client";

import { motion } from "framer-motion";
import { Zap, Clock, Check } from "lucide-react";

export default function CreditsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-12">
      <div className="space-y-2">
        <h1 className="text-[36px] font-medium tracking-tight text-[#1c1c1e]">Credits & Billing</h1>
        <p className="text-[16px] text-[#555a6a]">Manage your balance and view transaction history.</p>
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
                50
              </span>
            </div>
            <p className="text-[16px] text-[#1c1c1e]">Credits Available</p>
          </div>
          <button className="rounded-full bg-[#1c1c1e] px-6 py-3 text-[14px] font-medium text-[#ffffff] transition-transform hover:scale-105 shadow-md">
            Auto-Refill: OFF
          </button>
        </div>
      </motion.div>

      {/* Top-Up Packages */}
      <div className="space-y-6">
        <h2 className="text-[22px] font-medium text-[#1c1c1e]">Top-up Packages</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Starter */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="group relative flex flex-col rounded-[20px] border border-[#e0e2e8] bg-[#ffffff] p-8 transition-all shadow-[0_4px_12px_rgba(5,0,56,0.06)]"
          >
            <h3 className="text-[22px] font-medium text-[#1c1c1e]">Starter</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-[36px] font-medium text-[#1c1c1e]">$10</span>
              <span className="text-[14px] text-[#555a6a]">/ 100 Credits</span>
            </div>
            <ul className="mt-6 flex-1 space-y-3 text-[14px] text-[#1c1c1e]">
              <li className="flex items-center gap-3"><Check className="h-5 w-5 text-[#1c1c1e]" /> Standard AI Models</li>
              <li className="flex items-center gap-3"><Check className="h-5 w-5 text-[#1c1c1e]" /> Email Support</li>
            </ul>
            <button className="mt-8 rounded-full border border-[#c7cad5] bg-transparent py-3 text-[14px] font-medium text-[#1c1c1e] transition-colors hover:bg-[#f7f8fa]">
              Buy Now
            </button>
          </motion.div>

          {/* Pro */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="group relative flex flex-col rounded-[20px] border-2 border-[#4262ff] bg-[#f5f3ff] p-8 transition-all shadow-[0_12px_32px_-4px_rgba(5,0,56,0.08)]"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-[#4262ff] bg-[#f5f3ff] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#4262ff]">
              Most Popular
            </div>
            <h3 className="text-[22px] font-medium text-[#1c1c1e]">Pro</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-[36px] font-medium text-[#1c1c1e]">$25</span>
              <span className="text-[14px] text-[#555a6a]">/ 300 Credits</span>
            </div>
            <ul className="mt-6 flex-1 space-y-3 text-[14px] text-[#1c1c1e]">
              <li className="flex items-center gap-3"><Check className="h-5 w-5 text-[#4262ff]" /> Advanced AI Models</li>
              <li className="flex items-center gap-3"><Check className="h-5 w-5 text-[#4262ff]" /> Priority Support</li>
              <li className="flex items-center gap-3"><Check className="h-5 w-5 text-[#4262ff]" /> Batch Scanning</li>
            </ul>
            <button className="mt-8 rounded-full bg-[#4262ff] py-3 text-[14px] font-medium text-[#ffffff] transition-colors hover:bg-[#2a41b6]">
              Buy Now
            </button>
          </motion.div>

          {/* Max */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="group relative flex flex-col rounded-[20px] bg-[#1c1c1e] p-8 transition-all shadow-[0_4px_12px_rgba(5,0,56,0.06)]"
          >
            <h3 className="text-[22px] font-medium text-[#ffffff]">Max</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-[36px] font-medium text-[#ffffff]">$50</span>
              <span className="text-[14px] text-[#a5a8b5]">/ 800 Credits</span>
            </div>
            <ul className="mt-6 flex-1 space-y-3 text-[14px] text-[#ffffff]">
              <li className="flex items-center gap-3"><Check className="h-5 w-5 text-[#ffffff]" /> All Pro Features</li>
              <li className="flex items-center gap-3"><Check className="h-5 w-5 text-[#ffffff]" /> API Access</li>
              <li className="flex items-center gap-3"><Check className="h-5 w-5 text-[#ffffff]" /> Custom Webhooks</li>
            </ul>
            <button className="mt-8 rounded-full bg-[#ffffff] py-3 text-[14px] font-medium text-[#1c1c1e] transition-colors hover:bg-[#f7f8fa]">
              Buy Now
            </button>
          </motion.div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="space-y-6">
        <h2 className="text-[22px] font-medium text-[#1c1c1e]">Transaction History</h2>
        <div className="overflow-hidden rounded-[12px] border border-[#e0e2e8] bg-[#ffffff] shadow-[0_4px_12px_rgba(5,0,56,0.06)]">
          <table className="w-full text-left text-[14px] text-[#1c1c1e]">
            <thead className="border-b border-[#e0e2e8] bg-[#f7f8fa] text-[11px] uppercase text-[#8e91a0] font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4 text-right">Credits Used</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e0e2e8]">
              {[
                { date: "May 6, 2026", action: "Image Scan", credits: -1 },
                { date: "May 5, 2026", action: "Text Scan", credits: -1 },
                { date: "May 1, 2026", action: "Top-up Starter", credits: "+100" },
              ].map((tx, i) => (
                <tr key={i} className="transition-colors hover:bg-[#fafbfc]">
                  <td className="px-6 py-4 flex items-center gap-2"><Clock className="h-4 w-4 text-[#8e91a0]" /> {tx.date}</td>
                  <td className="px-6 py-4 font-medium">{tx.action}</td>
                  <td className={`px-6 py-4 text-right font-medium ${tx.credits.toString().includes('+') ? 'text-[#00b473]' : 'text-[#600000]'}`}>
                    {tx.credits}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
