'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation'; 


import un from '../Styles/Unsubscribe.module.css'; 
import { nunito } from '../fonts/nunito';
import profile from '../assets/profile.svg'; 
import Image from 'next/image';
import Link from 'next/link';

const Unsubscribe = () => {
  const [unsubscribe, setUnsubscribe] = useState(false);
  const searchParams = useSearchParams(); 
  const router = useRouter(); 


  const email = searchParams.get("email"); 

  const question_text = "Are you sure you want to unsubscribe from ivvi news?";  
  const currentQuestion = { question_text: "" };

  if (!email) {
    console.error('No email found in the URL!');
  }

  const unsubscribeUser = async () => {
    try {
      const response = await axios.post('/api/unsubscribe', { email });
      console.log('API response:', response);
      setUnsubscribe(true);
  
      // Timeout helper
      const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
      // Wait 200ms before navigating
      await timeout(200);
      console.log('Timeout finished!');
  
      router.push('/'); // Navigate after timeout
    } catch (error) {
      console.error('Failed to unsubscribe:', error);
    }
  };
  

  useEffect(() => {
    console.log('unsubscribe state changed:', unsubscribe);
  }, [unsubscribe]);

  return (
    
        <>
          <article 
            className={`${un.card} ${nunito.className}`} 
            id={un.firstCARD}
            style={{
              backgroundColor: 'blue',
              position: 'relative',
              zIndex: 200,
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08)',
            }}
          >

            {/* 🔵 TOP BLUE PROF ILE SECTION */}
            <div 
              className={un.cardCategoryColorContainer}
              style={{
                backgroundColor: "#012973",
                boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1), -2px 0 8px rgba(0, 0, 0, 0.1), 2px 0 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div className={`${un.categoryLabelContainer} ${nunito.className}`}>
                <label className={`${un.categoryLabel} ${nunito.className}`}>
                  <div className={`${un.labelContainer} ${nunito.className}`} style={{backgroundColor: '#033699'}}>
                    <div className={un.cardLabelText}>Profile</div>
                    <div className={un.soundIconContainer}>
                      <div className={un.iconBackground}>
                        <Image src={profile} alt="profile" width={12} height={12} quality={100}/>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

              {/* Question text section  */}
            <div 
              className={`${un.question_textContainer} ${nunito.className}`} 
              style={{ marginTop: '-2.7rem' }}
            >
              <h2 className={`${un.question_text} ${nunito.className}`}>
                {question_text}
                <span>{currentQuestion?.question_text}</span>
              </h2>
            </div>


              {/* Add in the button container here */}
              <section className={un.unsubscribeSection}>
              <section className={un.subscribeSubContainer}>

                <section className={un.staySubscribedButtonContainer}>
                  <a href='/' >

                <button className={un.staySubscribedButton} >

                No Take me back!


                </button>
                  </a>
                </section>
                
                
                
                
                <div className={un.unsubscribeButtonContainer} >

                <button className={un.unsubscribeButton} onClick={() => unsubscribeUser()}>

                unsubscribe and miss out 

                </button>

                </div>

              </section>
              </section>

            {/* Background stacked cards */}
            <article className={un.card} id={un.cardOne}></article>
            <article className={un.card} id={un.cardTwo}></article>
            <article className={un.card} id={un.cardThree}></article>
            <article className={un.card} id={un.cardFour}></article>

          </article>

          <section className={un.buttonSectionContainer} style={{cursor: 'pointer'}}>
            <div className={un.ctaContainer}>
              <div className={un.cta} style={{fontSize: '2rem', letterSpacing: '1px'}}>
                Confirm
              </div>
            </div>
          </section>
        </>
    
  );
};

export default Unsubscribe;
