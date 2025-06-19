import React from 'react'

import a from '../Styles/adult.module.css'; 
import Image from 'next/image';
// import affect from '../assets/Listen and learn, confident.svg'; 
import affect from '../assets/Highlight Key Info.svg'; 



function page() {
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

    <div className={a.pagination} >


        </div>

    <div className={a.ctaContainer}>


    <div className={a.cta}>

      Next 


    </div>


    </div>


    </div>

    </div>


    </section>
  )
}

export default page