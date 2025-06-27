'use client'
import React from 'react'
import Image from 'next/image'
import l from '../Styles/legal.module.css'; 
import legal from '../assets/Your notes are comprehensiv.svg'; 

import { useRouter } from 'next/navigation';





function Legal() {



  const router = useRouter(); 


  // Add in the router function here 
  const handleNavigation = async () => {


    console.log('navigating to audio permission');
    
    try{

    await router.push('audiopermission'); 
    console.log('navigation successful'); 




    } 
    catch(error){


      console.error('navigation unsuccessful', error); 

    }





  }




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


    <div className={l.cta} onClick={handleNavigation} >

      Next 



    </div>


    <div className={l.paginationElementContainer}
      
      style={{ margin: '0 auto'}}

      >
      <div className={l.paginationElementSubContainer}>


        <ul className={l.paginationList}

          style={{display: 'flex', gap: '0.8em'}}
        
        >

          <li className={l.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
        <li className={l.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
             <li className={l.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
             <li className={l.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(153, 187, 154)', borderRadius: '14px', display: 'block'}}
          
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

export default Legal