
import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ChatNavbar } from "./navbar";
import "../../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chat | Ratcha AI",
  description: "Ratcha AI is an AI assistant designed to help you with your personal needs, from answering questions to providing recommendations.",
  icons: {  
    icon: "/assets/logo.svg",
    apple: "/assets/logo.svg",
  }
};



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



 

  return (
     <html lang="en">
          
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen `}
          >
            <div className="bg-gradient-to-br from-background via-blue-800 to-accent h-screen ">

              <ChatNavbar  />
              <div className="">

              {children}
              </div>
            </div>
            
          </body>
        </html>
  );
}