import React from 'react'
import Image from 'next/image'
import l from '../Styles/legal.module.css'; 
// import legal from '../assets/Say goodbye to the time.svg'; 
// import legal from '../assets/Real time NotetakinListen and learn, confident.svg';
// import legal from '../assets/Highlight Key Info.svg'; 
// import legal from '../assets/Study anywhere.svg'; 
// import legal from '../assets/Designed for You (2).svg'; 
import legal from '../assets/Your notes are comprehensiv.svg'; 






function page() {
  return (
    <section className={l.mainContainer} style={{backgroundColor: 'white'}}>
    <div className={l.subContainer}>



    <header className={l.headerImageContainer}>
    <Image className={l.mainImage}  src={legal} width={5000} height={5000} alt='notes' /> 
    </header>
    

    <div className={l.mainHeaderContainer}>
        <h1 className={l.mainTextHeader}>

        The Legals

        </h1>
    </div>

    <div>

    <article className={l.mainSupportingTextContainer}>

    <span className={l.mainTextSpan}>

    This is a screener, not a formal assessment of Dyslexia.
    </span>

    <span className={l.legalSpan}>
    By Clicking ‘next’ you agree to our <a className={l.termsSpan}>
    terms</a>
    &nbsp; and &nbsp;
    <span className={l.conditionsSpan}>

    conditions
    </span> 
    .   
    </span>
    
    
    </article>

    <div className={l.pagination} >


        </div>

    <div className={l.ctaContainer}>


    <div className={l.cta}>

      Next 


    </div>


    </div>


    </div>

    </div>


    </section>
  )
}

export default page