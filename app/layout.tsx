import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "@/components/providers/convex-client-provider";
import "./globals.css";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "VeriLens AI | Detect the Unseen. Verify the Truth.",
  description: "The most advanced AI-powered visual workspace to instantly detect deepfakes, synthetic media, and AI-generated images with 99.9% accuracy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${notoSans.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col font-sans text-[#1c1c1e] bg-white">
          <ConvexClientProvider>
            {children}
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
