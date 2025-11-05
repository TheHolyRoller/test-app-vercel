'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { account } from '../../lib/appwrite';
import { useRouter, useSearchParams } from 'next/navigation';

function CallbackContent() {
  console.log('this is the callback function')
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('Verifying...');

  useEffect(() => {
    const handleCallback = async () => {
      const userId = searchParams.get('userId');
      const secret = searchParams.get('secret');
      
      console.log('this is the user ID just extracted from search params \n', userId); 
      console.log('this is the user secret just extracted from search params \n', secret); 
      
      if (!userId || !secret) {
        setStatus('Invalid link');
        console.error('invalid user ID or secret!!!!:::'); 
        return;
      }

      try {
        // ✅ STEP 1: Delete any existing session (like anonymous session)
        try {
          await account.deleteSession('current');
          console.log('🗑️ Deleted existing session');
        } catch (err) {
          // If there's no session to delete, that's fine
          console.log('No existing session to delete');
        }

        // ✅ STEP 2: Create the magic URL session with correct parameters
        await account.createSession(userId, secret);
        
        console.log('✅ Session created successfully');
        setStatus('Login successful! Redirecting...');
        router.push('/profile');
      } catch (err) {
        console.error('❌ Error creating session:', err);
        setStatus('Invalid or expired link');
      }
    };

    handleCallback();
  }, [router, searchParams]);

  return <p>{status}</p>;
}

export default function CallbackPage() {
  return (
    <Suspense fallback={<p>Loading verification...</p>}>
      <CallbackContent />
    </Suspense>
  );
}