import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import NextAuthWrapper from "@/providers/NextAuthProvider"
import ToasterProvider from "@/providers/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learning Hub",
  description: "Empowering minds, shaping future"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthWrapper>
          <ToasterProvider />
          {children}
        </NextAuthWrapper>
      </body>
    </html>
  );
}
