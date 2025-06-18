import React from 'react'
import s from '../Styles/start.module.css'; 
import { useRouter } from 'next/navigation';
import logo from '../assets/ivvi_Logo.svg'; 
import Image from 'next/image';


function Start() {

  const router = useRouter();


  return (
  
    <>
    <section className={s.mainCTASection}>

      <article className={s.mainLogoContainer}>
      
        {/* Add in the Logo container here  */}
        <div className={s.logoContainer}>
        <h1> 
        <span className={s.theSpan} >

        The
        </span>
         Adult Dyslexia Screener </h1>
        </div>
              {/* Add in the logo here  */}


       </article>


        <aside className={s.buttonSectionContainer}>
        <div className={s.CTAButton}  onClick={() => router.push('/sound')} >Start Screener </div>
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