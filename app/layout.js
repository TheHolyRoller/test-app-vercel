'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./lib/context/UserContext";
import { QuizProvider } from "./lib/context/QuizContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <UserProvider>
          <QuizProvider>
            {children}
          </QuizProvider>
        </UserProvider>
      </body>
    </html>
  );
}
