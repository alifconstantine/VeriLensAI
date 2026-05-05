"use client";

import { motion, AnimatePresence } from "framer-motion";
import { History, Info, Download, UploadCloud, FileImage, Type, ShieldAlert, Cpu, CheckCircle } from "lucide-react";
import { useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

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
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageFile(e.target?.result as string);
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
    if (activeTab === "image" && !imageFile) return;
    if (activeTab === "text" && !textContent.trim()) return;

    setScanStatus("scanning");

    try {
      const response = await fetch("/api/detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mediaType: activeTab,
          content: activeTab === "image" ? imageFile : textContent,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to scan via OpenRouter");
      }

      const data = await response.json();
      setResult(data);
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
    setImageFile(null);
    setTextContent("");
  };

  const renderTextWithHighlights = (text: string, anomalies?: Anomaly[]) => {
    if (!anomalies || anomalies.length === 0) return <span>{text}</span>;

    // simplistic approach breaking text into chunks
    let chunks: { text: string; isMatch: boolean; desc?: string }[] = [{ text, isMatch: false }];

    anomalies.forEach((anomaly) => {
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
            newChunks.push({ text: anomaly.exact_text!, isMatch: true, desc: anomaly.description });
          }
        });
      });
      chunks = newChunks;
    });

    return (
      <div className="whitespace-pre-wrap leading-[1.5] text-[#1c1c1e]">
        {chunks.map((chunk, i) =>
          chunk.isMatch ? (
            <span key={i} className="group relative inline-block">
              <mark className="bg-[#ffd02f] text-[#1c1c1e] rounded-[4px] px-1 py-0.5 cursor-help transition-colors font-medium">
                {chunk.text}
              </mark>
              {chunk.desc && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-max max-w-[200px] rounded-[8px] bg-[#1c1c1e] px-3 py-1.5 text-[12px] text-[#ffffff] shadow-[0_16px_48px_-8px_rgba(5,0,56,0.12)] z-50">
                  {chunk.desc}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1c1c1e]" />
                </div>
              )}
            </span>
          ) : (
            <span key={i}>{chunk.text}</span>
          )
        )}
      </div>
    );
  };

  return (
    <div className="flex h-full w-full gap-8">
      {/* Main Scanner Area */}
      <div className="flex flex-1 flex-col h-full relative">
        <div className="flex flex-col flex-1 max-w-4xl w-full mx-auto space-y-8 pt-4 pb-12">

          <div className="space-y-2">
            <h1 className="text-[36px] font-medium tracking-tight text-[#1c1c1e]">
              AI Content Scanner
            </h1>
            <p className="text-[16px] text-[#555a6a]">
              Detect AI-generated content instantly with advanced deep learning models.
            </p>
          </div>

          {/* Pill Tabs */}
          <div className="flex w-fit items-center gap-2">
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

          {/* Dynamic Content Zone */}
          <AnimatePresence mode="wait">
            {scanStatus === "idle" && (
              <motion.div
                key="idle-zone"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="relative mt-2"
              >
                {activeTab === "image" ? (
                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsHovering(true); }}
                    onDragLeave={() => setIsHovering(false)}
                    onDrop={handleDrop}
                    onClick={() => !imageFile && fileInputRef.current?.click()}
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

                    {imageFile ? (
                      <div className="absolute inset-0 w-full h-full p-6">
                        <img src={imageFile} alt="Upload preview" className="w-full h-full object-contain rounded-[12px] border border-[#eef0f3]" />
                        <button
                          onClick={(e) => { e.stopPropagation(); setImageFile(null); }}
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

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={startScan}
                    disabled={activeTab === "image" ? !imageFile : !textContent.trim()}
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
                className="flex min-h-[400px] flex-col items-center justify-center rounded-[16px] border border-[#e0e2e8] bg-[#ffffff] shadow-[0_12px_32px_-4px_rgba(5,0,56,0.08)] mt-4"
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4"
              >
                {/* Visual Renderer Area */}
                <div className="flex flex-col rounded-[16px] border border-[#e0e2e8] bg-[#ffffff] overflow-hidden shadow-[0_12px_32px_-4px_rgba(5,0,56,0.08)] min-h-[400px]">
                  <div className="bg-[#f7f8fa] border-b border-[#e0e2e8] px-6 py-4">
                    <h3 className="text-[14px] font-medium text-[#1c1c1e]">Visual Analysis</h3>
                  </div>
                  <div className="flex-1 p-6 relative overflow-y-auto">
                    {activeTab === "image" && imageFile && (
                      <div className="relative inline-block w-full h-full">
                        <img src={imageFile} alt="Analyzed" className="max-w-full max-h-full object-contain rounded-[8px] mx-auto block border border-[#eef0f3]" />
                        {/* Bounding Boxes */}
                        {result.anomalies?.map((anomaly, i) => {
                          if (!anomaly.box_2d) return null;
                          const [ymin, xmin, ymax, xmax] = anomaly.box_2d;
                          return (
                            <div
                              key={i}
                              className="absolute border-2 border-[#ff9999] bg-[#ff9999]/10 rounded-[4px] group cursor-help"
                              style={{
                                top: `${(ymin / 1000) * 100}%`,
                                left: `${(xmin / 1000) * 100}%`,
                                height: `${((ymax - ymin) / 1000) * 100}%`,
                                width: `${((xmax - xmin) / 1000) * 100}%`,
                              }}
                            >
                              <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:block whitespace-nowrap rounded-[8px] bg-[#1c1c1e] px-3 py-1.5 text-[12px] text-[#ffffff] shadow-lg z-10">
                                {anomaly.description}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1c1c1e]" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    {activeTab === "text" && (
                      <div className="p-4 bg-[#fafbfc] border border-[#eef0f3] rounded-[8px]">
                        {renderTextWithHighlights(textContent, result.anomalies)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Results Card */}
                <div className="flex flex-col justify-between rounded-[16px] border border-[#e0e2e8] bg-[#f7f8fa] p-8 shadow-[0_12px_32px_-4px_rgba(5,0,56,0.08)]">
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
                      <div className="space-y-3 bg-[#ffffff] p-5 rounded-[12px] border border-[#eef0f3]">
                        <h4 className="text-[13px] font-bold text-[#555a6a] uppercase tracking-wider">Detected Anomalies</h4>
                        <ul className="space-y-3">
                          {result.anomalies.map((anom, i) => (
                            <li key={i} className="flex items-start gap-3 text-[14px] text-[#1c1c1e]">
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#ff9999] shrink-0" />
                              <span>{anom.description}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Actions Area */}
                  <div className="mt-8 flex items-center gap-4 border-t border-[#e0e2e8] pt-6">
                    <button className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#c7cad5] bg-transparent px-4 py-3 text-[14px] font-medium text-[#1c1c1e] transition-colors hover:bg-[#ffffff]">
                      <Download className="h-4 w-4" />
                      Export PDF
                    </button>
                    <button
                      onClick={resetScan}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#1c1c1e] px-4 py-3 text-[14px] font-medium text-[#ffffff] transition-colors hover:bg-[#2c2c34]"
                    >
                      Scan Another
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      {/* Local History Sidebar */}
      <div className="w-80 flex-shrink-0 border-l border-[#e0e2e8] bg-[#ffffff] p-6 flex flex-col h-[calc(100vh-64px)] overflow-hidden">
        <div className="relative flex items-center justify-between mb-8 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full border border-[#e0e2e8] bg-[#f7f8fa]">
              <History className="h-4 w-4 text-[#1c1c1e]" />
            </div>
            <h3 className="text-[18px] font-medium text-[#1c1c1e]">Recent Scans</h3>
          </div>

          <div className="group relative flex items-center justify-center">
            <Info className="h-4 w-4 text-[#8e91a0] cursor-help transition-colors hover:text-[#1c1c1e]" />
            <div className="absolute right-0 top-6 w-56 rounded-[8px] bg-[#1c1c1e] p-3 text-[12px] text-[#ffffff] shadow-[0_16px_48px_-8px_rgba(5,0,56,0.12)] opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none z-50">
              History is saved locally in your browser for privacy.
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
          {[
            { type: "Image", time: "Just now", score: "98%", isAi: true },
            { type: "Text", time: "2h ago", score: "12%", isAi: false },
            { type: "Video", time: "Yesterday", score: "84%", isAi: true }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="group relative flex flex-col gap-2 rounded-[12px] border border-[#e0e2e8] bg-[#ffffff] p-4 transition-all hover:bg-[#f7f8fa] hover:shadow-[0_4px_12px_rgba(5,0,56,0.06)] cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-[#555a6a]">{item.type} Scan</span>
                <span className="text-[11px] text-[#8e91a0]">{item.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={cn(
                  "h-2 w-2 rounded-full",
                  item.isAi ? "bg-[#ff9999]" : "bg-[#0fbcb0]"
                )} />
                <span className="text-[14px] font-medium text-[#1c1c1e]">
                  {item.score} {item.isAi ? "AI Generated" : "Human Written"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
