'use client';

import { useRouter } from 'next/navigation';


import { nunito } from '../fonts/nunito';
import Image from 'next/image';
import legal from '../assets/Your notes are comprehensiv.svg'; 
import lc from '../Styles/LegalCard.module.css'; 



import Link from 'next/link';

export default function EmailPermission() {
    const router = useRouter();

    const handleYesClick = () => {
        router.push('/audiopermission');

    };


    const handleNoClick = () => {
        // Set flag to trigger refresh when landing on home page
        sessionStoraglc.setItem('needsRefreshFromEmailDecline', 'true');
        router.push('/');
    };

    const Section = "Audio Permission";
    const question_text = `t`;
    
    // Placeholder functions
    const getLabelColorBySection = (section) => "#033699";

    return (

        <>

        <div className={lc.cardMainContainer} >

        {/* Main Content Container */}
        <div className={lc.cardSubContainer}>
          <article 
          className={`${lc.card} ${nunito.className}`} 
          id={lc.firstCARD} 
          style={{
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.06)',
              height: '500px'

          }}
          >
      <div 
          className={lc.cardCategoryColorContainer} 
          style={{
              backgroundColor: '#4168b3',
              boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1), -2px 0 8px rgba(0, 0, 0, 0.1), 2px 0 8px rgba(0, 0, 0, 0.1)', 
  
          }}
      >
      
          
  
          <div className={`${lc.categoryLabelContainer} ${nunito.className}`}>
              <label className={`${lc.categoryLabel} ${nunito.className}`}>
  
  
                  <div className={`${lc.labelContainer} ${nunito.className}`} style={{backgroundColor: getLabelColorBySection(Section)}}>
                  Welcome
                  </div>
              </label>
          </div>
      </div>


      <header className={lc.headerImageContainer}>

            <Image className={lc.mainImage}  src={legal} width={150} height={150} alt='notes' /> 
            </header>
  
      {question_text && (
          <div className={`${lc.question_textContainer} ${nunito.className}`} style={{color:'#333333' }} >
              <h2 className={`${lc.question_text} ${nunito.className}`} style={{color:'#333333' }}>
                  {/* {question_text} */}
  
  
                  <span className={lc.legalSpan} style={{color:'rgb(40, 84, 168)', fontWeight: 'bolder', fontSize: '1.7rem' }}>
                      The Legals
                  </span>

              </h2>
          </div>
      )}

      {/* Add in the supporting text section here  */}
      <div className={lc.supportingTextSectionContainer}>


        <div className={lc.supportingText} style={{fontWeight: 'lighter', fontSize: '0.7rem'}}>

        <article className={lc.mainSupportingTextContainer}  style={{fontWeight: 'lighter', fontSize: '1.2rem'}}>

<span className={lc.mainTextSpan}>

This is a screener, not a formal assessment of Dyslexia.
</span>

<span className={lc.legalSpan}>
By Clicking ‘next’ you agree to our 

<a className={lc.termsSpan} href='/Terms_of_Service' target='_blank' rel="noopener noreferer" >

terms of service </a>
{/* &nbsp;  &nbsp; */}
<span className={lc.conditionsSpan}>


</span>   

</span>


</article>

        </div>


         <div className={lc.paginationElementContainer}
      
      style={{ margin: '0 auto'}}

      >
      <div className={lc.paginationElementSubContainer}>

        <ul className={lc.paginationList}

          style={{display: 'flex', gap: '0.8em'}}
        
        >

          <li className={lc.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
        <li className={lc.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
             <li className={lc.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
             <li className={lc.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
            <li className={lc.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(153, 187, 154)', borderRadius: '14px', display: 'block'}}
          
          ></li>
        </ul>
      </div>
      </div>

      </div>

     


  
      <article className={lc.card} id={lc.cardOne}></article>
      <article className={lc.card} id={lc.cardTwo}></article>
      <article className={lc.card} id={lc.cardThree}></article>
      <article className={lc.card} id={lc.cardFour}></article>
  </article>

  <Link   

href='/audiopermission' prefetch

>

<section className={lc.buttonSectionContainer} style={{cursor: 'pointer'}}>

  <div className={lc.ctaContainer} style={{cursor: 'pointer'}} >

    <div className={lc.cta} style={{cursor: 'pointer', fontSize: '2rem', letterSpacing: '1px'}} >
        Next

    </div>

  </div>
  
</section>
</Link>
        </div>
      </div>


      </>

    );
} 