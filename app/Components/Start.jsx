import React from 'react'
import s from '../Styles/start.module.css'; 
import { useRouter } from 'next/navigation';



function Start() {

  const router = useRouter();


  return (
  
    <>
    <section className={s.mainCTASection}>

      <article className={s.mainLogoContainer}>
      
        {/* Add in the Logo container here  */}
        <div className={s.logoContainer}>
        Dyslexia Screener 
        </div>
              {/* Add in the logo here  */}


       </article>


        <aside className={s.buttonSectionContainer}>
        <div className={s.CTAButton}  onClick={() => router.push('/sound')} >Start Quiz</div>
        </aside>
    </section>
    </>
  )
}

export default Start