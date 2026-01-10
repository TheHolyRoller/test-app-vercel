'use client';

import { useRouter } from 'next/navigation';
import fc from '../Styles/FunctionCard.module.css'; 
import { nunito } from '../fonts/nunito';
import Image from 'next/image';
import group from '../assets/Multi Style Learning.svg'; 
import Link from 'next/link';


export default function EmailPermission() {
    const router = useRouter();

    const Section = "Audio Permission";
    const question_text = `t`;
    
    // Placeholder functions
    const getLabelColorBySection = (section) => "#033699";

    return (
        <div className={fc.mainContainer}>

          <article 
          className={`${fc.card} ${nunito.className}`} 
          id={fc.firstCARD} 
          style={{
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.06)',
              height: '500px', 
              position: 'relative', 
              
              

            
          }}
          >
      <div 
          className={fc.cardCategoryColorContainer} 
          style={{
              backgroundColor: '#4168b3',
              boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1), -2px 0 8px rgba(0, 0, 0, 0.1), 2px 0 8px rgba(0, 0, 0, 0.1)', 
  
          }}
      >

          <div className={`${fc.categoryLabelContainer} ${nunito.className}`}>
              <label className={`${fc.categoryLabel} ${nunito.className}`}>
  
  
                  <div className={`${fc.labelContainer} ${nunito.className}`} style={{backgroundColor: getLabelColorBySection(Section)}}>
                  Welcome
                  </div>
              </label>
          </div>
      </div>


      <header className={fc.headerImageContainer}>

            <Image className={fc.mainImage}  src={group} width={150} height={150} alt='notes' /> 
            </header>
  
      {question_text && (
          <div className={`${fc.question_textContainer} ${nunito.className}`} style={{color:'#333333' }} >
              <h2 className={`${fc.question_text} ${nunito.className}`} style={{color:'#333333' }}>
  
  
                  <span className={fc.functionSpan}  style={{color:'rgb(40, 84, 168)', fontWeight: 'bolder'}}>

                      How the Screener Works

                      
                  </span>
              </h2>
          </div>
      )}


      <div className={fc.supportingTextSectionContainer}>


        <div className={fc.supportingText} style={{fontWeight: 'lighter'}}>

        <article className={fc.mainSupportingTextContainer}  style={{fontWeight: 'lighter'}}>

       <span className={fc.supportingTextSpan} style={{display: 'block'}}>

       You can see and hear the questions.
       </span> 
        At the end you will be given a score and sent your results.
            
            </article>

        </div>


      
      <div className={fc.paginationElementContainer}
      
      style={{ margin: '0 auto'}}

      >
      <div className={fc.paginationElementSubContainer}>

        <ul className={fc.paginationList}

          style={{display: 'flex', gap: '0.8em'}}
        
        >

          <li className={fc.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
        <li className={fc.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
             <li className={fc.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
             <li className={fc.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(153, 187, 154)', borderRadius: '14px', display: 'block'}}
          
          ></li>
          
            <li className={fc.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
        </ul>
      </div>
      </div>





      </div>



  
      <article className={fc.card} id={fc.cardOne}></article>
      <article className={fc.card} id={fc.cardTwo}></article>
      <article className={fc.card} id={fc.cardThree}></article>
      <article className={fc.card} id={fc.cardFour}  ></article>
  </article>

  <Link   

href='/legal' prefetch

>


<section className={fc.buttonSectionContainer} style={{cursor: 'pointer'}}>

  <div className={fc.ctaContainer} style={{cursor: 'pointer'}} >

    <div className={fc.cta}  style={{cursor: 'pointer', fontSize: '2rem', letterSpacing: '1px'}} >
        Next

    </div>

  </div>
  
</section>
  </Link>
      </div>
    );
} 