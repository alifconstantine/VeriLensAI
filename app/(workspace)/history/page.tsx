"use client";

import { FileImage, Type, Clock, Search, ChevronRight, ShieldAlert, CheckCircle, Trash2, X, FileText } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Id } from "@/convex/_generated/dataModel";

type HistoryItem = {
  _id: Id<"scans">;
  _creationTime: number;
  mediaType: string;
  isAiGenerated: boolean;
  confidenceScore: number;
  textContent?: string;
  fileName?: string;
  fileUrl?: string | null;
  conclusion: string;
};

export default function HistoryPage() {
  const history = useQuery(api.scans.getUserHistory) as HistoryItem[] | undefined;
  const deleteScan = useMutation(api.scans.deleteScan);

  const [previewItem, setPreviewItem] = useState<HistoryItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<Id<"scans"> | null>(null);

  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat("en-US", { 
      month: "short", 
      day: "numeric", 
      hour: "numeric", 
      minute: "numeric" 
    }).format(new Date(timestamp));
  };

  const handleDelete = async (id: Id<"scans">) => {
    try {
      await deleteScan({ id });
      setDeleteConfirmId(null);
      if (previewItem?._id === id) setPreviewItem(null);
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-10 relative">
      <div className="space-y-2">
        <h1 className="text-[36px] font-medium tracking-tight text-[#1c1c1e]">Scan History</h1>
        <p className="text-[16px] text-[#555a6a]">View all your past detections securely stored in the cloud.</p>
      </div>

      <div className="overflow-hidden rounded-[12px] border border-[#e0e2e8] bg-[#ffffff] shadow-[0_4px_12px_rgba(5,0,56,0.06)]">
        <table className="w-full text-left text-[14px] text-[#1c1c1e]">
          <thead className="border-b border-[#e0e2e8] bg-[#f7f8fa] text-[11px] uppercase text-[#8e91a0] font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4">Media</th>
              <th className="px-6 py-4">Content Snippet</th>
              <th className="px-6 py-4">Date & Time</th>
              <th className="px-6 py-4">Result</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e0e2e8]">
            {history === undefined ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-[#555a6a]">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#e0e2e8] border-t-[#1c1c1e]" />
                    <p>Loading your scan history...</p>
                  </div>
                </td>
              </tr>
            ) : history.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-[#555a6a]">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <Search className="h-8 w-8 text-[#e0e2e8]" />
                    <p>No history found. Run a scan to see it here.</p>
                  </div>
                </td>
              </tr>
            ) : (
              history.map((item) => (
                <tr key={item._id} className="group transition-colors hover:bg-[#fafbfc]">
                  {/* Media Type */}
                  <td className="px-6 py-5 align-middle">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f7f8fa] border border-[#e0e2e8] text-[#555a6a]">
                      {item.mediaType === "image" ? <FileImage className="h-5 w-5" /> : item.mediaType === "document" ? <FileText className="h-5 w-5" /> : <Type className="h-5 w-5" />}
                    </div>
                  </td>

                  {/* Content Snippet */}
                  <td className="px-6 py-5 align-middle max-w-[250px]">
                    {item.mediaType === "image" ? (
                      <div className="h-12 w-16 overflow-hidden rounded-[6px] border border-[#e0e2e8] bg-[#f7f8fa]">
                        {item.fileUrl ? (
                          <img src={item.fileUrl} alt="Snippet" className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[#a5a8b5]">Img</div>
                        )}
                      </div>
                    ) : item.mediaType === "document" ? (
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-[#8e91a0] shrink-0" />
                        <span className="truncate text-[14px] font-medium text-[#1c1c1e]">{item.fileName || "Document"}</span>
                      </div>
                    ) : (
                      <p className="truncate text-[14px] text-[#555a6a]" title={item.textContent}>
                        &quot;{item.textContent?.slice(0, 50) || "No text available"}&quot;...
                      </p>
                    )}
                  </td>

                  {/* Date/Time */}
                  <td className="px-6 py-5 align-middle">
                    <div className="flex items-center gap-2 text-[#555a6a]">
                      <Clock className="h-4 w-4" />
                      <span>{formatDate(item._creationTime)}</span>
                    </div>
                  </td>

                  {/* Result / Confidence */}
                  <td className="px-6 py-5 align-middle">
                    <div className="flex flex-col items-start gap-1.5">
                      {item.isAiGenerated ? (
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#fbd4d4] bg-[#ffc6c6] px-2.5 py-0.5 text-[#600000]">
                          <ShieldAlert className="h-3.5 w-3.5" />
                          <span className="text-[11px] font-bold uppercase tracking-wider">{item.confidenceScore}% AI</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#c3faf5] bg-[#c3faf5] px-2.5 py-0.5 text-[#187574]">
                          <CheckCircle className="h-3.5 w-3.5" />
                          <span className="text-[11px] font-bold uppercase tracking-wider">Human</span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-5 align-middle text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => setPreviewItem(item)}
                        className="inline-flex items-center gap-1 rounded-full border border-[#c7cad5] bg-transparent px-3 py-1.5 text-[12px] font-medium text-[#1c1c1e] transition-colors hover:bg-[#000000] group-hover:bg-[#1c1c1e] group-hover:text-[#ffffff] group-hover:border-[#1c1c1e]"
                      >
                        View Details <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                      <button 
                        onClick={() => setDeleteConfirmId(item._id)}
                        className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-[#fbd4d4] text-[#d92d20] bg-transparent transition-colors hover:bg-[#ffc6c6]"
                        title="Delete Scan"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#1c1c1e]/50 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm overflow-hidden rounded-[16px] bg-[#ffffff] p-6 shadow-[0_24px_64px_-12px_rgba(5,0,56,0.16)] border border-[#e0e2e8]"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fbd4d4]">
                  <Trash2 className="h-6 w-6 text-[#d92d20]" />
                </div>
                <h3 className="text-[20px] font-medium text-[#1c1c1e]">Delete this scan?</h3>
                <p className="text-[14px] text-[#555a6a]">
                  This action cannot be undone. The scan result and any uploaded files will be permanently removed.
                </p>
                <div className="flex w-full gap-3 pt-4">
                  <button 
                    onClick={() => setDeleteConfirmId(null)}
                    className="flex-1 rounded-full border border-[#c7cad5] bg-transparent px-4 py-2.5 text-[14px] font-medium text-[#1c1c1e] hover:bg-[#f7f8fa] transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => handleDelete(deleteConfirmId)}
                    className="flex-1 rounded-full bg-[#d92d20] px-4 py-2.5 text-[14px] font-medium text-[#ffffff] hover:bg-[#b02117] transition-colors shadow-sm"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1c1c1e]/50 backdrop-blur-sm p-4 sm:p-6 lg:p-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative flex w-full max-w-3xl flex-col max-h-full overflow-hidden rounded-[20px] bg-[#ffffff] shadow-[0_24px_64px_-12px_rgba(5,0,56,0.16)] border border-[#e0e2e8]"
            >
              <div className="flex items-center justify-between border-b border-[#e0e2e8] px-6 py-4 bg-[#f7f8fa]">
                <h2 className="text-[18px] font-medium text-[#1c1c1e] flex items-center gap-2">
                  <Search className="h-5 w-5 text-[#8e91a0]" /> 
                  Analysis Details
                </h2>
                <button 
                  onClick={() => setPreviewItem(null)}
                  className="rounded-full p-2 text-[#8e91a0] hover:bg-[#e0e2e8] hover:text-[#1c1c1e] transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col lg:flex-row flex-1 overflow-y-auto">
                <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-[#e0e2e8] bg-[#fafbfc]">
                  {previewItem.mediaType === "image" && previewItem.fileUrl ? (
                    <div className="relative flex items-center justify-center w-full h-full min-h-[250px] rounded-[8px] overflow-hidden border border-[#eef0f3] bg-[#ffffff]">
                      <img src={previewItem.fileUrl} alt="Analyzed Media" className="max-w-full max-h-full object-contain" />
                    </div>
                  ) : previewItem.mediaType === "document" && previewItem.fileUrl ? (
                    <div className="w-full h-full min-h-[400px] border border-[#eef0f3] rounded-[8px] bg-[#eef0f3] overflow-hidden">
                      <object data={previewItem.fileUrl} type="application/pdf" className="w-full h-full">
                        <iframe src={previewItem.fileUrl} className="w-full h-full border-none">
                          <p>Your browser does not support PDFs. Please download the PDF to view it.</p>
                        </iframe>
                      </object>
                    </div>
                  ) : (
                    <div className="w-full h-full p-4 bg-[#ffffff] border border-[#eef0f3] rounded-[8px] overflow-y-auto whitespace-pre-wrap text-[14px] text-[#1c1c1e] leading-[1.6]">
                      {previewItem.textContent}
                    </div>
                  )}
                </div>
                <div className="w-full lg:w-[320px] p-6 space-y-6 bg-[#ffffff]">
                  <div className="space-y-1">
                    <p className="text-[12px] font-bold text-[#8e91a0] uppercase tracking-wider">Date Scanned</p>
                    <p className="text-[14px] text-[#1c1c1e]">{formatDate(previewItem._creationTime)}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-[12px] font-bold text-[#8e91a0] uppercase tracking-wider">Detection Result</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[48px] font-medium text-[#1c1c1e] leading-none tracking-tight">{previewItem.confidenceScore}%</span>
                    </div>
                    {previewItem.isAiGenerated ? (
                      <div className="inline-flex items-center gap-1.5 rounded-full border border-[#fbd4d4] bg-[#ffc6c6] px-2.5 py-0.5 text-[#600000]">
                        <ShieldAlert className="h-3.5 w-3.5" />
                        <span className="text-[12px] font-bold uppercase tracking-wider">AI Generated</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 rounded-full border border-[#c3faf5] bg-[#c3faf5] px-2.5 py-0.5 text-[#187574]">
                        <CheckCircle className="h-3.5 w-3.5" />
                        <span className="text-[12px] font-bold uppercase tracking-wider">Human Created</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[#eef0f3]">
                    <p className="text-[12px] font-bold text-[#8e91a0] uppercase tracking-wider">Conclusion</p>
                    <p className="text-[14px] text-[#555a6a] leading-relaxed">{previewItem.conclusion}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
