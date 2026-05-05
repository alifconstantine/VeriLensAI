import { Check } from "lucide-react";
import Link from "next/link";
import { Topbar } from "@/components/workspace/topbar";

export default function PricingPage() {
  return (
    <div className="min-h-screen w-full bg-[#ffffff] text-[#1c1c1e] font-sans">
      <Topbar />
      
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mt-2 text-[60px] font-medium tracking-tight text-[#1c1c1e] sm:text-[80px] leading-[1.05]">
            Simple, transparent pricing for AI detection.
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-[18px] leading-[1.5] text-[#555a6a]">
          Choose the plan that best fits your needs. Get started for free, or upgrade for advanced AI models and higher limits.
        </p>

        <div className="mx-auto mt-16 grid max-w-md grid-cols-1 gap-6 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {/* Starter Plan */}
          <div className="rounded-[16px] border border-[#e0e2e8] bg-[#ffffff] p-8 xl:p-10">
            <h3 className="text-[28px] font-medium text-[#1c1c1e]">Starter</h3>
            <p className="mt-4 text-[14px] text-[#555a6a]">Perfect for individuals and light users.</p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-[48px] font-medium tracking-tight text-[#1c1c1e]">$10</span>
              <span className="text-[14px] font-medium text-[#555a6a]">/ 100 Credits</span>
            </p>
            <Link
              href="/sign-up"
              className="mt-6 block rounded-full border border-[#c7cad5] bg-transparent px-6 py-3 text-center text-[14px] font-medium text-[#1c1c1e] hover:bg-[#f7f8fa] transition-colors"
            >
              Get started today
            </Link>
            <ul role="list" className="mt-8 space-y-4 text-[14px] text-[#1c1c1e] xl:mt-10">
              <li className="flex gap-x-3 items-center"><Check className="h-5 w-5 flex-none text-[#1c1c1e]" /> Standard AI Models</li>
              <li className="flex gap-x-3 items-center"><Check className="h-5 w-5 flex-none text-[#1c1c1e]" /> Email Support</li>
              <li className="flex gap-x-3 items-center text-[#a5a8b5]"><Check className="h-5 w-5 flex-none text-[#e0e2e8]" /> Advanced AI Models</li>
              <li className="flex gap-x-3 items-center text-[#a5a8b5]"><Check className="h-5 w-5 flex-none text-[#e0e2e8]" /> API Access</li>
            </ul>
          </div>

          {/* Pro Plan (Most Popular) */}
          <div className="relative rounded-[16px] border-2 border-[#4262ff] bg-[#f5f3ff] p-8 xl:p-10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#f5f3ff] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#4262ff] border border-[#4262ff]">
              Most Popular
            </div>
            <h3 className="text-[28px] font-medium text-[#1c1c1e]">Pro</h3>
            <p className="mt-4 text-[14px] text-[#555a6a]">Advanced features for heavy users and professionals.</p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-[48px] font-medium tracking-tight text-[#1c1c1e]">$25</span>
              <span className="text-[14px] font-medium text-[#555a6a]">/ 300 Credits</span>
            </p>
            <Link
              href="/sign-up"
              className="mt-6 block rounded-full bg-[#4262ff] px-6 py-3 text-center text-[14px] font-medium text-[#ffffff] hover:bg-[#2a41b6] transition-colors"
            >
              Get started today
            </Link>
            <ul role="list" className="mt-8 space-y-4 text-[14px] text-[#1c1c1e] xl:mt-10">
              <li className="flex gap-x-3 items-center"><Check className="h-5 w-5 flex-none text-[#4262ff]" /> Advanced AI Models</li>
              <li className="flex gap-x-3 items-center"><Check className="h-5 w-5 flex-none text-[#4262ff]" /> Priority Support</li>
              <li className="flex gap-x-3 items-center"><Check className="h-5 w-5 flex-none text-[#4262ff]" /> Batch Scanning</li>
              <li className="flex gap-x-3 items-center text-[#a5a8b5]"><Check className="h-5 w-5 flex-none text-[#e0e2e8]" /> API Access</li>
            </ul>
          </div>

          {/* Enterprise / Max Plan */}
          <div className="rounded-[16px] border border-[#1c1c1e] bg-[#1c1c1e] p-8 text-[#ffffff] xl:p-10">
            <h3 className="text-[28px] font-medium text-[#ffffff]">Max</h3>
            <p className="mt-4 text-[14px] text-[#a5a8b5]">For developers and large scale integrations.</p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-[48px] font-medium tracking-tight text-[#ffffff]">$50</span>
              <span className="text-[14px] font-medium text-[#a5a8b5]">/ 800 Credits</span>
            </p>
            <Link
              href="/sign-up"
              className="mt-6 block rounded-full bg-[#ffffff] px-6 py-3 text-center text-[14px] font-medium text-[#1c1c1e] hover:bg-[#f7f8fa] transition-colors"
            >
              Contact sales
            </Link>
            <ul role="list" className="mt-8 space-y-4 text-[14px] text-[#ffffff] xl:mt-10">
              <li className="flex gap-x-3 items-center"><Check className="h-5 w-5 flex-none text-[#ffffff]" /> All Pro Features</li>
              <li className="flex gap-x-3 items-center"><Check className="h-5 w-5 flex-none text-[#ffffff]" /> API Access</li>
              <li className="flex gap-x-3 items-center"><Check className="h-5 w-5 flex-none text-[#ffffff]" /> Custom Webhooks</li>
              <li className="flex gap-x-3 items-center"><Check className="h-5 w-5 flex-none text-[#ffffff]" /> Enterprise SLA</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
