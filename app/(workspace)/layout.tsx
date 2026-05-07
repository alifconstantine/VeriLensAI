import { Topbar } from "@/components/workspace/topbar";
import { Sidebar } from "@/components/workspace/sidebar";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#ffffff] text-[#1c1c1e] font-sans selection:bg-[#ffd02f]/30">
      {/* Main Layout Container */}
      <div className="relative z-10 flex h-screen flex-col">
        <Topbar />
        <div className="flex flex-1 overflow-hidden">
          <div className="hidden md:flex">
            <Sidebar />
          </div>
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-8 bg-[#f7f8fa] relative">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
