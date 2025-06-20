import React, { use } from 'react'
import s from '../Styles/start.module.css'; 
import { useRouter } from 'next/navigation';
import logo from '../assets/ivvi_Logo.svg'; 
import Image from 'next/image';
import { useUserDetection } from '../lib/hooks/useUserDetection';

function Start() {

  const router = useRouter();
  const { user, loading, isNewUser } = useUserDetection();


  console.log('this is the value of new user \n', isNewUser); 
  console.log('this is the user \n', user); 

    


  const handleStartScreener = () => {
    if (loading || isNewUser === null) {
      console.log('Still determining user status...');
      return;
    }

    if (isNewUser) {
      console.log('this is the value of new user \n', isNewUser);
      console.log('New user detected, routing to /understand');
      router.push('/understand');
    } else {
      console.log('Returning user detected, routing to /audiopermission');
      router.push('/audiopermission');
    }
  };

  return (
  
    <>
    <section className={s.mainCTASection}>

      <article className={s.mainLogoContainer}>
      
        {/* Add in the Logo container here  */}
        <div className={s.logoContainer}>
        <h1 className={s.mainTextHeader} > 
        <span className={s.theSpan} >

        The
        </span>
         Adult Dyslexia Screener </h1>
        </div>


       </article>


        <aside className={s.buttonSectionContainer}>
        <div className={s.CTAButton} onClick={handleStartScreener}>Start Screener</div>
        </aside>


        <footer className={s.ivviLogoContainer}>

          <span className={s.bySpan}>by</span>

          <figure className={s.logo}>

              <Image src={logo} width={150} height={50} alt='logo'/>


          </figure>

        </footer>


    </section>
    </>
  )
}

export default Start