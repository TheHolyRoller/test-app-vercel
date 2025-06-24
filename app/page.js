'use client';

import { useRouter } from 'next/navigation';
import { useUser } from './lib/context/UserContext';
import { Suspense, useEffect } from 'react';
import StartQuiz from './start/page';

export default function Home() {
  const router = useRouter();
  const { setUserType } = useUser();

  // Refresh the page when component mounts to reset quiz state
  useEffect(() => {
    // Check if user is coming from internal navigation and hasn't been refreshed yet
    const hasRefreshed = sessionStorage.getItem('hasRefreshed');
    const needsRefreshFromEmailDecline = sessionStorage.getItem('needsRefreshFromEmailDecline');
    const isFromInternal = document.referrer && document.referrer.includes(window.location.origin);
    
    // Refresh if coming from internal navigation OR if user declined email submission
    if ((isFromInternal && !hasRefreshed) || needsRefreshFromEmailDecline) {
      console.log('🔄 Refreshing page to reset quiz state');
      sessionStorage.setItem('hasRefreshed', 'true');
      sessionStorage.removeItem('needsRefreshFromEmailDecline'); // Clear the email decline flag
      window.location.reload();
    }
    
    // Clear the refresh flag after a short delay to allow for future refreshes
    const timer = setTimeout(() => {
      sessionStorage.removeItem('hasRefreshed');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleAgeSelection = (age) => {
    try {
      setUserType(age);
      router.push('/sound');
    } catch (error) {
      console.error('Error in age selection:', error);
    }
  };

  return (

    <StartQuiz/> 


  );
}
