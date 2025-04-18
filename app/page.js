'use client';

import { useRouter } from 'next/navigation';
import { useUser } from './lib/context/UserContext';
import { Suspense } from 'react';

export default function Home() {
  const router = useRouter();
  const { setUserType } = useUser();

  const handleAgeSelection = (age) => {
    try {
      setUserType(age);
      router.push('/quiz/sound');
    } catch (error) {
      console.error('Error in age selection:', error);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-8">Welcome to the Quiz</h1>
        <div className="flex gap-4">
          <button
            onClick={() => handleAgeSelection('adult')}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            I&apos;m an Adult
          </button>
          <button
            onClick={() => handleAgeSelection('child')}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            I&apos;m a Child
          </button>
        </div>
      </main>
    </Suspense>
  );
}
