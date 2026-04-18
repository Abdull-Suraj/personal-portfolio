import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abdullahi Suraj | Software Developer",
  description:
    "Personal portfolio of Abdullahi Suraj — Software Developer based in Birmingham, England, UK, specialising in .NET, Java, Python, React, Angular, Azure, AWS, Docker and Kubernetes.",
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
