'use client';

import { useQuiz } from '../lib/context/QuizContext';
import { useUser } from '../lib/context/UserContext';
import { useRouter } from 'next/navigation';
import QuizCard from '../Components/QuizCard';
import logo from '../assets/ivvi_Logo.svg'; 

import {PermissionAnswer} from '../Components/PermissionAnswer'; 
// import e from '../Styles/emailPermission.modulpc.css'; 
import pc from '../Styles/PostQuizCard.module.css'; 

import { nunito } from '../fonts/nunito';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';


export default function PostQuizCard() {

  const [isMobile, setIsMobile] = useState(false);


  // Automatically refresh the page when component mounts - only once
  useEffect(() => {
    const hasRefreshedPostQuiz = sessionStorage.getItem('hasRefreshedPostQuiz');
    
    if (!hasRefreshedPostQuiz) {
      console.log('🔄 Auto-refreshing postquiz page - one time only');
      sessionStorage.setItem('hasRefreshedPostQuiz', 'true');
      window.location.reload();
    }
  }, []); 

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

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
    const router = useRouter();
    const { finalScore } = useQuiz();
    const { name, sound } = useUser();

    const handleYesClick = () => {
        router.push('/name');
    };


    const handleNoClick = () => {
        // Set flag to trigger refresh when landing on home page
        sessionStoragpc.setItem('needsRefreshFromEmailDecline', 'true');
        router.push('/');
    };

    const Section = "Post Quiz";
    const audio_url = '';
    const question_text = `t`;
    const currentQuestion = { question_text: "" };
    const currentIMG = '';
    
    // Placeholder functions
    const getLabelColorBySection = (section) => "#033699";

    return (
        <div>
        {/* Top Blue Navbar Strip */}
        <div 
          style={{
            width: '100%',
            height: '120px',
            backgroundColor: '#023597',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 100
          }}
        />
        

        {/* Main Content Container */}
        <div style={{ paddingTop: '60px' }}>
          <article 
          className={`${pc.card} ${nunito.className}`} 
          id={pc.firstCARD} 
          style={{
              position: 'relative',
              zIndex: 200,
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.06)',
              marginTop: '-40px', 
          }}
          >
      <div 
          className={pc.cardCategoryColorContainer} 
          style={{
              backgroundColor: '#4168b3',
              boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1), -2px 0 8px rgba(0, 0, 0, 0.1), 2px 0 8px rgba(0, 0, 0, 0.1)', 
  
          }}
      >
          
          
  
          <div className={`${pc.categoryLabelContainer} ${nunito.className}`}>
              <label className={`${pc.categoryLabel} ${nunito.className}`}>
  
  
                  <div className={`${pc.labelContainer} ${nunito.className}`} style={{backgroundColor: getLabelColorBySection(Section)}}>
                  Results
                  </div>
              </label>
          </div>
      </div>
  
      {question_text && (
          <div className={`${pc.question_textContainer} ${nunito.className}`}  >
              <h2 className={`${pc.question_text} ${nunito.className}`} style={{color: 'white' }}>
                  Want to screen your friends or family? 
  

  
              </h2>
          </div>
      )}
      
      <div className={pc.imageSectionContainer}>
          <div className={pc.doodleContainer}>
              {currentIMG && (
                  <Image 
                      src={currentIMG}
                      className={pc.currentIMG}
                      alt='quiz illustration'
                      width={300}
                      height={300}
                      unoptimized
                      onLoad={() => consolpc.log('🖼️ Image Loaded:', currentIMG)}
                      onError={(e) => consolpc.error('❌ Image Error:', e)}
                      style={{
                          marginTop: '-4.5rem',
                          objectFit: 'contain', 
                          zIndex: '0', 
                      }}
                  />
              )}
          </div>
      </div>

      <footer className={pc.ivviLogoContainer}>
                    <span className={pc.bySpan}>by</span>
                    <figure className={pc.logo}>
                        <Image src={logo} width={150} height={50} alt='logo' className={pc.logoImage} />
                    </figure>
                </footer>
  
      <article className={pc.card} id={pc.cardOne}></article>
      <article className={pc.card} id={pc.cardTwo}></article>
      <article className={pc.card} id={pc.cardThree}></article>
      <article className={pc.card} id={pc.cardFour}></article>
  </article>



<aside className={pc.buttonSectionContainer}>
          {isMobile ? (
            <div className={pc.CTAButton} onClick={handleShare}>Share Screener</div>
          ) : (
            <div className={pc.CTAButton} onClick={handleCopyToClipboard} style={{fontSize: '1.9rem', letterSpacing: '1px'}}>Copy Link</div>
          )}
        </aside>
        <div className={pc.secondaryButtonContainer}>
          <div className={pc.secondaryButton} onClick={handleGoToIdeal}>
            *or Click here to Screen them now
          </div>
        </div>
  
        </div>
      </div>
    );
} 