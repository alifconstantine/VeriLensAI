"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CreditCard, Code, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Scanner", icon: Search, href: "/scanner" },
  { name: "Credits & Billing", icon: CreditCard, href: "/credits" },
  { name: "API Access", icon: Code, href: "/api-access" },
  { name: "Settings", icon: Settings, href: "/settings" },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside
      initial={{ width: 240 }}
      animate={{ width: isCollapsed ? 80 : 240 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative flex h-full flex-col border-r border-[#e0e2e8] bg-[#ffffff]"
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-[#e0e2e8] bg-[#ffffff] text-[#555a6a] shadow-[0_4px_12px_rgba(5,0,56,0.06)] transition-colors hover:text-[#1c1c1e]"
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>

      <nav className="flex flex-1 flex-col gap-2 p-4 pt-6">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.name} href={item.href}>
              <motion.div
                whileHover={{ scale: 0.98 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "relative flex items-center gap-3 rounded-full px-4 py-3 text-[14px] font-medium transition-all duration-300",
                  isActive 
                    ? "bg-[#1c1c1e] text-[#ffffff]" 
                    : "text-[#555a6a] hover:bg-[#f7f8fa] hover:text-[#1c1c1e]"
                )}
              >
                <Icon className={cn("relative z-10 h-5 w-5 shrink-0 transition-colors", isActive ? "text-[#ffffff]" : "text-[#8e91a0]")} />
                
                <AnimatePresence mode="popLayout">
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="relative z-10 whitespace-nowrap"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </motion.aside>
  );
}
