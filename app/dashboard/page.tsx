import { UserButton } from "@clerk/nextjs";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white font-sans text-[#1c1c1e]">
      <h1 className="mb-4 text-3xl font-medium">Dashboard</h1>
      <p className="mb-8">Welcome to the protected dashboard!</p>
      <UserButton />
    </div>
  );
}
