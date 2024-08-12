import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { Toaster } from "sonner";

import { ClerkProvider } from "@clerk/nextjs";

import ModalProvider from "@/providers/modal-provider";

import "./globals.css";
import CrispProvider from "@/providers/crisp-provider";
import ThemeProvider from "@/providers/theme-provider";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "GenMagic",
    template: "%s | GenMagic",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <CrispProvider />
        <body className={`${openSans.className} antialiased`}>
          <ThemeProvider>
            <ModalProvider />
            {children}
            <Toaster richColors position="top-center" />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
