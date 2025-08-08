'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./lib/context/UserContext";
import { QuizProvider } from "./lib/context/QuizContext";
import Navbar from './Components/Navbar'; 
import Footer from './Components/Footer1'; 
import Start from './Components/Start'; 
import { chewy } from './fonts/chewy';
import { nunito } from './fonts/nunito';
import { usePathname } from 'next/navigation';

// Import the auth hook here 
import { useAnonymousAuth } from "./lib/hooks/useAnonymousAuth";
import { use } from "react";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"
// Removed direct navColor import as it's now handled in the Footer component 


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  
  console.log('this is the anonymous auth function being called in layout \n', useAnonymousAuth); 
  useAnonymousAuth(); 
  
  const pathname = usePathname();
  const isQuizOrResultsPage = pathname.includes('/quiz') || pathname.includes('/result');
  const isCategoryPage = pathname.includes('/category');
  const isHomePage = pathname === '/'; 



  return (
    <html 
      lang="en" 
      className={`${chewy.variable} ${nunito.variable}`}
      style={{
        backgroundColor: (isCategoryPage || isHomePage) ? '#f3f3f3' : (isQuizOrResultsPage ? '#eaeaea' : 'inherit'),
        minHeight: '100vh'
      }}
    >
      <head>
        <title>Dyslexia Quiz App</title>
        <meta name="description" content="A quiz application to help identify signs of dyslexia" />
      </head>
      <body 
        className={`${inter.variable} antialiased`}
        style={{    
          minHeight: '100vh'
        }}
      >
        <UserProvider>
          <QuizProvider>
            <Navbar />
            {children}
            <Footer /> 
          </QuizProvider>
        </UserProvider>
        <Analytics />
        <SpeedInsights/>
        

      </body>
    </html>
  );
}
