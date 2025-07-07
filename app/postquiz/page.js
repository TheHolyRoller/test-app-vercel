'use client';

import React, { useState, useEffect } from 'react';
import ps from '../Styles/postquiz.module.css'; 
import { useRouter } from 'next/navigation';
import logo from '../assets/ivvi_Logo.svg'; 
import Image from 'next/image';
import { useUserDetection } from '../lib/hooks/useUserDetection';

function PostQuizPage() {
  const router = useRouter();
  const { user, isNewUser } = useUserDetection();
  const [isMobile, setIsMobile] = useState(false);

  console.log('this is the value of new user \n', isNewUser); 
  console.log('this is the user \n', user);

  // Automatically refresh the page when component mounts - only once
  useEffect(() => {
    const hasRefreshedPostQuiz = sessionStorage.getItem('hasRefreshedPostQuiz');
    
    if (!hasRefreshedPostQuiz) {
      console.log('🔄 Auto-refreshing postquiz page - one time only');
      sessionStorage.setItem('hasRefreshedPostQuiz', 'true');
      window.location.reload();
    }
  }, []); 

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check on mount
    checkScreenSize();

    // Add event listener for screen resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Adult Dyslexia Screener',
          text: 'Take this quick dyslexia screening assessment to better understand your learning style and get personalized insights.',
          url: window.location.origin,
        });
        console.log('✅ Shared successfully');
      } catch (error) {
        console.error('❌ Share failed:', error);
      }
    } else {
      alert('Sharing not supported in this browser. Please use a mobile device or modern browser to share.');
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      const textToCopy = `Take this quick dyslexia screening assessment to better understand your learning style and get personalized insights. ${window.location.origin}`;
      
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
        alert('✅ Link copied to clipboard!');
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
          alert('✅ Link copied to clipboard!');
        } catch (err) {
          console.error('❌ Copy failed:', err);
          alert('❌ Failed to copy link. Please copy the URL manually.');
        }
        
        document.body.removeChild(textArea);
      }
    } catch (error) {
      console.error('❌ Copy to clipboard failed:', error);
      alert('❌ Failed to copy link. Please copy the URL manually.');
    }
  };

  const handleGoToIdeal = () => {
    router.push('/');
  };

  return (
    <>
      <section className={ps.mainCTASection}>
        <article className={ps.mainLogoContainer}>
          {/* Add in the Logo container here  */}
          <div className={ps.logoContainer}>
            <h1>Want to screen your friends or family?</h1>
          </div>
          {/* Add in the logo here  */}
        </article>

        <aside className={ps.buttonSectionContainer}>
          {isMobile ? (
            <div className={ps.CTAButton} onClick={handleShare}>Share Screener</div>
          ) : (
            <div className={ps.CTAButton} onClick={handleCopyToClipboard}>Copy Link</div>
          )}
        </aside>

        {/* Add in the final button here  */}
        <div className={ps.secondaryButtonContainer}>
          <div className={ps.secondaryButton} onClick={handleGoToIdeal}>
            *or Click here to Screen them now
          </div>
        </div>

        <footer className={ps.ivviLogoContainer}>
          <span className={ps.bySpan}>by</span>
          <figure className={ps.logo}>
            <Image src={logo} width={150} height={50} alt='logo'/>
          </figure>
        </footer>
      </section>
    </>
  );
}


export default PostQuizPage;