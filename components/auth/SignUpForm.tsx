"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import SocialLoginButtons from "./SocialLoginButtons";

export default function SignUpForm() {
  const { signUp } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUp) return;

    setIsLoading(true);
    setError("");

    try {
      const { error: createError } = await signUp.create({
        emailAddress,
        username,
        password,
      });

      if (createError) {
        setError(createError.message || "An error occurred during sign up.");
        setIsLoading(false);
        return;
      }

      const { error: sendError } = await signUp.verifications.sendEmailCode();
      
      if (sendError) {
        setError(sendError.message || "Could not send verification code.");
      } else {
        setPendingVerification(true);
      }
    } catch (err: any) {
      console.error("Sign up error:", err);
      setError(err.errors?.[0]?.message || "An error occurred during sign up.");
    } finally {
      setIsLoading(false);
    }
  };

  const onPressVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUp) return;

    setIsLoading(true);
    setError("");

    try {
      const { error: verifyError } = await signUp.verifications.verifyEmailCode({
        code,
      });

      if (verifyError) {
        setError(verifyError.message || "Invalid verification code.");
      } else if (signUp.status === "complete") {
        await signUp.finalize();
        router.push("/dashboard");
      } else {
        console.log("Verification status:", signUp.status);
        setError("Verification incomplete. Please try again.");
      }
    } catch (err: any) {
      console.error("Verification error:", err);
      setError(err.errors?.[0]?.message || "Invalid verification code.");
    } finally {
      setIsLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <div className="rounded-[16px] border border-[#e0e2e8] bg-white p-8">
        <div className="mb-6 flex flex-col items-center">
          <h1 className="text-[28px] font-medium leading-[1.25] text-[#1c1c1e]">Verify Email</h1>
          <p className="mt-2 text-center text-[14px] text-[#555a6a]">
            We sent a code to <span className="font-medium text-[#1c1c1e]">{emailAddress}</span>.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-[#fbd4d4] p-3 text-[13px] font-medium text-[#600000]">
            {error}
          </div>
        )}

        <form onSubmit={onPressVerify} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="code" className="text-[13px] font-medium text-[#1c1c1e]">
              Verification Code
            </label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="h-[44px] rounded-[8px] border border-[#c7cad5] bg-white px-3 text-[14px] text-[#1c1c1e] outline-none transition-colors focus:border-[#4262ff] focus:ring-0"
              placeholder="e.g. 123456"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 flex h-[44px] w-full items-center justify-center rounded-full bg-[#1c1c1e] text-[14px] font-medium text-white transition-colors hover:bg-[#2c2c34] disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="rounded-[16px] border border-[#e0e2e8] bg-white p-8">
      <div className="mb-6 flex flex-col items-center">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-sm bg-[#ffd02f]">
          <div className="h-5 w-5 rounded-full bg-[#1c1c1e]" />
        </div>
        <h1 className="text-[28px] font-medium leading-[1.25] text-[#1c1c1e]">Create an account</h1>
        <p className="mt-2 text-[14px] text-[#555a6a]">Start your free trial today</p>
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
          <label htmlFor="username" className="text-[13px] font-medium text-[#1c1c1e]">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-[44px] rounded-[8px] border border-[#c7cad5] bg-white px-3 text-[14px] text-[#1c1c1e] outline-none transition-colors focus:border-[#4262ff] focus:ring-0"
            required
            disabled={isLoading}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-[13px] font-medium text-[#1c1c1e]">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            className="h-[44px] rounded-[8px] border border-[#c7cad5] bg-white px-3 text-[14px] text-[#1c1c1e] outline-none transition-colors focus:border-[#4262ff] focus:ring-0"
            required
            disabled={isLoading}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-[13px] font-medium text-[#1c1c1e]">
            Password
          </label>
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
          disabled={isLoading || !signUp}
          className="mt-2 flex h-[44px] w-full items-center justify-center rounded-full bg-[#1c1c1e] text-[14px] font-medium text-white transition-colors hover:bg-[#2c2c34] disabled:opacity-50"
        >
          {isLoading ? "Creating account..." : "Continue"}
        </button>
      </form>

      <p className="mt-6 text-center text-[14px] text-[#555a6a]">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-medium text-[#4262ff] hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
