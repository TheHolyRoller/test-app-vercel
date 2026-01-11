'use client';

import { useRouter } from 'next/navigation';
import ad from '../Styles/AdultCard.module.css'; 

import { nunito } from '../fonts/nunito';
import Image from 'next/image';
import high from '../assets/Highlight Key Info.svg'; 


export default function EmailPermission() {
    const router = useRouter();

    const handleYesClick = () => {
        router.push('/function');
    };

    const Section = "Audio Permission";
    const question_text = `t`;
    
    // Placeholder functions
    const getLabelColorBySection = (section) => "#033699";

    return (
        <div>

        {/* Main Content Container */}
        <div className={ad.mainContainer} >
          <article 
          className={`${ad.card} ${nunito.className}`} 
          id={ad.firstCARD} 
          style={{
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.06)',
              height:' 500px', 


          }}
          >
      <div 
          className={ad.cardCategoryColorContainer} 
          style={{
              backgroundColor: '#4168b3',
              boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1), -2px 0 8px rgba(0, 0, 0, 0.1), 2px 0 8px rgba(0, 0, 0, 0.1)', 
  
          }}
      >
          <div className={`${ad.categoryLabelContainer} ${nunito.className}`}>
              <label className={`${ad.categoryLabel} ${nunito.className}`}>
  
  
                  <div className={`${ad.labelContainer} ${nunito.className}`} style={{backgroundColor: getLabelColorBySection(Section)}}>
                  Welcome
                  </div>
              </label>
          </div>
      </div>


      <header className={ad.headerImageContainer}>

            <Image className={ad.mainImage}  src={high} width={150} height={150} alt='notes' /> 
            </header>

  
      {question_text && (
          <div className={`${ad.question_textContainer} ${nunito.className}`} style={{color:'#333333' }} >
              <h2 className={`${ad.question_text} ${nunito.className}`} style={{color:'#333333' }}>
  
  
                  <span className={ad.adultSpan} style={{color:'rgb(40, 84, 168)', fontWeight: 'bolder' }}>
                       Dyslexia Can Affect:
                  </span>
              </h2>
          </div>

      )}

      <div className={ad.supportingTextSectionContainer}>


        <div className={ad.supportingText} style={{fontWeight: 'lighter'}}>

        <article className={ad.mainSupportingTextContainer}>

<ul className={ad.affectsList}  > 
<li className={ad.affectsListItem}>

    Reading 


</li>
<li className={ad.affectsListItem}>

        Writing  


    </li> 
    <li className={ad.affectsListItem}>

        Memory  

        </li> 

<li className={ad.affectsListItem}>

        Tests 


    </li>
 <li className={ad.affectsListItem}>

       Planning  


    </li>


</ul>

<div className={ad.paginationElementContainer}
      
      style={{ margin: '0 auto'}}

      >
      <div className={ad.paginationElementSubContainer}>

        <ul className={ad.paginationList}

          style={{display: 'flex', gap: '0.8em'}}
        
        >

          <li className={ad.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
        <li className={ad.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
             <li className={ad.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(153, 187, 154)', borderRadius: '14px', display: 'block'}}
          
          ></li>
             <li className={ad.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
            <li className={ad.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
        </ul>
      </div>
      </div>


</article>







        </div>

      </div>

    
      <article className={ad.card} id={ad.cardOne}></article>
      <article className={ad.card} id={ad.cardTwo}></article>
      <article className={ad.card} id={ad.cardThree}></article>
      <article className={ad.card} id={ad.cardFour}></article>
  </article>


<section className={ad.buttonSectionContainer} style={{cursor: 'pointer'}} onClick={handleYesClick}>

  <div className={ad.ctaContainer} style={{cursor: 'pointer'}} onClick={handleYesClick}>

    <div className={ad.cta} onClick={handleYesClick} style={{cursor: 'pointer', fontSize: '2rem', letterSpacing: '1px'}} >
        Next

    </div>



  </div>
  
</section>
        </div>
      </div>
    );
} 