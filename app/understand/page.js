'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ivvi_group from '../assets/ivvi_group.svg'; 
import u from '../Styles/understand.module.css'; 



function Understand() {
  const router = useRouter();
  
  // Debug: Log the CSS module classes
  console.log('CSS Module classes:', u);
  console.log('mainContainer class:', u.mainContainer);
  
  const handleNext = () => {
    router.push('/ideal');
  };
  
  return (
    
    <section className={u.mainContainer} style={{backgroundColor: 'white', outline: '4px solid blue'}}>
    <div className={u.subContainer}>


    <header className={u.headerImageContainer} style={{outline: '5px solid red'}}>

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
    
    >

      Next 


    </div>

    {/* Add in pagination element here  */}

      <div className={u.paginationElementContainer}
      
      style={{ margin: '0 auto', outline: '4px solid red'}}

      >
      <div className={u.paginationElementSubContainer}>


        <ul className={u.paginationList}

          style={{display: 'flex', gap: '0.8em'}}
        
        >

          <li className={u.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(153, 187, 154)', borderRadius: '14px', display: 'block'}}
          
          ></li>
        <li className={u.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
             <li className={u.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
             <li className={u.paginationItem} 
          
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

export default Understand