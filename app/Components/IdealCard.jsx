'use client';

import { useQuiz } from '../lib/context/QuizContext';
import { useUser } from '../lib/context/UserContext';
import { useRouter } from 'next/navigation';
import id from '../Styles/IdealCard.module.css'; 

import { nunito } from '../fonts/nunito';
import Image from 'next/image';
import learn from '../assets/Listen and learn, confident.svg'; 


import Link from 'next/link';


export default function EmailPermission() {

    const Section = "Audio Permission";
    const question_text = `t`;

    


    // Placeholder functions
    const getLabelColorBySection = (section) => "#033699";

    return (
        <div className={id.mainContainer} >
        {/* Top Blue Navbar Strip */}


          <article 
          className={`${id.card} ${nunito.className}`} 
          id={id.firstCARD} 
          style={{
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.06)',
              height: '500px ', 
              position: 'relative'

          }}
          >
      <div 
          className={id.cardCategoryColorContainer} 
          style={{
              backgroundColor: '#4168b3',
              boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1), -2px 0 8px rgba(0, 0, 0, 0.1), 2px 0 8px rgba(0, 0, 0, 0.1)', 
  
          }}
      >
  
          <div className={`${id.categoryLabelContainer} ${nunito.className}`}>
              <label className={`${id.categoryLabel} ${nunito.className}`}>
  
  
                  <div className={`${id.labelContainer} ${nunito.className}`} style={{backgroundColor: getLabelColorBySection(Section)}}>
                  Welcome
                  </div>
              </label>
          </div>
      </div>


      <header className={id.headerImageContainer}>

            <Image className={id.mainImage}  src={learn} width={170} height={170} alt='notes' /> 
            </header>
  
      {question_text && (
          <div className={`${id.question_textContainer} ${nunito.className}`} style={{color:'#333333' }} >
              <h2 className={`${id.question_text} ${nunito.className}`} style={{color:'#333333' }}>
  
                  <span className={id.idealSpan}  style={{color:'rgb(40, 84, 168)', fontWeight: 'bolder'}}>
                      Ideal for University and the Workplace 
                  </span>
              </h2>
          </div>
      )}


      <div className={id.supportingTextSectionContainer}>

        <p  className={id.supportingText} style={{fontWeight: 'lighter', }}>
          Helps students and professionals understand when dyslexia gets in the way.

        </p>

      </div>

      

      <div className={id.paginationElementContainer} style={{ margin: '0 auto', position: 'absolute', bottom: '1.2rem'}}>
      <div className={id.paginationElementSubContainer}>

        <ul className={id.paginationList}

          style={{display: 'flex', gap: '0.8em'}}
        
        >

          <li className={id.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
        <li className={id.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(153, 187, 154)', borderRadius: '14px', display: 'block'}}
          
          ></li>
             <li className={id.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
             <li className={id.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
            <li className={id.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
        </ul>
      </div>
      </div>


  
      <article className={id.card} id={id.cardOne}></article>
      <article className={id.card} id={id.cardTwo}></article>
      <article className={id.card} id={id.cardThree}></article>
      <article className={id.card} id={id.cardFour}></article>
  </article>

  <Link   

href='/adult' prefetch

>
  
<section className={id.buttonSectionContainer} style={{cursor: 'pointer',}} >

  <div className={id.ctaContainer} style={{cursor: 'pointer'}} >

    <div className={id.cta} style={{cursor: 'pointer', fontSize: '2rem', letterSpacing: '1px'}} >
        Next

    </div>


  </div>
  
</section>
  </Link>
      </div>
    );
} 