import Link from "next/link";
import { ArrowRight, CheckCircle2, Play, ShieldAlert, FileSearch, Globe } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Promo Banner */}
      <div className="sticky top-0 z-50 flex w-full items-center justify-center gap-3 bg-[#1c1c1e] px-4 py-3 text-sm font-medium text-white">
        <span className="rounded-full bg-[#ffd02f] px-2.5 py-1 text-[13px] font-semibold tracking-wide text-[#1c1c1e]">
          NEW
        </span>
        <span>Introducing VeriLens Deep Scan. Detect generated videos in real-time.</span>
        <Link href="#" className="ml-2 font-medium underline underline-offset-2 hover:text-[#ffd02f]">
          Learn more
        </Link>
      </div>

      {/* Navbar */}
      <nav className="sticky top-[48px] z-40 flex w-full items-center justify-between bg-white px-6 py-4 lg:px-12 border-b border-[#e0e2e8]">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#ffd02f]">
              <div className="h-4 w-4 rounded-full bg-[#1c1c1e]" />
            </div>
            <span className="text-xl font-medium tracking-tight text-[#1c1c1e]">VeriLens AI</span>
          </Link>
          <div className="hidden items-center gap-6 text-[15px] font-medium text-[#1c1c1e] md:flex">
            <Link href="#" className="hover:text-[#4262ff]">Product</Link>
            <Link href="#" className="hover:text-[#4262ff]">Solutions</Link>
            <Link href="#" className="hover:text-[#4262ff]">Resources</Link>
            <Link href="#" className="hover:text-[#4262ff]">Pricing</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/sign-in" className="hidden text-[15px] font-medium text-[#1c1c1e] transition-colors md:block hover:text-[#4262ff]">
            Login
          </Link>
          <Link href="/sign-up" className="flex items-center justify-center rounded-full bg-[#1c1c1e] px-6 py-3 text-[14px] font-medium text-white transition-all hover:scale-105 hover:bg-[#2c2c34] hover:shadow-lg active:scale-95">
            Start Scanning Free
          </Link>
        </div>
      </nav>

      <main className="flex w-full flex-col items-center">
        {/* Hero Section */}
        <section className="flex w-full max-w-[1280px] flex-col items-center px-6 pt-[120px] pb-16 text-center lg:px-8">
          <h1 className="max-w-4xl text-[48px] font-medium leading-[1.05] tracking-[-2px] text-[#1c1c1e] md:text-[60px] lg:text-[80px]">
            Detect the Unseen.<br />Verify the Truth.
          </h1>
          <p className="mt-6 max-w-2xl text-[18px] leading-[1.5] text-[#1c1c1e]">
            The most advanced AI-powered visual workspace to instantly detect deepfakes, synthetic media, and AI-generated images with 99.9% accuracy.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link href="/sign-up" className="flex h-12 items-center justify-center rounded-full bg-[#1c1c1e] px-8 text-[14px] font-medium text-white transition-all hover:scale-105 hover:bg-[#2c2c34] hover:shadow-lg active:scale-95">
              Start Scanning Free
            </Link>
            <Link href="#" className="flex h-12 items-center justify-center rounded-full border border-[#c7cad5] bg-transparent px-8 text-[14px] font-medium text-[#1c1c1e] transition-all hover:scale-105 hover:border-[#1c1c1e] hover:bg-[#f7f8fa] active:scale-95">
              Book a demo
            </Link>
          </div>

          {/* Social Proof */}
          <p className="mt-12 text-[14px] font-medium text-[#555a6a]">
            Trusted by 5,000+ journalists and media outlets worldwide
          </p>

          {/* Mockup */}
          <div className="group mt-16 w-full max-w-[1080px] overflow-hidden rounded-[16px] border border-[#e0e2e8] bg-white shadow-[0_12px_32px_-4px_rgba(5,0,56,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_48px_-12px_rgba(5,0,56,0.12)]">
            <div className="relative aspect-[16/9] w-full bg-[#f7f8fa]">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-[#a5a8b5] transition-transform duration-500 group-hover:scale-105">
                <ShieldAlert className="mb-4 h-16 w-16 text-[#c7cad5] transition-all duration-500 group-hover:text-[#ffd02f] group-hover:drop-shadow-md" />
                <p className="text-[16px] font-medium text-[#1c1c1e]">VeriLens Workspace Environment</p>
                <p className="text-[14px]">Image scanning visualization UI mockup</p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="w-full max-w-[1280px] px-6 py-[96px] lg:px-8">
          <div className="mb-12 flex flex-col items-center text-center">
            <h2 className="text-[48px] font-medium leading-[1.15] tracking-[-1px] text-[#1c1c1e]">
              Built for Absolute Certainty
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="group flex min-h-[320px] cursor-pointer flex-col justify-between rounded-[28px] bg-[#c3faf5] p-[32px] text-[#1c1c1e] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_32px_-8px_rgba(28,28,30,0.15)]">
              <div>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-white transition-transform duration-300 group-hover:scale-110">
                  <FileSearch className="h-6 w-6 text-[#1c1c1e]" />
                </div>
                <h3 className="mb-3 text-[28px] font-medium leading-[1.25]">Pixel-Level Forensics</h3>
                <p className="text-[16px] leading-[1.5]">
                  Analyze images at the microscopic level. Our engine detects unnatural pixel blending, metadata anomalies, and compression artifacts typical of AI generators.
                </p>
              </div>
              <div className="mt-8">
                <Link href="#" className="flex w-fit items-center gap-2 text-[14px] font-medium transition-transform group-hover:translate-x-1 hover:underline">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group flex min-h-[320px] cursor-pointer flex-col justify-between rounded-[28px] bg-[#fde0f0] p-[32px] text-[#1c1c1e] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_32px_-8px_rgba(28,28,30,0.15)]">
              <div>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-white transition-transform duration-300 group-hover:scale-110">
                  <Play className="h-6 w-6 text-[#1c1c1e]" />
                </div>
                <h3 className="mb-3 text-[28px] font-medium leading-[1.25]">Real-Time Video Analysis</h3>
                <p className="text-[16px] leading-[1.5]">
                  Detect deepfakes frame by frame. Monitor subtle discrepancies in facial micro-expressions, pulse rate, and audio-visual sync instantly.
                </p>
              </div>
              <div className="mt-8">
                <Link href="#" className="flex w-fit items-center gap-2 text-[14px] font-medium transition-transform group-hover:translate-x-1 hover:underline">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group flex min-h-[320px] cursor-pointer flex-col justify-between rounded-[28px] bg-[#ffc6c6] p-[32px] text-[#1c1c1e] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_32px_-8px_rgba(28,28,30,0.15)]">
              <div>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-white transition-transform duration-300 group-hover:scale-110">
                  <Globe className="h-6 w-6 text-[#1c1c1e]" />
                </div>
                <h3 className="mb-3 text-[28px] font-medium leading-[1.25]">Deepfake Origin Tracing</h3>
                <p className="text-[16px] leading-[1.5]">
                  Identify the source model. Our database cross-references the synthetic footprint with known models like Midjourney, DALL-E, and Sora to trace the origin.
                </p>
              </div>
              <div className="mt-8">
                <Link href="#" className="flex w-fit items-center gap-2 text-[14px] font-medium transition-transform group-hover:translate-x-1 hover:underline">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing/CTA Banner */}
        <section className="w-full max-w-[1280px] px-6 py-[64px] lg:px-8">
          <div className="flex flex-col items-center rounded-[32px] bg-[#1c1c1e] px-8 py-[64px] text-center text-white lg:px-16">
            <h2 className="mb-6 max-w-3xl text-[48px] font-medium leading-[1.15] tracking-[-1px]">
              Ready to unmask the truth?
            </h2>
            <p className="mb-10 max-w-xl text-[18px] leading-[1.5] text-[#a5a8b5]">
              Join thousands of experts who trust VeriLens to protect their digital integrity. Start scanning for free today.
            </p>
            <Link href="/sign-up" className="flex h-14 items-center justify-center rounded-full bg-white px-8 text-[16px] font-medium text-[#1c1c1e] transition-all hover:scale-105 hover:bg-[#e0e2e8] hover:shadow-[0_8px_20px_-4px_rgba(255,255,255,0.4)] active:scale-95">
              Start Scanning Free
            </Link>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-[14px] font-medium text-[#a5a8b5]">
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#ffd02f]" /> No credit card required</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#ffd02f]" /> Free plan available</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#ffd02f]" /> Setup in minutes</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#1c1c1e] py-[64px] text-white">
        <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
            <div className="col-span-2 lg:col-span-2">
              <Link href="/" className="mb-6 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#ffd02f]">
                  <div className="h-4 w-4 rounded-full bg-[#1c1c1e]" />
                </div>
                <span className="text-xl font-medium tracking-tight">VeriLens AI</span>
              </Link>
              <p className="text-[14px] leading-[1.5] text-[#a5a8b5] max-w-xs">
                The AI-powered visual workspace for instant deepfake detection and verification.
              </p>
            </div>
            
            <div className="flex flex-col gap-3">
              <h4 className="mb-2 text-[16px] font-medium">Product</h4>
              <Link href="#" className="text-[14px] text-[#a5a8b5] hover:text-[#fff]">Image Scanner</Link>
              <Link href="#" className="text-[14px] text-[#a5a8b5] hover:text-[#fff]">Video Analysis</Link>
              <Link href="#" className="text-[14px] text-[#a5a8b5] hover:text-[#fff]">Browser Extension</Link>
              <Link href="#" className="text-[14px] text-[#a5a8b5] hover:text-[#fff]">API Access</Link>
            </div>
            
            <div className="flex flex-col gap-3">
              <h4 className="mb-2 text-[16px] font-medium">Solutions</h4>
              <Link href="#" className="text-[14px] text-[#a5a8b5] hover:text-[#fff]">For Media</Link>
              <Link href="#" className="text-[14px] text-[#a5a8b5] hover:text-[#fff]">For Platforms</Link>
              <Link href="#" className="text-[14px] text-[#a5a8b5] hover:text-[#fff]">For Enterprises</Link>
              <Link href="#" className="text-[14px] text-[#a5a8b5] hover:text-[#fff]">For Governments</Link>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="mb-2 text-[16px] font-medium">Resources</h4>
              <Link href="#" className="text-[14px] text-[#a5a8b5] hover:text-[#fff]">Documentation</Link>
              <Link href="#" className="text-[14px] text-[#a5a8b5] hover:text-[#fff]">Research Hub</Link>
              <Link href="#" className="text-[14px] text-[#a5a8b5] hover:text-[#fff]">Blog</Link>
              <Link href="#" className="text-[14px] text-[#a5a8b5] hover:text-[#fff]">Help Center</Link>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="mb-2 text-[16px] font-medium">Company</h4>
              <Link href="#" className="text-[14px] text-[#a5a8b5] hover:text-[#fff]">About Us</Link>
              <Link href="#" className="text-[14px] text-[#a5a8b5] hover:text-[#fff]">Careers</Link>
              <Link href="#" className="text-[14px] text-[#a5a8b5] hover:text-[#fff]">Contact Sales</Link>
              <Link href="#" className="text-[14px] text-[#a5a8b5] hover:text-[#fff]">Privacy Policy</Link>
            </div>
          </div>
          <div className="mt-16 flex flex-col items-center justify-between border-t border-[#333] pt-8 sm:flex-row">
            <p className="text-[12px] font-medium text-[#a5a8b5]">
              © {new Date().getFullYear()} VeriLens AI. All rights reserved.
            </p>
            <div className="mt-4 flex gap-6 sm:mt-0">
              <Link href="#" className="text-[14px] text-[#a5a8b5] hover:text-[#fff]">Terms</Link>
              <Link href="#" className="text-[14px] text-[#a5a8b5] hover:text-[#fff]">Privacy</Link>
              <Link href="#" className="text-[14px] text-[#a5a8b5] hover:text-[#fff]">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
