"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  ArrowRight,
  Check,
  FileSearch,
  ShieldCheck,
  Zap,
  BarChart3,
  Globe,
  Eye,
  Layers,
  ScanLine,
  Video,
  Brain,
  Play,
} from "lucide-react";
import { motion } from "framer-motion";
import "./landing.css";

/* ── Scroll-reveal hook ── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll(".fade-in-up");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ===================================================================== */

export default function Home() {
  const wrapperRef = useScrollReveal();

  return (
    <div className="landing-page" ref={wrapperRef}>
      {/* ── Navbar ── */}
      <nav className="landing-nav">
        <Link href="/" className="landing-nav-logo">
          <img src="/logo.png" alt="VeriLens" />
          <span>VeriLens</span>
        </Link>
        <div className="landing-nav-links">
          <Link href="#features">Features</Link>
          <Link href="#pricing">Pricing</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="landing-nav-actions">
          <Link href="/sign-in" className="nav-login">
            Login
          </Link>
          <Link href="/sign-up" className="btn-primary btn-small">
            Try VeriLens free
          </Link>
        </div>
      </nav>

      {/* ── Hero with Video Background ── */}
      <section className="hero-section">
        {/* Background Video */}
        <video
          className="hero-video-bg"
          src="/Background.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="hero-content">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="hero-badge">
              Now with Deep Scan v2 support ✨
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            The Future of <em>Smarter</em> Detection
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Detect deepfakes, synthetic media, and AI-generated content
            instantly with intelligent agents that analyze, verify, and
            report — so your team can trust what they see.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/sign-up" className="btn-primary">
              Start scanning free
            </Link>
            <button className="btn-ghost" aria-label="Watch demo">
              <Play size={16} style={{ fill: "currentColor" }} />
            </button>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            className="hero-dashboard"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="hero-dashboard-glass">
              <img
                src="/mockup.png"
                alt="VeriLens AI Scanner Dashboard"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Device Showcase ── */}
      <section className="device-section">
        <div className="section-header fade-in-up">
          <p className="section-label">Seamless across devices</p>
          <h2 className="section-title">
            Work from anywhere,
            <br />
            stay in sync
          </h2>
        </div>
        <div className="device-image-wrapper fade-in-up delay-1">
          {/* IMAGE NOTE: mobile-scanner.png – generated 1024×1024, ideally replace with 1440×900 hero screenshot */}
          <img
            src="/mobile-scanner.png"
            alt="VeriLens mobile and desktop experience"
          />
        </div>
      </section>

      {/* ── Split: Scan Management ── */}
      <section className="split-section">
        <div className="split-content fade-in-up">
          <div className="split-image">
            {/* IMAGE NOTE: scan-dashboard.png – generated 1024×1024, ideally replace with 640×480 UI screenshot */}
            <img
              src="/scan-dashboard.png"
              alt="VeriLens scan management dashboard"
            />
          </div>
          <div className="split-text">
            <p className="section-label">Scan Management</p>
            <h2>Keep every scan organized and clear</h2>
            <p>
              <strong>Upload, analyze, and track every piece of media</strong> –
              all in one place. With intelligent categorization and real-time
              results, you stay on top of every detection.
            </p>
            <Link href="/sign-up" className="btn-primary btn-small">
              Try VeriLens free
            </Link>
            <div className="tag-pills">
              <span className="tag-pill">
                <ScanLine size={14} /> Image Scan
              </span>
              <span className="tag-pill">
                <Video size={14} /> Video Scan
              </span>
              <span className="tag-pill">
                <Layers size={14} /> Batch Upload
              </span>
              <span className="tag-pill">
                <BarChart3 size={14} /> Reports
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Split: Analytics (reversed) ── */}
      <section className="split-section">
        <div className="split-content reversed fade-in-up">
          <div className="split-text">
            <p className="section-label">Detection Analytics</p>
            <h2>
              Track results, gain insights, stay confident
            </h2>
            <p>
              <strong>View detailed forensic reports,</strong> log detection
              history, and monitor accuracy trends. Whether you scan one image
              or thousands, everything is tracked and exportable.
            </p>
            <Link href="/sign-up" className="btn-primary btn-small">
              Try VeriLens free
            </Link>
            <div className="tag-pills">
              <span className="tag-pill">
                <BarChart3 size={14} /> Analytics
              </span>
              <span className="tag-pill">
                <FileSearch size={14} /> Forensics
              </span>
              <span className="tag-pill">
                <Brain size={14} /> AI Models
              </span>
              <span className="tag-pill">
                <Globe size={14} /> API Access
              </span>
            </div>
          </div>
          <div className="split-image">
            {/* IMAGE NOTE: analytics-dashboard.png – generated 1024×1024, ideally replace with 640×480 analytics screenshot */}
            <img
              src="/analytics-dashboard.png"
              alt="VeriLens detection analytics dashboard"
            />
          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className="features-section" id="features">
        <div className="section-header fade-in-up">
          <p className="section-label">Features</p>
          <h2 className="section-title">
            Built for certainty,
            <br />
            powered by precision
          </h2>
        </div>

        <div className="features-grid-top">
          <div className="feature-card fade-in-up">
            <div className="feature-card-icon">
              <FileSearch size={22} />
            </div>
            <h3>Pixel-level forensic analysis</h3>
            <p>
              Detect unnatural pixel blending, metadata anomalies, and
              compression artifacts typical of AI image generators at the
              microscopic level.
            </p>
          </div>
          <div className="feature-card fade-in-up delay-1">
            <div className="feature-card-icon">
              <Globe size={22} />
            </div>
            <h3>Deepfake origin tracing</h3>
            <p>
              Cross-reference synthetic footprints with known models like
              Midjourney, DALL-E, Stable Diffusion, and Sora to identify the
              source.
            </p>
          </div>
        </div>

        <div className="features-grid-bottom">
          <div className="feature-card fade-in-up">
            <div className="feature-card-icon">
              <Eye size={20} />
            </div>
            <h3>Real-time detection</h3>
            <p>
              Instant analysis on upload with results in seconds, not minutes.
              Perfect for breaking news workflows.
            </p>
          </div>
          <div className="feature-card fade-in-up delay-1">
            <div className="feature-card-icon">
              <Zap size={20} />
            </div>
            <h3>Multi-model engine</h3>
            <p>
              Our ensemble of specialized AI models provides cross-validated
              results for maximum accuracy.
            </p>
          </div>
          <div className="feature-card fade-in-up delay-2">
            <div className="feature-card-icon">
              <ShieldCheck size={20} />
            </div>
            <h3>Exportable PDF reports</h3>
            <p>
              Generate professional forensic reports with detailed findings for
              legal, editorial, or compliance use.
            </p>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="testimonials-section">
        <div className="fade-in-up">
          <p className="testimonial-quote">
            &ldquo;VeriLens is by far the most reliable AI detection tool we
            have ever used&rdquo;
          </p>
        </div>
        <div className="testimonial-author fade-in-up delay-1">
          <div className="testimonial-avatar">
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "hsl(239 84% 93%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                fontWeight: 600,
                color: "hsl(239 84% 67%)",
              }}
            >
              A
            </div>
          </div>
          <span className="testimonial-name">Alex Rivera</span>
          <span className="testimonial-role">
            VP Digital Media, Reuters
          </span>
        </div>

        <div className="testimonials-carousel fade-in-up delay-2">
          {[
            {
              text: "As a newsroom that publishes thousands of images daily, we needed a tool we could trust. VeriLens catches what human eyes miss — every single time.",
              name: "Sarah Chen",
              role: "Editor-in-Chief, TechCrunch",
              initials: "SC",
            },
            {
              text: "We integrated VeriLens into our content moderation pipeline. The API is clean, fast, and the accuracy is remarkable. It's become indispensable.",
              name: "Marcus Webb",
              role: "CTO, MediaGuard",
              initials: "MW",
            },
            {
              text: "Before VeriLens, verifying user-submitted photos was a nightmare. Now it takes seconds. The forensic reports are detailed enough for legal proceedings.",
              name: "Dr. Lena Park",
              role: "Digital Forensics Lead, Interpol",
              initials: "LP",
            },
            {
              text: "The batch scanning feature alone saved us hundreds of hours. We process over 10,000 images per week and VeriLens handles it effortlessly.",
              name: "James Okoro",
              role: "Head of Trust & Safety, Snap",
              initials: "JO",
            },
          ].map((t, i) => (
            <div className="testimonial-card" key={i}>
              <p className="testimonial-card-text">&ldquo;{t.text}&rdquo;</p>
              <div className="testimonial-card-author">
                <div className="testimonial-card-avatar">{t.initials}</div>
                <div className="testimonial-card-info">
                  <div className="tc-name">{t.name}</div>
                  <div className="tc-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="pricing-section" id="pricing">
        <div className="section-header fade-in-up">
          <p className="section-label">Pricing</p>
          <h2 className="section-title">
            Simple plans
            <br />
            for serious work
          </h2>
        </div>

        <div className="pricing-cards fade-in-up delay-1">
          {/* Free */}
          <div className="pricing-card">
            <div className="pricing-card-name">VeriLens Basic</div>
            <div className="pricing-card-price">Free</div>
            <div className="pricing-card-desc">
              For individuals and light scanning needs.
            </div>
            <ul className="pricing-card-features">
              <li className="pricing-card-feature">
                <Check size={16} /> 20 scans per month
              </li>
              <li className="pricing-card-feature">
                <Check size={16} /> Image analysis
              </li>
              <li className="pricing-card-feature">
                <Check size={16} /> Basic forensic reports
              </li>
              <li className="pricing-card-feature">
                <Check size={16} /> Scan history
              </li>
            </ul>
            <Link href="/sign-up" className="btn-primary">
              Try VeriLens free
            </Link>
          </div>

          {/* Premium */}
          <div className="pricing-card featured">
            <div className="pricing-card-name">
              VeriLens Pro
              <span className="pricing-card-badge">Save 20%</span>
            </div>
            <div className="pricing-card-price">
              $29<span>/mo</span>
            </div>
            <div className="pricing-card-desc">
              For professionals and newsrooms.
            </div>
            <ul className="pricing-card-features">
              <li className="pricing-card-feature">
                <Check size={16} /> Everything in Basic
              </li>
              <li className="pricing-card-feature">
                <Check size={16} /> Unlimited scans
              </li>
              <li className="pricing-card-feature">
                <Check size={16} /> Video analysis
              </li>
              <li className="pricing-card-feature">
                <Check size={16} /> PDF export
              </li>
              <li className="pricing-card-feature">
                <Check size={16} /> Origin tracing
              </li>
            </ul>
            <Link href="/sign-up" className="btn-primary">
              Get started
            </Link>
          </div>

          {/* Enterprise */}
          <div className="pricing-card">
            <div className="pricing-card-name">VeriLens Enterprise</div>
            <div className="pricing-card-price">Custom</div>
            <div className="pricing-card-desc">
              For teams and organizations at scale.
            </div>
            <ul className="pricing-card-features">
              <li className="pricing-card-feature">
                <Check size={16} /> Everything in Pro
              </li>
              <li className="pricing-card-feature">
                <Check size={16} /> API access
              </li>
              <li className="pricing-card-feature">
                <Check size={16} /> Custom integrations
              </li>
              <li className="pricing-card-feature">
                <Check size={16} /> Dedicated support
              </li>
              <li className="pricing-card-feature">
                <Check size={16} /> SLA guarantee
              </li>
            </ul>
            <Link href="/contact" className="btn-primary">
              Contact sales
            </Link>
          </div>
        </div>
      </section>

      {/* ── Community ── */}
      <section className="community-section">
        <div className="section-header fade-in-up">
          <p className="section-label">Community</p>
          <h2 className="section-title">Stay in the loop</h2>
        </div>

        <div className="community-cards fade-in-up delay-1">
          <div className="community-card">
            <p className="community-card-stat">5,000+ users</p>
            <h3>X / Twitter</h3>
            <p>
              Stay updated on new detection models, feature releases, and learn
              how experts are using VeriLens.
            </p>
            <Link href="https://x.com" className="btn-primary btn-small">
              Follow us
            </Link>
          </div>
          <div className="community-card">
            <p className="community-card-stat">2,400+ subscribers</p>
            <h3>YouTube</h3>
            <p>
              Tutorials, case studies, and in-depth guides on AI detection,
              digital forensics, and media verification.
            </p>
            <Link
              href="https://youtube.com"
              className="btn-primary btn-small"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="cta-section fade-in-up">
        <h2>Ready to get started?</h2>
        <p>
          Start scanning for free. No credit card required.
        </p>
        <Link href="/sign-up" className="btn-primary">
          Try VeriLens free
        </Link>
      </section>

      {/* ── Footer ── */}
      <footer className="landing-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="landing-nav-logo">
              <img src="/logo.png" alt="VeriLens" />
              <span>VeriLens</span>
            </Link>
            <p>
              The AI-powered visual workspace for instant deepfake detection
              and media verification. Built for journalists, newsrooms, and
              trust &amp; safety teams.
            </p>
          </div>
          <div className="footer-col">
            <h4>Pages</h4>
            <Link href="/">Home</Link>
            <Link href="#features">Features</Link>
            <Link href="#pricing">Pricing</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="footer-col">
            <h4>Information</h4>
            <Link href="/contact">Support</Link>
            <Link href="/pricing">Plans</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} VeriLens AI. All rights reserved.</span>
          <span>Built with ❤️ for digital truth</span>
        </div>
      </footer>
    </div>
  );
}
