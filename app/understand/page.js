import React from 'react';
import Image from 'next/image';
import f from '../assets/Group 633184.svg'; 
import notes from '../assets/Group 633184.svg'; 
import num from '../assets/image 40.svg';
import two from '../assets/image 42.svg'; 
import write from '../assets/Your notes are comprehensiv 1.svg'; 
import u from '../Styles/understand.module.css'; 
import png from '../assets/image 41.png'; 
import n from '../assets/Notes.svg'; 
import lg from '../assets/Large_Group.png'; 
import group from '../assets/Group 633184.svg';




function Understand() {
  // Debug: Log the CSS module classes
  console.log('CSS Module classes:', u);
  console.log('mainContainer class:', u.mainContainer);
  
  return (
    <section className={u.mainContainer} style={{backgroundColor: 'white'}}>
    <div className={u.subContainer}>


    <header className={u.headerImageContainer}>

    <Image className={u.mainImage}  src={n} width={5000} height={500} alt='notes' /> 

    </header>
    
    <div className={u.mainHeaderContainer}>
        <h1 className={u.mainTextHeader}>

        Understand how Dyslexia feels 


        </h1>
    </div>

    <div>

    <article className={u.mainSupportingTextContainer}>


    This unique free screener will help you pinpoint how dyslexia unexpectedly affects your life. 
    </article>

    <div className={u.pagination} >

      


    </div>

    <div className={u.ctaContainer}>


    <div className={u.cta}>

      Next 


    </div>


    </div>


    </div>

    </div>


    </section>
  )
}

export default Understand