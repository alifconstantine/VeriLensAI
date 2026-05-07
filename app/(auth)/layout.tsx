import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#fafbfc] px-4 font-sans text-[#1c1c1e]">
      <div className="w-full max-w-[400px]">
        {children}
      </div>
    </div>
  );
}
