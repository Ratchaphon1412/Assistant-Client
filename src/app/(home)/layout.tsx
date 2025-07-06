
import React from "react";
import type { Metadata } from "next";
import Image from 'next/image'
import { Geist, Geist_Mono } from "next/font/google";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

import { Navbar5 } from "./navbar";


import "../globals.css";

const GoogleSignInUrl = process.env.NEXT_PUBLIC_ENDPOINT_URL+ "/api/v1/auth/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ratcha AI | Assistant for your personal needs",
  description: "Ratcha AI is an AI assistant designed to help you with your personal needs, from answering questions to providing recommendations.",
  icons: {
    icon: "/assets/logo.svg",
    apple: "/assets/logo.svg",
  },
  openGraph: {
    title: "Ratcha AI | Assistant for your personal needs",
    description: "Ratcha AI is an AI assistant designed to help you with your personal needs, from answering questions to providing recommendations.",
    url: "/assets/images/link-img.png",
    siteName: "Ratcha AI",
    images: [
      {
        url: "/assets/logo.svg",
        width: 800,
        height: 600,
        alt: "Ratcha AI Logo",
      },
    ],
    locale: "th_TH",
    type: "website",
  },
};






interface Footer7Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSections = [
  {
    title: "Features",
    links: [
      { name: "Weather", href: "#" },
      { name: "Location", href: "#" },
      { name: "Search and Summarize", href: "#" },
    ],
  },
  {
    title: "About Me",
    links: [
      { name: "About", href: "https://ratchaphon1412.dev/" },
      { name: "Blog", href: "https://ratchaphon1412.dev/blog" },
      { name: "Project", href: "https://ratchaphon1412.dev/project" },
    ],
  },

];

const defaultSocialLinks = [
  { icon: <FaInstagram className="size-5" />, href: "https://www.instagram.com/ratchaphon1412", label: "Instagram" },
  { icon: <FaFacebook className="size-5" />, href: "https://www.facebook.com/ratchaphon.hinsui/", label: "Facebook" },
  { icon: <FaLinkedin className="size-5" />, href: "https://www.linkedin.com/in/ratchaphon-hinsui", label: "LinkedIn" },
];

const defaultLegalLinks = [
  { name: "Terms and Conditions", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

const Footer7 = ({
  logo = {
    url: "/",
    src: "/assets/logo.svg",
    alt: "logo",
    title: "Ratcha AI",
  },
  sections = defaultSections,
  description = "Ratcha AI is an AI assistant designed to help you with your personal needs, from answering questions to providing recommendations.",
  socialLinks = defaultSocialLinks,
  copyright = "© 2024 ratcha-ai.ratchaphon1412.dev. All rights reserved.",
  legalLinks = defaultLegalLinks,
}: Footer7Props) => {
  return (
    <section className="py-32">
      <div className="container mx-auto px-4">
        <div className="flex w-full flex-col justify-between gap-16 lg:flex-row lg:items-start">
          {/* Left section - Logo and description */}
          <div className="flex w-full max-w-md flex-col gap-6 lg:w-1/3">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <a href={logo.url}>
                <Image src={logo.src || "/placeholder.svg"} alt={logo.alt} title={logo.title}  width={32} height={32} />
              </a>
              <h2 className="text-xl font-semibold">{logo.title}</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            <ul className="flex items-center space-x-6 text-muted-foreground">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="font-medium hover:text-primary transition-colors">
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right section - Navigation links */}
          <div className="grid w-full gap-8 md:grid-cols-2 lg:w-2/3 lg:gap-12">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx} className="flex flex-col">
                <h3 className="mb-4 font-bold text-foreground">{section.title}</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} className="font-medium hover:text-primary transition-colors">
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom section - Copyright and legal links */}
        <div className="mt-16 flex flex-col justify-between gap-4 border-t pt-8 text-xs font-medium text-muted-foreground md:flex-row md:items-center">
          <p className="order-2 md:order-1">{copyright}</p>
          <ul className="order-1 flex flex-col gap-4 md:order-2 md:flex-row md:gap-6">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-primary transition-colors">
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav>
          <Navbar5 signinGoogleUrl={GoogleSignInUrl}/>
        </nav>
        {children}
        <footer>
          <Footer7 />
        </footer>
      </body>
    </html>
  );
}
