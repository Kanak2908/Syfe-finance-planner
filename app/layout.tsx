// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Syfe Savings Planner",
  description: "A goal-based savings tracker built for the Syfe Frontend Intern Assignment.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#eef2ff] text-gray-900`}>
{children}</body>
    </html>
  );
}
