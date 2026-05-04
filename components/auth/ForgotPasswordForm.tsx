"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function ForgotPasswordForm() {
  const { signIn } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createChallenge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signIn) return;

    setIsLoading(true);
    setError("");

    try {
      const { error: createError } = await signIn.create({
        identifier: emailAddress,
      });
      
      if (createError) {
        setError(createError.message || "Could not initiate password reset.");
        setIsLoading(false);
        return;
      }

      const { error: sendError } = await signIn.resetPasswordEmailCode.sendCode();
      if (sendError) {
        setError(sendError.message || "Could not send reset code.");
        setIsLoading(false);
        return;
      }
      
      setSuccessfulCreation(true);
    } catch (err: any) {
      console.error("Forgot password error:", err);
      setError(err.errors?.[0]?.message || "Could not initiate password reset.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signIn) return;

    setIsLoading(true);
    setError("");

    try {
      const { error: verifyError } = await signIn.resetPasswordEmailCode.verifyCode({
        code,
      });

      if (verifyError) {
        setError(verifyError.message || "Invalid code.");
        setIsLoading(false);
        return;
      }

      const { error: submitError } = await signIn.resetPasswordEmailCode.submitPassword({
        password,
      });

      if (submitError) {
        setError(submitError.message || "Invalid password.");
        setIsLoading(false);
        return;
      }

      if (signIn.status === "complete") {
        await signIn.finalize();
        router.push("/dashboard");
      } else {
        console.log("Reset status:", signIn.status);
        setError("Password reset incomplete.");
      }
    } catch (err: any) {
      console.error("Reset password error:", err);
      setError(err.errors?.[0]?.message || "Invalid code or password.");
    } finally {
      setIsLoading(false);
    }
  };

  if (successfulCreation) {
    return (
      <div className="rounded-[16px] border border-[#e0e2e8] bg-white p-8">
        <div className="mb-6 flex flex-col items-center">
          <h1 className="text-[28px] font-medium leading-[1.25] text-[#1c1c1e]">Set new password</h1>
          <p className="mt-2 text-center text-[14px] text-[#555a6a]">
            Enter the code sent to your email and a new password.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-[#fbd4d4] p-3 text-[13px] font-medium text-[#600000]">
            {error}
          </div>
        )}

        <form onSubmit={resetPassword} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="code" className="text-[13px] font-medium text-[#1c1c1e]">
              Reset Code
            </label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="h-[44px] rounded-[8px] border border-[#c7cad5] bg-white px-3 text-[14px] text-[#1c1c1e] outline-none transition-colors focus:border-[#4262ff] focus:ring-0"
              required
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-[13px] font-medium text-[#1c1c1e]">
              New Password
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

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 flex h-[44px] w-full items-center justify-center rounded-full bg-[#1c1c1e] text-[14px] font-medium text-white transition-colors hover:bg-[#2c2c34] disabled:opacity-50"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="rounded-[16px] border border-[#e0e2e8] bg-white p-8">
      <div className="mb-6 flex flex-col items-center">
        <h1 className="text-[28px] font-medium leading-[1.25] text-[#1c1c1e]">Forgot password?</h1>
        <p className="mt-2 text-center text-[14px] text-[#555a6a]">
          Enter your email address and we'll send you a code to reset your password.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-[#fbd4d4] p-3 text-[13px] font-medium text-[#600000]">
          {error}
        </div>
      )}

      <form onSubmit={createChallenge} className="flex flex-col gap-4">
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

        <button
          type="submit"
          disabled={isLoading || !signIn}
          className="mt-2 flex h-[44px] w-full items-center justify-center rounded-full bg-[#1c1c1e] text-[14px] font-medium text-white transition-colors hover:bg-[#2c2c34] disabled:opacity-50"
        >
          {isLoading ? "Sending..." : "Send Reset Code"}
        </button>
      </form>

      <p className="mt-6 text-center text-[14px] text-[#555a6a]">
        Remember your password?{" "}
        <Link href="/sign-in" className="font-medium text-[#4262ff] hover:underline">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
