import type { Metadata } from "next";
import { LanguageProvider } from "@/lib/i18n/language-provider";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "USRC Tigers Mini Rugby | Hong Kong's Premier Mini Rugby Programme",
  description:
    "Fun-first, safe mini rugby for ages 4–12 at King's Park, Hong Kong. Register for a free trial and join the USRC Tigers pathway from minis to youth & senior rugby.",
  keywords: [
    "mini rugby",
    "Hong Kong rugby",
    "USRC Tigers",
    "kids rugby",
    "King's Park",
    "youth sports",
  ],
  openGraph: {
    title: "USRC Tigers Mini Rugby",
    description:
      "Unleash their inner tiger. Free trial sessions at King's Park, Hong Kong.",
    type: "website",
  },
  icons: {
    icon: "/images/usrc-tigers-logo.png",
    apple: "/images/usrc-tigers-logo.png",
  },
};

const themeInitScript = `
(function () {
  try {
    var key = 'usrc-tigers-theme';
    var theme = localStorage.getItem(key) || 'dark';
    var root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
      </head>
      <body className="min-h-full antialiased bg-background text-foreground">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
