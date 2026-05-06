"use client";

import { FileImage, Type, Clock, Search, ChevronRight, ShieldAlert, CheckCircle } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function HistoryPage() {
  const history = useQuery(api.scans.getUserHistory);

  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat("en-US", { 
      month: "short", 
      day: "numeric", 
      hour: "numeric", 
      minute: "numeric" 
    }).format(new Date(timestamp));
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-10">
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
              <th className="px-6 py-4 text-right">Action</th>
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
                      {item.mediaType === "image" ? <FileImage className="h-5 w-5" /> : <Type className="h-5 w-5" />}
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
                    ) : (
                      <p className="truncate text-[14px] text-[#555a6a]" title={item.textContent}>
                        "{item.textContent?.slice(0, 50) || "No text available"}..."
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
                    <button className="inline-flex items-center gap-1 rounded-full border border-[#c7cad5] bg-transparent px-3 py-1.5 text-[12px] font-medium text-[#1c1c1e] transition-colors hover:bg-[#ffffff] group-hover:bg-[#1c1c1e] group-hover:text-[#ffffff] group-hover:border-[#1c1c1e]">
                      View Details <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
