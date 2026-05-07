"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";
import { animate } from "animejs";
import { useConvexAuth } from "convex/react";

export default function NotFound() {
  const glowRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useConvexAuth();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Efficiently animate the glow towards the cursor
      animate(glowRef.current, {
        x: x - 300,
        y: y - 300,
        duration: 800,
        ease: 'outExpo',
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#ffffff] dark:bg-[#121212] font-sans selection:bg-[#ffd02f]/30"
    >
      {/* Anime.js Glowing Orb */}
      <div 
        ref={glowRef}
        className="pointer-events-none absolute left-0 top-0 h-[600px] w-[600px] rounded-full bg-[#4262ff]/10 dark:bg-[#4262ff]/20 blur-[100px] transition-opacity duration-300"
        style={{ willChange: "transform" }}
      />
      
      {/* Decorative Grid Background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e0e2e8_1px,transparent_1px),linear-gradient(to_bottom,#e0e2e8_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />

      {/* Main Content (Glassmorphism Card) */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-6 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-[24px] bg-[#f7f8fa]/80 dark:bg-white/5 backdrop-blur-xl border border-[#e0e2e8] dark:border-white/10 shadow-[0_24px_64px_-12px_rgba(5,0,56,0.16)]">
          <SearchX className="h-10 w-10 text-[#1c1c1e] dark:text-[#ffffff]" />
        </div>

        <div className="space-y-4 max-w-md px-6">
          <h1 className="text-[120px] font-bold leading-none tracking-tighter text-[#1c1c1e] dark:text-[#ffffff]">
            404
          </h1>
          <h2 className="text-[24px] font-medium text-[#1c1c1e] dark:text-[#ffffff]">
            Page Not Found
          </h2>
          <p className="text-[16px] leading-[1.6] text-[#555a6a] dark:text-[#a5a8b5]">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="pt-6">
          <Link 
            href={isAuthenticated ? "/scanner" : "/"}
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#1c1c1e] dark:bg-[#ffffff] px-8 py-4 text-[15px] font-medium text-[#ffffff] dark:text-[#1c1c1e] transition-transform hover:scale-105 active:scale-95 shadow-[0_12px_24px_-8px_rgba(28,28,30,0.5)] dark:shadow-[0_12px_24px_-8px_rgba(255,255,255,0.3)]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>{isAuthenticated ? "Back to Scanner" : "Back to Home"}</span>
            {/* Hover shine effect */}
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
              <div className="relative h-full w-8 bg-white/20 dark:bg-black/10" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
