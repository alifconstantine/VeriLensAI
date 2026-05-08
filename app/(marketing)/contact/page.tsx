"use client";

import Link from "next/link";
import { ArrowLeft, Mail, MessageSquare, Phone, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#fafbfc] dark:bg-[#121212] font-sans">
      
      {/* Navbar (Simple version for marketing pages) */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-xl border-b border-[#e0e2e8] md:px-12 lg:px-20">
        <Link href="/" className="flex items-center gap-2 text-[#1c1c1e] text-decoration-none">
          <img src="/logo.png" alt="VeriLens" className="h-7 w-7 object-contain" />
          <span className="text-[20px] font-semibold tracking-tight">VeriLens</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-[14px] font-medium text-[#555a6a] hover:text-[#1c1c1e] transition-colors hidden md:block">
            Home
          </Link>
          <Link href="/sign-in" className="text-[14px] font-medium text-[#555a6a] hover:text-[#1c1c1e] transition-colors">
            Login
          </Link>
          <Link href="/sign-up" className="rounded-full bg-[#1c1c1e] px-5 py-2.5 text-[14px] font-medium text-white transition-transform hover:scale-105 shadow-md">
            Try free
          </Link>
        </div>
      </nav>

      {/* Decorative Background */}
      <div className="pointer-events-none absolute left-[-20%] top-[-10%] h-[800px] w-[800px] rounded-full bg-[#4262ff]/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-20%] bottom-[-10%] h-[800px] w-[800px] rounded-full bg-[#ffd02f]/5 blur-[120px]" />
      
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 lg:py-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          
          {/* Left Column: Text & Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-[#4262ff]/10 text-[#4262ff] text-[13px] font-semibold w-fit">
              Enterprise Ready
            </div>
            
            <h1 className="text-[48px] lg:text-[64px] font-semibold leading-[1.1] tracking-tight text-[#1c1c1e] mb-6">
              Let&apos;s build trust together.
            </h1>
            
            <p className="text-[18px] leading-[1.6] text-[#555a6a] mb-12 max-w-md">
              Whether you need to scale detection across thousands of assets, require custom API integrations, or just have a billing question, our team is ready to help.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white border border-[#e0e2e8] shadow-sm">
                  <MessageSquare className="h-5 w-5 text-[#1c1c1e]" />
                </div>
                <div>
                  <h3 className="text-[18px] font-medium text-[#1c1c1e]">Sales & Enterprise</h3>
                  <p className="text-[15px] text-[#555a6a] mb-1 mt-1">Custom limits, SLA, and API access.</p>
                  <a href="mailto:sales@verilens.ai" className="text-[15px] font-medium text-[#4262ff] hover:underline">sales@verilens.ai</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white border border-[#e0e2e8] shadow-sm">
                  <Mail className="h-5 w-5 text-[#1c1c1e]" />
                </div>
                <div>
                  <h3 className="text-[18px] font-medium text-[#1c1c1e]">Customer Support</h3>
                  <p className="text-[15px] text-[#555a6a] mb-1 mt-1">Help with your current account.</p>
                  <a href="mailto:support@verilens.ai" className="text-[15px] font-medium text-[#4262ff] hover:underline">support@verilens.ai</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white border border-[#e0e2e8] shadow-sm">
                  <MapPin className="h-5 w-5 text-[#1c1c1e]" />
                </div>
                <div>
                  <h3 className="text-[18px] font-medium text-[#1c1c1e]">Headquarters</h3>
                  <p className="text-[15px] text-[#555a6a] mt-1">100 AI Innovation Way<br/>San Francisco, CA 94105</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <div className="w-full rounded-[24px] border border-[#e0e2e8] bg-white p-8 md:p-10 shadow-[0_24px_64px_-12px_rgba(5,0,56,0.08)]">
              <h2 className="text-[24px] font-medium text-[#1c1c1e] mb-6">Send us a message</h2>
              
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-medium text-[#1c1c1e]">First Name</label>
                    <input 
                      type="text" 
                      className="w-full h-11 px-4 rounded-[10px] border border-[#c7cad5] bg-[#f7f8fa] text-[14px] text-[#1c1c1e] outline-none focus:border-[#4262ff] focus:bg-white transition-colors"
                      placeholder="Jane"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-medium text-[#1c1c1e]">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full h-11 px-4 rounded-[10px] border border-[#c7cad5] bg-[#f7f8fa] text-[14px] text-[#1c1c1e] outline-none focus:border-[#4262ff] focus:bg-white transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-[#1c1c1e]">Work Email</label>
                  <input 
                    type="email" 
                    className="w-full h-11 px-4 rounded-[10px] border border-[#c7cad5] bg-[#f7f8fa] text-[14px] text-[#1c1c1e] outline-none focus:border-[#4262ff] focus:bg-white transition-colors"
                    placeholder="jane@company.com"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-[#1c1c1e]">Company Size</label>
                  <select className="w-full h-11 px-4 rounded-[10px] border border-[#c7cad5] bg-[#f7f8fa] text-[14px] text-[#1c1c1e] outline-none focus:border-[#4262ff] focus:bg-white transition-colors appearance-none cursor-pointer">
                    <option>1-50 employees</option>
                    <option>51-200 employees</option>
                    <option>201-1000 employees</option>
                    <option>1000+ employees</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-[#1c1c1e]">How can we help?</label>
                  <textarea 
                    className="w-full min-h-[120px] p-4 rounded-[10px] border border-[#c7cad5] bg-[#f7f8fa] text-[14px] text-[#1c1c1e] outline-none focus:border-[#4262ff] focus:bg-white transition-colors resize-y"
                    placeholder="Tell us about your detection needs..."
                  ></textarea>
                </div>

                <button className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1c1c1e] py-3.5 px-6 text-[15px] font-medium text-white transition-transform hover:scale-[1.02] shadow-md mt-2">
                  <span>Contact Sales</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
}
