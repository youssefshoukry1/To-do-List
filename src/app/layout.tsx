import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { UserContextProvider } from ".././context/userContext/UserContextProvider";
import Head from "next/head";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "To-Do",
  description: "To-Do-List",
  icons: {
    icon: "/List.webp", // هيظهر بدل أي favicon افتراضي
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
    crossOrigin="anonymous"
  />
</Head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UserContextProvider>
          <Navbar />
          {children}
          <Footer />
        </UserContextProvider>
      </body>
    </html>
  );
}
