"use client";

import Link from "next/link";
import { ArrowLeft, Mail, MessageSquare, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#fafbfc] dark:bg-[#121212] font-sans">
      
      {/* Decorative Background */}
      <div className="pointer-events-none absolute left-0 top-0 h-[600px] w-[600px] rounded-full bg-[#4262ff]/10 dark:bg-[#4262ff]/20 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[600px] w-[600px] rounded-full bg-[#ffd02f]/10 dark:bg-[#ffd02f]/20 blur-[100px]" />
      
      <div className="relative z-10 w-full max-w-4xl px-6 py-20">
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-[#555a6a] hover:text-[#1c1c1e] transition-colors dark:text-[#a5a8b5] dark:hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-[14px] font-medium">Back to Home</span>
          </Link>
        </div>

        <div className="mb-16 text-center">
          <h1 className="text-[48px] font-bold leading-tight tracking-tighter text-[#1c1c1e] dark:text-white md:text-[64px]">
            Get in touch
          </h1>
          <p className="mt-4 text-[18px] text-[#555a6a] dark:text-[#a5a8b5]">
            Our enterprise team is ready to help you implement VeriLens for your organization.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Sales Card */}
          <div className="flex flex-col items-center justify-center rounded-[24px] border border-[#e0e2e8] bg-white/80 p-8 text-center shadow-[0_12px_32px_-4px_rgba(5,0,56,0.08)] backdrop-blur-xl transition-transform hover:-translate-y-2 dark:border-white/10 dark:bg-white/5">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f5f3ff] dark:bg-[#4262ff]/20">
              <MessageSquare className="h-8 w-8 text-[#4262ff]" />
            </div>
            <h3 className="mb-2 text-[20px] font-medium text-[#1c1c1e] dark:text-white">Talk to Sales</h3>
            <p className="mb-6 text-[14px] text-[#555a6a] dark:text-[#a5a8b5]">
              Interested in our API or Enterprise plans? We're here to help.
            </p>
            <a href="mailto:sales@verilens.ai" className="text-[15px] font-medium text-[#4262ff] hover:underline">
              sales@verilens.ai
            </a>
          </div>

          {/* Support Card */}
          <div className="flex flex-col items-center justify-center rounded-[24px] border border-[#e0e2e8] bg-white/80 p-8 text-center shadow-[0_12px_32px_-4px_rgba(5,0,56,0.08)] backdrop-blur-xl transition-transform hover:-translate-y-2 dark:border-white/10 dark:bg-white/5">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#fdf5f3] dark:bg-[#ff9999]/20">
              <Mail className="h-8 w-8 text-[#ff6b6b]" />
            </div>
            <h3 className="mb-2 text-[20px] font-medium text-[#1c1c1e] dark:text-white">Customer Support</h3>
            <p className="mb-6 text-[14px] text-[#555a6a] dark:text-[#a5a8b5]">
              Need help with your account or billing? Reach out to support.
            </p>
            <a href="mailto:support@verilens.ai" className="text-[15px] font-medium text-[#4262ff] hover:underline">
              support@verilens.ai
            </a>
          </div>

          {/* Phone Card */}
          <div className="flex flex-col items-center justify-center rounded-[24px] border border-[#e0e2e8] bg-white/80 p-8 text-center shadow-[0_12px_32px_-4px_rgba(5,0,56,0.08)] backdrop-blur-xl transition-transform hover:-translate-y-2 dark:border-white/10 dark:bg-white/5">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#fdfaf3] dark:bg-[#ffd02f]/20">
              <Phone className="h-8 w-8 text-[#d9a400]" />
            </div>
            <h3 className="mb-2 text-[20px] font-medium text-[#1c1c1e] dark:text-white">Call Us</h3>
            <p className="mb-6 text-[14px] text-[#555a6a] dark:text-[#a5a8b5]">
              Available Mon-Fri, 9am-6pm EST for urgent enterprise queries.
            </p>
            <span className="text-[15px] font-medium text-[#4262ff]">
              +1 (800) 123-4567
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
