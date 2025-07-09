'use client'
import React from 'react'

import a from '../Styles/adult.module.css'; 
import Image from 'next/image';
// import affect from '../assets/Listen and learn, confident.svg'; 
import affect from '../assets/Highlight Key Info.svg'; 
import { useRouter } from 'next/navigation';



function Adult() {



  const router = useRouter();
  
  const handleNext = () => {
    router.push('/function');
  };



  return (
    <section className={a.mainContainer} style={{backgroundColor: 'white'}}>
    <div className={a.subContainer}>


    <header className={a.headerImageContainer}>
    <Image className={a.mainImage}  src={affect} width={5000} height={5000} alt='notes' /> 
    </header>
    

    <div className={a.mainHeaderContainer}>
        <h1 className={a.mainTextHeader}>

        Adult Dyslexia Can Affect:
        </h1>
    </div>

    <div>

    
    <article className={a.mainSupportingTextContainer}>

        <ul className={a.affectsList}> 
        <li className={a.affectsListItem}>

            Reading 


        </li>
        <li className={a.affectsListItem}>

                Writing  


            </li> 
            <li className={a.affectsListItem}>

                Memory  

                </li> 

<li className={a.affectsListItem}>

                Tests 


            </li>
         <li className={a.affectsListItem}>

               Planning  


            </li>


        </ul>


       </article>


    <div className={a.ctaContainer}>


  <div className={a.cta} onClick={handleNext}
  
  style={{cursor: 'pointer', fontSize: '2rem', letterSpacing: '1px'}}
  >

      Next 


    </div>

    
    <div className={a.paginationElementContainer}
      
      style={{ margin: '0 auto'}}

      >
      <div className={a.paginationElementSubContainer}>

        <ul className={a.paginationList}

          style={{display: 'flex', gap: '0.8em'}}
        
        >

          <li className={a.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
        <li className={a.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
             <li className={a.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(153, 187, 154)', borderRadius: '14px', display: 'block'}}
          
          ></li>
             <li className={a.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
            <li className={a.paginationItem} 
          
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

export default Adult