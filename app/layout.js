'use client';

import { Inter } from "next/font/google";
import "./globals.css";
// import './Styles/devices.css'; 
import { UserProvider } from "./lib/context/UserContext";
import { QuizProvider } from "./lib/context/QuizContext";
import Navbar from './Components/Navbar'; 
import Footer from './Components/Footer1'; 
import Start from './Components/Start'; 
import { chewy } from './fonts/chewy';

// Import the auth hook here 
import { useAnonymousAuth } from "./lib/hooks/useAnonymousAuth";
import { use } from "react";



const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  
  console.log('this is the anonymous auth function being called in layout \n', useAnonymousAuth); 
  useAnonymousAuth(); 
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
