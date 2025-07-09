'use client'
import React from 'react'
import Image from 'next/image'
import f from '../Styles/function.module.css'; 
import group from '../assets/Multi Style Learning.svg'; 
import { useRouter } from 'next/navigation';


function Functional(){ 
  
  const router = useRouter();
  
  const handleNext = () => {
    router.push('/legal');
  };


  return (
    <section className={f.mainContainer} style={{backgroundColor: 'white'}}>
    <div className={f.subContainer}>



    <header className={f.headerImageContainer}>
    <Image className={f.mainImage}  src={group} width={5000} height={5000} alt='notes' /> 
    </header>
    

    <div className={f.mainHeaderContainer}>
        <h1 className={f.mainTextHeader}>
        How the Screener Works

        </h1>
    </div>

    <div>

    <article className={f.mainSupportingTextContainer}>


    You can see and hear the questions.
    At the end you will be given a score and sent your results.    </article>

    <div className={f.pagination} >


        </div>

    <div className={f.ctaContainer}>


    <div className={f.cta} onClick={handleNext} style={{cursor: 'pointer', fontSize: '2rem', letterSpacing: '1px'}} >

      Next 


    </div>

    <div className={f.paginationElementContainer}
      
      style={{ margin: '0 auto'}}

      >
      <div className={f.paginationElementSubContainer}>

        <ul className={f.paginationList}

          style={{display: 'flex', gap: '0.8em'}}
        
        >

          <li className={f.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
        <li className={f.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
             <li className={f.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
             <li className={f.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(153, 187, 154)', borderRadius: '14px', display: 'block'}}
          
          ></li>
            <li className={f.paginationItem} 
          
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

export default Functional