import React from 'react'
import Image from 'next/image'
import f from '../Styles/function.module.css'; 
import group from '../assets/Multi Style Learning.svg'; 
import { useRouter } from 'next/navigation';


function Functional(){ 


  const router = useRouter(); 
  



  return (
    <section className={f.mainContainer} style={{backgroundColor: 'white'}}>
    <div className={f.subContainer}>



    <header className={f.headerImageContainer}>
    <Image className={f.mainImage}  src={group} width={5000} height={5000} alt='notes' /> 
    </header>
    

    <div className={f.mainHeaderContainer}>
        <h1 className={f.mainTextHeader}>

        Ideal for University and the Workplace 

        </h1>
    </div>

    <div>

    <article className={f.mainSupportingTextContainer}>


    Helps students and professionals understand when dyslexia gets in the way.    </article>

    <div className={f.pagination} >


        </div>

    <div className={f.ctaContainer}>


    <div className={f.cta}>

      Next 


    </div>


    </div>


    </div>

    </div>


    </section>
  )
}

export default page