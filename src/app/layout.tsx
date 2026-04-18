import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alex Johnson | Software Engineer",
  description:
    "Personal portfolio of Alex Johnson — Software Engineer with 3 years UK experience specialising in .NET, Java, Python, React, Angular, Azure, AWS, Docker and Kubernetes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#080c14] text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}
