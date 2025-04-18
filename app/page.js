'use client';

import { useRouter } from 'next/navigation';
import { useUser } from './lib/context/UserContext';
import { Suspense } from 'react';
import StartQuiz from './start/page';

export default function Home() {
  const router = useRouter();
  const { setUserType } = useUser();

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
