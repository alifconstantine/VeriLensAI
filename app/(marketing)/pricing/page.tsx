"use client";

import { Check, Zap, Sparkles, Building2 } from "lucide-react";
import { Topbar } from "@/components/workspace/topbar";

export default function PricingPage() {
  const handleUpgrade = (tierName: string) => {
    alert(`Payment integration for the ${tierName} plan is coming soon!`);
  };

  return (
    <div className="min-h-screen w-full bg-[#ffffff] text-[#1c1c1e] font-sans">
      <Topbar />
      
      <div className="mx-auto w-full max-w-6xl space-y-12 pb-12">
        <div className="space-y-4 text-center max-w-3xl mx-auto pt-24">
          <h1 className="text-[48px] font-medium tracking-tight text-[#1c1c1e] dark:text-[#ffffff] leading-[1.1]">
            Simple, transparent pricing
          </h1>
          <p className="text-[18px] text-[#555a6a] dark:text-[#a5a8b5]">
            Choose the perfect plan for your AI detection needs. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start px-6">
          {/* Tier 1: Starter */}
          <div className="relative flex flex-col rounded-[24px] border border-[#e0e2e8] dark:border-white/10 bg-[#ffffff] dark:bg-[#1a1a1c] p-8 shadow-[0_12px_32px_-4px_rgba(5,0,56,0.04)] transition-transform hover:-translate-y-1 duration-300">
            <div className="mb-6 space-y-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f7f8fa] dark:bg-white/5 border border-[#e0e2e8] dark:border-white/10">
                <Zap className="h-6 w-6 text-[#555a6a] dark:text-[#a5a8b5]" />
              </div>
              <h2 className="text-[24px] font-medium text-[#1c1c1e] dark:text-[#ffffff] pt-4">Starter</h2>
              <p className="text-[14px] text-[#555a6a] dark:text-[#8e91a0]">For occasional checks</p>
            </div>
            
            <div className="mb-6 flex items-baseline gap-1">
              <span className="text-[48px] font-bold text-[#1c1c1e] dark:text-[#ffffff] tracking-tight leading-none">$0</span>
              <span className="text-[14px] text-[#555a6a] dark:text-[#8e91a0] font-medium">/ forever</span>
            </div>

            <button 
              onClick={() => handleUpgrade("Starter")}
              className="mb-8 w-full rounded-full border border-[#e0e2e8] dark:border-white/20 bg-transparent px-4 py-3.5 text-[14px] font-medium text-[#1c1c1e] dark:text-[#ffffff] transition-colors hover:bg-[#f7f8fa] dark:hover:bg-white/5"
            >
              Get Started
            </button>

            <div className="space-y-4">
              <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#1c1c1e] dark:text-[#ffffff]">What's included</h4>
              <ul className="space-y-3">
                {["50 Credits / month", "Standard accuracy", "Image & Text scanning", "Community support"].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14px] text-[#555a6a] dark:text-[#a5a8b5]">
                    <Check className="h-5 w-5 shrink-0 text-[#1c1c1e] dark:text-[#ffffff]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tier 2: Pro */}
          <div className="relative flex flex-col rounded-[24px] border-2 border-[#1c1c1e] dark:border-[#ffffff] bg-[#ffffff] dark:bg-[#1a1a1c] p-8 shadow-[0_24px_64px_-12px_rgba(5,0,56,0.16)] scale-105 z-10">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#1c1c1e] dark:bg-[#ffffff] px-4 py-1 text-[12px] font-bold uppercase tracking-widest text-[#ffffff] dark:text-[#1c1c1e]">
              Most Popular
            </div>
            <div className="mb-6 space-y-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ffd02f]/20 border border-[#ffd02f]/30">
                <Sparkles className="h-6 w-6 text-[#d9aa00]" />
              </div>
              <h2 className="text-[24px] font-medium text-[#1c1c1e] dark:text-[#ffffff] pt-4">Pro</h2>
              <p className="text-[14px] text-[#555a6a] dark:text-[#8e91a0]">For content creators & editors</p>
            </div>
            
            <div className="mb-6 flex items-baseline gap-1">
              <span className="text-[48px] font-bold text-[#1c1c1e] dark:text-[#ffffff] tracking-tight leading-none">$19</span>
              <span className="text-[14px] text-[#555a6a] dark:text-[#8e91a0] font-medium">/ month</span>
            </div>

            <button 
              onClick={() => handleUpgrade("Pro")}
              className="mb-8 w-full rounded-full bg-[#1c1c1e] dark:bg-[#ffffff] px-4 py-3.5 text-[14px] font-medium text-[#ffffff] dark:text-[#1c1c1e] transition-all hover:opacity-90 shadow-sm"
            >
              Upgrade to Pro
            </button>

            <div className="space-y-4">
              <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#1c1c1e] dark:text-[#ffffff]">What's included</h4>
              <ul className="space-y-3">
                {["1,000 Credits / month", "High-precision analysis", "PDF Report Export", "Priority support", "Detailed anomaly bounding boxes"].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14px] text-[#1c1c1e] dark:text-[#ffffff]">
                    <Check className="h-5 w-5 shrink-0 text-[#4262ff]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tier 3: Enterprise */}
          <div className="relative flex flex-col rounded-[24px] border border-[#e0e2e8] dark:border-white/10 bg-[#ffffff] dark:bg-[#1a1a1c] p-8 shadow-[0_12px_32px_-4px_rgba(5,0,56,0.04)] transition-transform hover:-translate-y-1 duration-300">
            <div className="mb-6 space-y-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5f3ff] dark:bg-[#4262ff]/10 border border-[#4262ff]/20">
                <Building2 className="h-6 w-6 text-[#4262ff]" />
              </div>
              <h2 className="text-[24px] font-medium text-[#1c1c1e] dark:text-[#ffffff] pt-4">Enterprise</h2>
              <p className="text-[14px] text-[#555a6a] dark:text-[#8e91a0]">For large teams & API access</p>
            </div>
            
            <div className="mb-6 flex items-baseline gap-1">
              <span className="text-[48px] font-bold text-[#1c1c1e] dark:text-[#ffffff] tracking-tight leading-none">$99</span>
              <span className="text-[14px] text-[#555a6a] dark:text-[#8e91a0] font-medium">/ month</span>
            </div>

            <button 
              onClick={() => handleUpgrade("Enterprise")}
              className="mb-8 w-full rounded-full border border-[#e0e2e8] dark:border-white/20 bg-transparent px-4 py-3.5 text-[14px] font-medium text-[#1c1c1e] dark:text-[#ffffff] transition-colors hover:bg-[#f7f8fa] dark:hover:bg-white/5"
            >
              Contact Sales
            </button>

            <div className="space-y-4">
              <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#1c1c1e] dark:text-[#ffffff]">What's included</h4>
              <ul className="space-y-3">
                {["Unlimited Credits", "API Access", "Custom Integration", "Dedicated Account Manager", "SSO Authentication"].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14px] text-[#555a6a] dark:text-[#a5a8b5]">
                    <Check className="h-5 w-5 shrink-0 text-[#1c1c1e] dark:text-[#ffffff]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
