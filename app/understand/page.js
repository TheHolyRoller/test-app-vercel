'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ivvi_group from '../assets/ivvi_group.svg'; 
import u from '../Styles/understand.module.css'; 
import UnderstandCard from '../Components/UnderstandCard'; 


function Understand() {
  const router = useRouter();
  
  // Debug: Log the CSS module classes
  console.log('CSS Module classes:', u);
  console.log('mainContainer class:', u.mainContainer);
  
  const handleNext = () => {
    router.push('/ideal');
  };
  

  return (
    
    <>

    <UnderstandCard/>

    {/* <section className={u.mainContainer} style={{backgroundColor: 'white'}}>


    <div className={u.subContainer}>


    <header className={u.headerImageContainer}>

    <Image className={u.mainImage}  src={ivvi_group} width={4000} height={4000} alt='notes' /> 
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


    <div className={u.cta} onClick={handleNext}
    style={{fontSize: '2rem', cursor: 'pointer', letterSpacing: '1px'}}>

      Next 

    </div>


    </div>

    


    </div>
    </div>
    
    
   
    </section> */}


    
    </>
  )
}

export default Understand