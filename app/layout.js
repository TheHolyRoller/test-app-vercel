'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./lib/context/UserContext";
import { QuizProvider } from "./lib/context/QuizContext";
import Navbar from './Components/Navbar'; 
import Footer from './Components/Footer1'; 
import Start from './Components/Start'; 
import { chewy } from './fonts/chewy';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  
  
  
  return (
    <html lang="en" className={`${chewy.variable}`}>
      <head>
        <title>Dyslexia Quiz App</title>
        <meta name="description" content="A quiz application to help identify signs of dyslexia" />
      </head>
      <body className={`${inter.variable} antialiased`}>
      <Navbar/>
        <UserProvider>
          <QuizProvider>
            {children}
          </QuizProvider>
        </UserProvider>
        <Footer/> 
        

      </body>
    </html>
  );
}
