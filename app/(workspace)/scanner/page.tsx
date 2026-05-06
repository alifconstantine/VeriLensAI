"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Download, UploadCloud, FileImage, Type, ShieldAlert, Cpu, CheckCircle } from "lucide-react";
import { useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const TABS = [
  { id: "image", label: "Image", icon: FileImage },
  { id: "text", label: "Text", icon: Type },
] as const;

type Tab = typeof TABS[number]["id"];

type Anomaly = {
  description: string;
  box_2d?: [number, number, number, number];
  exact_text?: string;
};

type ScanResult = {
  is_ai_generated: boolean;
  confidence_score: number;
  media_type: "image" | "text";
  conclusion: string;
  anomalies?: Anomaly[];
};

export default function ScannerPage() {
  const [activeTab, setActiveTab] = useState<Tab>("image");
  const [isHovering, setIsHovering] = useState(false);
  const [scanStatus, setScanStatus] = useState<"idle" | "scanning" | "complete">("idle");
  const [textContent, setTextContent] = useState("");
  const [imageFileUrl, setImageFileUrl] = useState<string | null>(null);
  const [rawImageFile, setRawImageFile] = useState<File | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Interactive Hover State
  const [hoveredAnomalyIndex, setHoveredAnomalyIndex] = useState<number | null>(null);

  const generateUploadUrl = useMutation(api.scans.generateUploadUrl);
  const saveScan = useMutation(api.scans.saveScan);

  const handleImageUpload = (file: File) => {
    setRawImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageFileUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsHovering(false);
    
    if (activeTab === "image" && e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  }, [activeTab]);

  const startScan = async () => {
    if (activeTab === "image" && (!imageFileUrl || !rawImageFile)) return;
    if (activeTab === "text" && !textContent.trim()) return;

    setScanStatus("scanning");
    setHoveredAnomalyIndex(null);

    try {
      let storageId: string | undefined = undefined;

      if (activeTab === "image" && rawImageFile) {
        const uploadUrl = await generateUploadUrl();
        const uploadResult = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": rawImageFile.type },
          body: rawImageFile,
        });

        if (!uploadResult.ok) {
          throw new Error("Failed to upload image to storage");
        }

        const { storageId: returnedStorageId } = await uploadResult.json();
        storageId = returnedStorageId;
      }

      const response = await fetch("/api/detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mediaType: activeTab,
          content: activeTab === "image" ? imageFileUrl : textContent,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to scan via OpenRouter");
      }

      const data: ScanResult = await response.json();
      setResult(data);

      await saveScan({
        mediaType: activeTab,
        fileStorageId: storageId as any,
        textContent: activeTab === "text" ? textContent : undefined,
        confidenceScore: data.confidence_score,
        isAiGenerated: data.is_ai_generated,
        conclusion: data.conclusion,
        anomalies: data.anomalies,
      });

      setScanStatus("complete");
    } catch (error: any) {
      console.error(error);
      setScanStatus("idle");
      alert(error.message || "Error scanning content. Please try again.");
    }
  };

  const resetScan = () => {
    setScanStatus("idle");
    setResult(null);
    setImageFileUrl(null);
    setRawImageFile(null);
    setTextContent("");
    setHoveredAnomalyIndex(null);
  };

  const renderTextWithHighlights = (text: string, anomalies?: Anomaly[]) => {
    if (!anomalies || anomalies.length === 0) return <span>{text}</span>;

    let chunks: { text: string; isMatch: boolean; desc?: string; index?: number }[] = [{ text, isMatch: false }];
    
    anomalies.forEach((anomaly, index) => {
      if (!anomaly.exact_text) return;
      const newChunks: typeof chunks = [];
      chunks.forEach((chunk) => {
        if (chunk.isMatch) {
          newChunks.push(chunk);
          return;
        }
        
        const splitText = chunk.text.split(anomaly.exact_text!);
        splitText.forEach((part, idx) => {
          if (part) newChunks.push({ text: part, isMatch: false });
          if (idx < splitText.length - 1) {
            newChunks.push({ text: anomaly.exact_text!, isMatch: true, desc: anomaly.description, index });
          }
        });
      });
      chunks = newChunks;
    });

    return (
      <div className="whitespace-pre-wrap leading-[1.8] text-[#1c1c1e]">
        {chunks.map((chunk, i) => {
          const isHovered = hoveredAnomalyIndex === chunk.index;
          return chunk.isMatch ? (
            <span key={i} className="group relative inline-block">
              <mark 
                className={cn(
                  "rounded-sm px-1 py-0.5 cursor-help transition-all duration-200 font-medium",
                  isHovered ? "bg-[#ffd02f] text-[#1c1c1e] shadow-sm" : "bg-[#ffd02f]/40 text-[#1c1c1e] hover:bg-[#ffd02f]/60"
                )}
              >
                {chunk.text}
              </mark>
              {chunk.desc && (
                <div className={cn(
                  "absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max max-w-xs whitespace-normal text-center rounded-[8px] bg-[#ffffff] border border-[#e0e2e8] px-3 py-2 text-[12px] font-medium text-[#1c1c1e] shadow-xl z-[999] transition-opacity duration-200",
                  isHovered ? "opacity-100 block" : "hidden group-hover:block"
                )}>
                  {chunk.desc}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#ffffff]" />
                </div>
              )}
            </span>
          ) : (
            <span key={i}>{chunk.text}</span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="flex flex-col w-full mx-auto space-y-8 pt-4 pb-12">
        
        {/* Header */}
        <div className={cn("space-y-2 transition-all duration-500", scanStatus === "complete" ? "text-left" : "text-center")}>
          <h1 className="text-[36px] font-medium tracking-tight text-[#1c1c1e]">
            AI Content Scanner
          </h1>
          <p className="text-[16px] text-[#555a6a]">
            Detect AI-generated content instantly with advanced deep learning models.
          </p>
        </div>

        {/* Pill Tabs */}
        {scanStatus === "idle" && (
          <div className="flex w-fit items-center gap-2 mx-auto">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    resetScan();
                  }}
                  className={cn(
                    "relative flex items-center gap-2 rounded-full px-5 py-2 text-[14px] font-medium transition-colors border",
                    isActive 
                      ? "bg-[#1c1c1e] text-[#ffffff] border-[#1c1c1e]" 
                      : "bg-[#ffffff] text-[#555a6a] border-[#e0e2e8] hover:bg-[#f7f8fa]"
                  )}
                >
                  <Icon className="relative z-10 h-4 w-4" />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Dynamic Content Zone */}
        <AnimatePresence mode="wait">
          {scanStatus === "idle" && (
            <motion.div
              key="idle-zone"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="relative mt-2 max-w-3xl mx-auto w-full"
            >
              {activeTab === "image" ? (
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsHovering(true); }}
                  onDragLeave={() => setIsHovering(false)}
                  onDrop={handleDrop}
                  onClick={() => !imageFileUrl && fileInputRef.current?.click()}
                  className={cn(
                    "group flex cursor-pointer flex-col items-center justify-center rounded-[16px] border border-[#e0e2e8] p-12 transition-all duration-300 min-h-[400px] overflow-hidden relative shadow-[0_12px_32px_-4px_rgba(5,0,56,0.08)]",
                    isHovering 
                      ? "border-[#4262ff] bg-[#f5f3ff]" 
                      : "bg-[#ffffff] hover:bg-[#f7f8fa]"
                  )}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} 
                    className="hidden" 
                    accept="image/*"
                  />
                  
                  {imageFileUrl ? (
                    <div className="absolute inset-0 w-full h-full p-6">
                      <img src={imageFileUrl} alt="Upload preview" className="w-full h-full object-contain rounded-[12px] border border-[#eef0f3]" />
                      <button 
                        onClick={(e) => { e.stopPropagation(); setImageFileUrl(null); setRawImageFile(null); }}
                        className="absolute top-8 right-8 flex h-10 w-10 items-center justify-center rounded-full bg-[#1c1c1e] text-[#ffffff] shadow-[0_4px_12px_rgba(5,0,56,0.06)] hover:bg-[#2c2c34]"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f7f8fa] border border-[#e0e2e8]">
                        <UploadCloud className="h-8 w-8 text-[#555a6a]" />
                      </div>
                      <h3 className="mb-2 text-[22px] font-medium text-[#1c1c1e]">Drag & Drop your Image</h3>
                      <p className="text-[14px] text-[#555a6a] mb-8">or click to browse from your computer</p>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex flex-col rounded-[16px] border border-[#e0e2e8] bg-[#ffffff] p-6 min-h-[400px] shadow-[0_12px_32px_-4px_rgba(5,0,56,0.08)]">
                  <textarea
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Paste the text you want to analyze here..."
                    className="w-full flex-1 resize-none bg-transparent text-[16px] text-[#1c1c1e] placeholder:text-[#a5a8b5] focus:outline-none"
                  />
                </div>
              )}

              <div className="mt-8 flex justify-center">
                <button 
                  onClick={startScan}
                  disabled={activeTab === "image" ? !imageFileUrl : !textContent.trim()}
                  className="rounded-full bg-[#1c1c1e] px-8 py-3 text-[14px] font-medium text-[#ffffff] transition-colors hover:bg-[#2c2c34] disabled:opacity-50 disabled:hover:bg-[#1c1c1e]"
                >
                  Analyze {activeTab === "image" ? "Image" : "Text"}
                </button>
              </div>
            </motion.div>
          )}

          {scanStatus === "scanning" && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex max-w-3xl mx-auto w-full min-h-[400px] flex-col items-center justify-center rounded-[16px] border border-[#e0e2e8] bg-[#ffffff] shadow-[0_12px_32px_-4px_rgba(5,0,56,0.08)] mt-4"
            >
              <div className="relative flex h-24 w-24 items-center justify-center mb-8">
                <div className="absolute inset-0 rounded-full border-t-2 border-[#ff9999] animate-spin" />
                <div className="absolute inset-2 rounded-full border-r-2 border-[#4262ff] animate-spin [animation-direction:reverse] duration-700" />
                <div className="absolute inset-4 rounded-full border-b-2 border-[#ffd02f] animate-spin duration-1000" />
                <Cpu className="h-8 w-8 text-[#1c1c1e]" />
              </div>
              <h3 className="text-[22px] font-medium text-[#1c1c1e]">Analyzing Content...</h3>
              <p className="text-[14px] text-[#555a6a] mt-2">Processing with advanced detection models</p>
            </motion.div>
          )}

          {scanStatus === "complete" && result && (
            <motion.div
              key="complete"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col lg:flex-row gap-8 items-start w-full mt-4"
            >
              {/* Left Column (Image Area) */}
              <div className="flex-1 w-full sticky top-8">
                <div className="flex flex-col rounded-[16px] border border-[#e0e2e8] bg-[#ffffff] shadow-[0_12px_32px_-4px_rgba(5,0,56,0.08)] overflow-visible">
                  <div className="bg-[#f7f8fa] border-b border-[#e0e2e8] px-6 py-4 rounded-t-[16px]">
                    <h3 className="text-[14px] font-medium text-[#1c1c1e]">Visual Analysis</h3>
                  </div>
                  <div className="flex flex-1 items-center justify-center p-6 bg-[#fafbfc] rounded-b-[16px] overflow-visible">
                    {activeTab === "image" && imageFileUrl && (
                      <div className="relative inline-block rounded-md w-full h-auto">
                        <img 
                          src={imageFileUrl} 
                          alt="Analyzed" 
                          className="w-full h-auto object-contain block border border-[#eef0f3] rounded-md" 
                        />
                        {/* Bounding Boxes */}
                        {result.anomalies?.map((anomaly, i) => {
                          if (!anomaly.box_2d) return null;
                          const [ymin, xmin, ymax, xmax] = anomaly.box_2d;
                          const isHovered = hoveredAnomalyIndex === i;
                          return (
                            <div
                              key={i}
                              className={cn(
                                "absolute border-2 rounded-[4px] shadow-sm group cursor-help transition-all duration-200",
                                isHovered 
                                  ? "border-[#ff9999] bg-[#ff9999]/30 z-[999] border-4 scale-[1.02]" 
                                  : "border-[#ffd8f4] bg-[#ffd8f4]/20 hover:bg-[#ffd8f4]/40 hover:z-[999]"
                              )}
                              style={{
                                top: `${(ymin / 1000) * 100}%`,
                                left: `${(xmin / 1000) * 100}%`,
                                height: `${((ymax - ymin) / 1000) * 100}%`,
                                width: `${((xmax - xmin) / 1000) * 100}%`,
                              }}
                              onMouseEnter={() => setHoveredAnomalyIndex(i)}
                              onMouseLeave={() => setHoveredAnomalyIndex(null)}
                            >
                              <div className={cn(
                                "absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max max-w-xs whitespace-normal text-center rounded-[8px] bg-[#ffffff] border border-[#e0e2e8] px-3 py-2 text-[12px] font-medium text-[#1c1c1e] shadow-xl z-[999] transition-opacity duration-200",
                                isHovered ? "opacity-100 block" : "hidden group-hover:block"
                              )}>
                                {anomaly.description}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#ffffff]" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    {activeTab === "text" && (
                      <div className="w-full p-6 bg-[#ffffff] border border-[#eef0f3] rounded-[8px] self-start min-h-[300px]">
                        {renderTextWithHighlights(textContent, result.anomalies)}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column (Sidebar) */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="w-full lg:w-[400px] shrink-0"
              >
                <div className="flex flex-col justify-between rounded-[16px] border border-[#e0e2e8] bg-[#ffffff] p-8 shadow-[0_12px_32px_-4px_rgba(5,0,56,0.08)]">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      {result.is_ai_generated ? (
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#fbd4d4] bg-[#ffc6c6] px-4 py-1.5 text-[#600000]">
                          <ShieldAlert className="h-4 w-4" />
                          <span className="text-[13px] font-bold">AI Generated Detected</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#c3faf5] bg-[#c3faf5] px-4 py-1.5 text-[#187574]">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-[13px] font-bold">Human Created</span>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <div className="flex items-end gap-2 mb-2">
                        <h2 className="text-[64px] font-medium text-[#1c1c1e] tracking-tight leading-[1.1]">{result.confidence_score}%</h2>
                      </div>
                      <span className="text-[13px] font-bold text-[#8e91a0] tracking-wider uppercase mb-4 block">Confidence Score</span>
                      <p className="text-[16px] text-[#1c1c1e] leading-[1.5]">{result.conclusion}</p>
                    </div>

                    {result.anomalies && result.anomalies.length > 0 && (
                      <div className="space-y-3 bg-[#f7f8fa] p-5 rounded-[12px] border border-[#eef0f3]">
                        <h4 className="text-[13px] font-bold text-[#555a6a] uppercase tracking-wider">Detected Anomalies</h4>
                        <ul className="space-y-3">
                          {result.anomalies.map((anom, i) => (
                            <li 
                              key={i} 
                              className={cn(
                                "flex items-start gap-3 text-[14px] p-2 rounded-md transition-colors cursor-default",
                                hoveredAnomalyIndex === i ? "bg-[#ffffff] shadow-sm border border-[#e0e2e8]" : "hover:bg-[#eef0f3]"
                              )}
                              onMouseEnter={() => setHoveredAnomalyIndex(i)}
                              onMouseLeave={() => setHoveredAnomalyIndex(null)}
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#ff9999] shrink-0" />
                              <span className="text-[#1c1c1e]">{anom.description}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Actions Area */}
                  <div className="mt-8 flex flex-col gap-3 border-t border-[#e0e2e8] pt-6">
                    <button className="flex w-full items-center justify-center gap-2 rounded-full border border-[#c7cad5] bg-transparent px-4 py-3 text-[14px] font-medium text-[#1c1c1e] transition-colors hover:bg-[#f7f8fa]">
                      <Download className="h-4 w-4" />
                      Export PDF Report
                    </button>
                    <button 
                      onClick={resetScan}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1c1c1e] px-4 py-3 text-[14px] font-medium text-[#ffffff] transition-colors hover:bg-[#2c2c34]"
                    >
                      Scan Another
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
