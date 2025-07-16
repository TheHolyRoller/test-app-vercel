import React, { use, useState, useEffect } from 'react'
import s from '../Styles/start.module.css'; 
import { useRouter } from 'next/navigation';
import logo from '../assets/ivvi_Logo.svg'; 
import Image from 'next/image';
import { useUserDetection } from '../lib/hooks/useUserDetection';
import pq from '../Styles/PostQuizCard.module.css'; 


function Start() {

  const router = useRouter();
  const { user, loading, isNewUser } = useUserDetection();
  const [quizCompletionCount, setQuizCompletionCount] = useState(0);
  const [showRefreshMessage, setShowRefreshMessage] = useState(false);

  // Check quiz completion count on component mount
  useEffect(() => {
    const count = parseInt(localStorage.getItem('quizCompletionCount') || '0');
    setQuizCompletionCount(count);
    console.log('📊 Current quiz completion count:', count);

    setShowRefreshMessage(false);

  }, []);

  console.log('this is the value of new user \n', isNewUser); 
  console.log('this is the user \n', user); 

    


  const handleStartScreener = () => {
    if (loading || isNewUser === null) {
      console.log('Still determining user statupq...');
      return;
    }

    if (isNewUser) {
      console.log('this is the value of new user \n', isNewUser);
      console.log('New user detected, routing to /understand');
      router.push('/understand');
    } else {
      console.log('Returning user detected, routing to /audiopermission');
      // router.push('/audiopermission');
      router.push('/understand');

    }
  };
  return (
  
    <>
    <section className={pq.mainCTASection}>

      <article className={pq.mainLogoContainer}>
      
        {/* Add in the Logo container here  */}
        <div className={pq.logoContainer}>
        <h1 className={pq.mainTextHeader} > 
        <span className={pq.theSpan} >

        The
        </span>
         Adult Dyslexia Screener </h1>
        </div>


       </article>

        {/* Show refresh message only when explicitly triggered */}
        {showRefreshMessage && (
          <div className={pq.refreshMessageContainer}>
            <p className={pq.refreshMessage}>
              📝 Taking the quiz again? Please refresh this page first for the best experience.
            </p>
          </div>
        )}

        <aside className={pq.buttonSectionContainer}>
        <div className={pq.CTAButton} onClick={handleStartScreener} style={{fontSize: '2rem', letterSpacing: '1px'}} >Start Screener</div>
        </aside>


        <footer className={pq.ivviLogoContainer}>

          <span className={pq.bySpan}>by</span>

          <figure className={pq.logo}
          
          >

              <Image src={logo} width={150} height={50} alt='logo'/>


          </figure>

        </footer>


    </section>
    </>
  )
}

export default Start