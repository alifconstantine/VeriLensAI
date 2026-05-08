"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { 
  ScanLine, 
  Brain, 
  UserCheck, 
  Image as ImageIcon, 
  FileText,
  Type,
  TrendingUp,
  ArrowRight
} from "lucide-react";
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  ResponsiveContainer 
} from "recharts";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartLegend, 
  ChartLegendContent 
} from "@/components/ui/chart";

const chartConfig = {
  ai: {
    label: "AI Detected",
    color: "#4262ff",
  },
  human: {
    label: "Human Authored",
    color: "#ffd02f",
  },
};

export default function HomeDashboard() {
  const { user: clerkUser } = useUser();
  const scans = useQuery(api.scans.getUserHistory);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  }, []);

  const stats = useMemo(() => {
    if (!scans) return [];
    
    const totalScans = scans.length;
    const aiDetected = scans.filter(s => s.isAiGenerated).length;
    const humanVerified = scans.filter(s => !s.isAiGenerated).length;
    const imageScans = scans.filter(s => s.mediaType === "image").length;
    const documentScans = scans.filter(s => s.mediaType === "document").length;
    const textScans = scans.filter(s => s.mediaType === "text").length;

    return [
      { title: "Total Scans", value: totalScans.toLocaleString(), icon: ScanLine, color: "bg-[#f5f3ff] text-[#4262ff]" },
      { title: "AI Detected", value: aiDetected.toLocaleString(), icon: Brain, color: "bg-[#fff1f2] text-[#8b5cf6]" },
      { title: "Human Verified", value: humanVerified.toLocaleString(), icon: UserCheck, color: "bg-[#f0fdfa] text-[#e11d48]" },
      { title: "Image Scans", value: imageScans.toLocaleString(), icon: ImageIcon, color: "bg-[#f0fdf4] text-[#0d9488]" },
      { title: "Document Scans", value: documentScans.toLocaleString(), icon: FileText, color: "bg-[#fffbeb] text-[#d97706]" },
      { title: "Text Scans", value: textScans.toLocaleString(), icon: Type, color: "bg-[#f3f4f6] text-[#4b5563]" },
    ];
  }, [scans]);

  const chartData = useMemo(() => {
    if (!scans) return [];
    
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      d.setHours(0, 0, 0, 0);
      return {
        dateObj: d,
        name: days[d.getDay()],
        ai: 0,
        human: 0,
      };
    });

    scans.forEach(scan => {
      const scanDate = new Date(scan._creationTime);
      const dayMatch = last7Days.find(d => 
        d.dateObj.getDate() === scanDate.getDate() && 
        d.dateObj.getMonth() === scanDate.getMonth() && 
        d.dateObj.getFullYear() === scanDate.getFullYear()
      );
      
      if (dayMatch) {
        if (scan.isAiGenerated) {
          dayMatch.ai++;
        } else {
          dayMatch.human++;
        }
      }
    });

    return last7Days.map(({ name, ai, human }) => ({ name, ai, human }));
  }, [scans]);

  if (scans === undefined) {
    return (
      <div className="flex h-full w-full items-center justify-center p-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#e0e2e8] border-t-[#4262ff]" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-2">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[32px] font-medium tracking-tight text-[#1c1c1e]"
        >
          {greeting}{clerkUser?.firstName ? `, ${clerkUser.firstName}` : ""}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[16px] text-[#555a6a]"
        >
          Here&apos;s what&apos;s happening with your detection workspace today.
        </motion.p>
      </div>

      {scans.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center rounded-[24px] border border-[#e0e2e8] bg-white py-24 px-6 shadow-sm mt-8"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f7f8fa] border border-[#e0e2e8] mb-6">
            <ScanLine className="h-8 w-8 text-[#4262ff]" />
          </div>
          <div className="text-center space-y-3 mb-8">
            <h2 className="text-[24px] font-medium text-[#1c1c1e]">Ready to scan your first content?</h2>
            <p className="text-[15px] text-[#555a6a] max-w-md mx-auto">
              Start verifying images and documents with our advanced AI detection engine. Your results will appear right here.
            </p>
          </div>
          <Link href="/scanner" className="flex items-center gap-2 rounded-full bg-[#1c1c1e] px-8 py-3.5 text-[15px] font-medium text-white transition-transform hover:scale-105 shadow-md">
            Go to Scanner <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      ) : (
        <>
          {/* Stats Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
          >
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className="flex flex-col gap-3 rounded-[16px] border border-[#e0e2e8] bg-white p-5 shadow-[0_2px_8px_rgba(5,0,56,0.04)] transition-all hover:shadow-[0_4px_12px_rgba(5,0,56,0.06)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-medium text-[#555a6a]">{stat.title}</span>
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${stat.color}`}>
                    <stat.icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="text-[28px] font-semibold tracking-tight text-[#1c1c1e]">
                  {stat.value}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Main Chart Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="overflow-hidden rounded-[20px] border border-[#e0e2e8] bg-white shadow-[0_4px_12px_rgba(5,0,56,0.06)]"
          >
            <div className="border-b border-[#e0e2e8] bg-[#f7f8fa] px-6 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-[18px] font-medium text-[#1c1c1e]">Detection Overview</h2>
                  <p className="text-[14px] text-[#555a6a]">AI vs Human content over the last 7 days</p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[13px] font-medium text-[#00b473] shadow-sm border border-[#e0e2e8]">
                  <TrendingUp className="h-4 w-4" />
                  <span>Activity</span>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="h-[350px] w-full">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <BarChart accessibilityLayer data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e0e2e8" />
                    <XAxis 
                      dataKey="name" 
                      tickLine={false} 
                      tickMargin={10} 
                      axisLine={false} 
                      tick={{ fill: "#8e91a0", fontSize: 12 }} 
                    />
                    <YAxis 
                      tickLine={false} 
                      axisLine={false} 
                      tick={{ fill: "#8e91a0", fontSize: 12 }} 
                      allowDecimals={false}
                    />
                    <ChartTooltip 
                      cursor={{ fill: "#f3f4f6" }}
                      content={
                        <ChartTooltipContent 
                          indicator="dot" 
                          className="min-w-[220px] bg-[#ffffff] border-[#e0e2e8] shadow-[0_8px_24px_-4px_rgba(5,0,56,0.12)] [&_.text-foreground]:text-[#1c1c1e] [&_.text-muted-foreground]:text-[#555a6a]" 
                        />
                      } 
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar 
                      dataKey="human" 
                      fill="var(--color-human)" 
                      radius={[4, 4, 0, 0]} 
                      barSize={32}
                    />
                    <Bar 
                      dataKey="ai" 
                      fill="var(--color-ai)" 
                      radius={[4, 4, 0, 0]} 
                      barSize={32}
                    />
                  </BarChart>
                </ChartContainer>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
