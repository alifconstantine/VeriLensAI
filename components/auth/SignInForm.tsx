"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import SocialLoginButtons from "./SocialLoginButtons";

export default function SignInForm() {
  const { signIn } = useSignIn();
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signIn) return;

    setIsLoading(true);
    setError("");

    try {
      const { error: signInError } = await signIn.create({
        identifier,
        password,
      });

      if (signInError) {
        setError(signInError.message || "Invalid credentials.");
      } else if (signIn.status === "complete") {
        await signIn.finalize();
        router.push("/scanner");
      } else {
        // Needs further steps (like MFA)
        console.log("Sign in status:", signIn.status);
        setError("Further authentication required.");
      }
    } catch (err: any) {
      console.error("Sign in error:", err);
      setError(err.errors?.[0]?.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-[16px] border border-[#e0e2e8] bg-white p-8">
      <div className="mb-6 flex flex-col items-center">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-sm bg-[#ffd02f]">
          <div className="h-5 w-5 rounded-full bg-[#1c1c1e]" />
        </div>
        <h1 className="text-[28px] font-medium leading-[1.25] text-[#1c1c1e]">Welcome back</h1>
        <p className="mt-2 text-[14px] text-[#555a6a]">Sign in to your VeriLens account</p>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-[#fbd4d4] p-3 text-[13px] font-medium text-[#600000]">
          {error}
        </div>
      )}

      <SocialLoginButtons />

      <div className="my-6 flex items-center gap-3">
        <hr className="w-full border-t border-[#e0e2e8]" />
        <span className="text-[12px] font-medium uppercase text-[#8e91a0]">or</span>
        <hr className="w-full border-t border-[#e0e2e8]" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="identifier" className="text-[13px] font-medium text-[#1c1c1e]">
            Email or Username
          </label>
          <input
            id="identifier"
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="h-[44px] rounded-[8px] border border-[#c7cad5] bg-white px-3 text-[14px] text-[#1c1c1e] outline-none transition-colors focus:border-[#4262ff] focus:ring-0"
            required
            disabled={isLoading}
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-[13px] font-medium text-[#1c1c1e]">
              Password
            </label>
            <Link href="/forgot-password" className="text-[13px] font-medium text-[#4262ff] hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-[44px] w-full rounded-[8px] border border-[#c7cad5] bg-white px-3 pr-10 text-[14px] text-[#1c1c1e] outline-none transition-colors focus:border-[#4262ff] focus:ring-0"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8e91a0] transition-colors hover:text-[#1c1c1e] focus:outline-none"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div id="clerk-captcha"></div>

        <button
          type="submit"
          disabled={isLoading || !signIn}
          className="mt-2 flex h-[44px] w-full items-center justify-center rounded-full bg-[#1c1c1e] text-[14px] font-medium text-white transition-colors hover:bg-[#2c2c34] disabled:opacity-50"
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-center text-[14px] text-[#555a6a]">
        Don't have an account?{" "}
        <Link href="/sign-up" className="font-medium text-[#4262ff] hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
