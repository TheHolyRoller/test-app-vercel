'use client';

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import i from '../Styles/ideal.module.css'; 

// import n from '../assets/All in one resource.svg'; 

import learn from '../assets/Listen and learn, confident.svg'; 
import say from '../assets/Say goodbye to the time.svg'; 
import real from '../assets/Real time NotetakinListen and learn, confident.svg'; 
import study from '../assets/Study anywhere.svg'; 
import your from '../assets/Your notes are comprehensiv.svg'; 
import multi from '../assets/Multi Style Learning.svg'; 
import listen from '../assets/Listen and learn, confident.svg'; 
import high from '../assets/Highlight Key Info.svg'; 
import all from '../assets/All in one resource.svg'; 



function IdealPage() {
  const router = useRouter();
  
  const handleNext = () => {
    router.push('/adult');
  };

  return (

  <section className={i.mainContainer} style={{backgroundColor: 'white'}}>
    <div className={i.subContainer}>



    <header className={i.headerImageContainer}>
    <Image className={i.mainImage}  src={learn} width={5000} height={5000} alt='notes' /> 
    </header>
    


    <div className={i.mainHeaderContainer}>
        <h1 className={i.mainTextHeader}>

        Ideal for University and the Workplace 

        </h1>
    </div>

    <div>

    <article className={i.mainSupportingTextContainer}>


    Helps students and professionals understand when dyslexia gets in the way.  
    
    
    
    </article>

    <div className={i.pagination} >


        </div>

    <div className={i.ctaContainer}>


    <div className={i.cta} onClick={handleNext} style={{cursor: 'pointer', fontSize: '2rem', letterSpacing: '1px'}}>

      Next 


    </div>



    <div className={i.paginationElementContainer}
      
      style={{ margin: '0 auto'}}

      >
      <div className={i.paginationElementSubContainer}>

        <ul className={i.paginationList}

          style={{display: 'flex', gap: '0.8em'}}
        
        >

          <li className={i.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
        <li className={i.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(153, 187, 154)', borderRadius: '14px', display: 'block'}}
          
          ></li>
             <li className={i.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
             <li className={i.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
            <li className={i.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
        </ul> 
      </div>
      </div>





    </div>


    </div>

    </div>


    </section>
  )

}

export default IdealPage
