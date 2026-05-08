"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Zap, Menu, X, Search, History, CreditCard, Settings, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const NAV_ITEMS = [
  { name: "Home", icon: Home, href: "/home" },
  { name: "Scanner", icon: Search, href: "/scanner" },
  { name: "History", icon: History, href: "/history" },
  { name: "Credits & Billing", icon: CreditCard, href: "/credits" },
  { name: "Settings", icon: Settings, href: "/settings" },
];

export function Topbar() {
  const user = useQuery(api.users.getUser);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-[#e0e2e8] bg-[#ffffff] px-4 md:px-6">
      {/* Left: Logo and Links */}
      <div className="flex items-center gap-4 md:gap-8">
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden flex items-center justify-center text-[#1c1c1e]"
        >
          <Menu className="h-6 w-6" />
        </button>
        <Link href="/scanner" className="flex items-center gap-1 cursor-pointer">
          <img src="/logo.png" alt="VeriLens Logo" className="h-8 w-8 object-contain" />
          <span className="text-xl font-bold tracking-tight text-[#1c1c1e]">
            VeriLens
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-[14px] font-medium text-[#555a6a] md:flex">
          <Link href="/pricing" className="transition-colors hover:text-[#1c1c1e]">
            Pricing
          </Link>
          <Link href="/contact" className="transition-colors hover:text-[#1c1c1e]">
            Contact sales
          </Link>
        </nav>
      </div>

      {/* Right: Credits & User */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 rounded-full border border-[#e0e2e8] bg-[#f7f8fa] px-4 py-1.5 text-[14px] font-medium text-[#1c1c1e] transition-colors hover:bg-[#eef0f3]">
          <Zap className="h-4 w-4 text-[#fcb900]" />
          <span>{user === undefined ? "..." : user === null ? "0" : user.credits} Credits</span>
        </div>
        <UserButton 
          appearance={{
            elements: {
              avatarBox: "h-9 w-9 rounded-full ring-1 ring-[#e0e2e8]"
            }
          }}
        />
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute left-0 top-0 h-full w-[280px] bg-white shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-[#e0e2e8] p-4">
                <Link href="/scanner" className="flex items-center gap-1 cursor-pointer" onClick={() => setMobileMenuOpen(false)}>
                  <img src="/logo.png" alt="VeriLens Logo" className="h-8 w-8 object-contain" />
                  <span className="text-xl font-bold tracking-tight text-[#1c1c1e]">VeriLens</span>
                </Link>
                <button onClick={() => setMobileMenuOpen(false)} className="rounded-full p-2 hover:bg-[#f7f8fa]">
                  <X className="h-5 w-5 text-[#555a6a]" />
                </button>
              </div>
              <nav className="flex flex-col gap-2 p-4">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                      <div className={cn(
                        "flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium transition-colors",
                        isActive ? "bg-[#1c1c1e] text-white" : "text-[#555a6a] hover:bg-[#f7f8fa] hover:text-[#1c1c1e]"
                      )}>
                        <Icon className="h-5 w-5" />
                        {item.name}
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
