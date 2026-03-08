import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elite Hospitals | Coimbatore",
  description: "Premium Hospital Portfolio Web Portal for the Top 10 Elite Hospitals in Coimbatore.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakarta.variable} ${playfair.variable} font-sans bg-slate-50 text-slate-900 antialiased selection:bg-rose-200 selection:text-rose-900`}
      >
        {children}
      </body>
    </html>
  );
}
