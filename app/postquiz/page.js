'use client';

import React from 'react'
import ps from '../Styles/postquiz.module.css'; 
import { useRouter } from 'next/navigation';
import logo from '../assets/ivvi_Logo.svg'; 
import Image from 'next/image';
import { useUserDetection } from '../lib/hooks/useUserDetection';

function PostQuizPage() {
  const router = useRouter();
  const { user, loading, isNewUser } = useUserDetection();

  console.log('this is the value of new user \n', isNewUser); 
  console.log('this is the user \n', user); 

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

  const handleGoToIdeal = () => {
    router.push('/');
  };


  return (
    <>
    <section className={ps.mainCTASection}>

      <article className={ps.mainLogoContainer}>
      
        {/* Add in the Logo container here  */}
        <div className={ps.logoContainer}>
        <h1> 
        
        Want to screen your friends or family? </h1>
        </div>
              {/* Add in the logo here  */}

       </article>

                 <aside className={ps.buttonSectionContainer}>
         <div className={ps.CTAButton} onClick={handleShare}>Share Screener</div>
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
  )
}

export default PostQuizPage