"use client";

import { UserButton } from "@clerk/nextjs";
import { Zap } from "lucide-react";
import Link from "next/link";

export function Topbar() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-[#e0e2e8] bg-[#ffffff] px-6">
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center bg-[#ffd02f] rounded-sm">
          <div className="h-4 w-4 rounded-full bg-[#1c1c1e]" />
        </div>
        <span className="text-xl font-bold tracking-tight text-[#1c1c1e]">
          VeriLens
        </span>
      </div>

      {/* Center: Links */}
      <nav className="hidden items-center gap-8 text-[14px] font-medium text-[#555a6a] md:flex">
        <Link href="/pricing" className="transition-colors hover:text-[#1c1c1e]">
          Pricing
        </Link>
        <Link href="/contact" className="transition-colors hover:text-[#1c1c1e]">
          Contact sales
        </Link>
      </nav>

      {/* Right: Credits & User */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 rounded-full border border-[#e0e2e8] bg-[#f7f8fa] px-4 py-1.5 text-[14px] font-medium text-[#1c1c1e] transition-colors hover:bg-[#eef0f3]">
          <Zap className="h-4 w-4 text-[#fcb900]" />
          <span>50 Credits</span>
        </div>
        <UserButton 
          appearance={{
            elements: {
              avatarBox: "h-9 w-9 rounded-full ring-1 ring-[#e0e2e8]"
            }
          }}
        />
      </div>
    </header>
  );
}
