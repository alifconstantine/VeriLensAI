"use client";

import { useState, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState<"id" | "en">("id");

  const user = useQuery(api.users.getUser);
  const updateLanguage = useMutation(api.users.updateLanguage);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    if (user?.language) {
      setLanguage(user.language as "id" | "en");
    } else {
      const storedLang = localStorage.getItem("verilens_lang");
      if (storedLang === "en" || storedLang === "id") {
        setLanguage(storedLang);
      }
    }
  }, [user]);

  const handleLanguageChange = async (lang: "id" | "en") => {
    setLanguage(lang);
    localStorage.setItem("verilens_lang", lang);
    try {
      await updateLanguage({ language: lang });
    } catch (error) {
      console.error("Failed to sync language to cloud", error);
    }
  };

  if (!mounted) return null;

  return (
    <div className="mx-auto w-full max-w-4xl space-y-10">
      <div className="space-y-2">
        <h1 className="text-[36px] font-medium tracking-tight text-[#1c1c1e] dark:text-[#ffffff]">Settings</h1>
        <p className="text-[16px] text-[#555a6a] dark:text-[#a5a8b5]">Manage your workspace preferences and application behavior.</p>
      </div>

      <div className="space-y-8">
        {/* AI Output Language Section */}
        <section className="rounded-[16px] border border-[#e0e2e8] dark:border-white/10 bg-[#ffffff] dark:bg-black/20 p-8 shadow-[0_4px_12px_rgba(5,0,56,0.06)] backdrop-blur-xl transition-colors">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f3ff] dark:bg-[#4262ff]/20">
              <Globe className="h-5 w-5 text-[#4262ff]" />
            </div>
            <div>
              <h2 className="text-[20px] font-medium text-[#1c1c1e] dark:text-[#ffffff]">AI Analysis Language</h2>
              <p className="text-[14px] text-[#555a6a] dark:text-[#a5a8b5]">Select the output language for scanner conclusions and anomaly detection.</p>
            </div>
          </div>

          <div className="space-y-3 max-w-md">
            <button
              onClick={() => handleLanguageChange("id")}
              className={cn(
                "flex w-full items-center justify-between rounded-[12px] border px-5 py-4 transition-all duration-200",
                language === "id" 
                  ? "border-[#4262ff] bg-[#f5f3ff] dark:bg-[#4262ff]/10" 
                  : "border-[#e0e2e8] bg-transparent hover:bg-[#fafbfc] dark:border-white/10 dark:hover:bg-white/5"
              )}
            >
              <div className="flex items-center gap-3">
                <span className="text-[24px]">🇮🇩</span>
                <span className={cn("text-[14px] font-medium", language === "id" ? "text-[#4262ff]" : "text-[#1c1c1e] dark:text-[#ffffff]")}>
                  Indonesian (Default)
                </span>
              </div>
              {language === "id" && <Check className="h-5 w-5 text-[#4262ff]" />}
            </button>

            <button
              onClick={() => handleLanguageChange("en")}
              className={cn(
                "flex w-full items-center justify-between rounded-[12px] border px-5 py-4 transition-all duration-200",
                language === "en" 
                  ? "border-[#4262ff] bg-[#f5f3ff] dark:bg-[#4262ff]/10" 
                  : "border-[#e0e2e8] bg-transparent hover:bg-[#fafbfc] dark:border-white/10 dark:hover:bg-white/5"
              )}
            >
              <div className="flex items-center gap-3">
                <span className="text-[24px]">🇬🇧</span>
                <span className={cn("text-[14px] font-medium", language === "en" ? "text-[#4262ff]" : "text-[#1c1c1e] dark:text-[#ffffff]")}>
                  English
                </span>
              </div>
              {language === "en" && <Check className="h-5 w-5 text-[#4262ff]" />}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
