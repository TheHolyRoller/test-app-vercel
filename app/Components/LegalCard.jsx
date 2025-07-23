'use client';

import { useQuiz } from '../lib/context/QuizContext';
import { useUser } from '../lib/context/UserContext';
import { useRouter } from 'next/navigation';
import QuizCard from '../Components/QuizCard';
import {PermissionAnswer} from '../Components/PermissionAnswer'; 
// import uc from '../Styles/emailPermission.module.css'; 
// import uc from '../Styles/UnderstandCard.module.css'; 
// import id from '../Styles/IdealCard.module.css'; 
// import ad from '../Styles/AdultCard.module.css'; 
import fc from '../Styles/FunctionCard.module.css'; 


import { nunito } from '../fonts/nunito';
import Image from 'next/image';
import ivvi_group from '../assets/ivvi_group.svg'; 
// import all from '../assets/All in one resource.svg'; 
import learn from '../assets/Listen and learn, confident.svg'; 
import say from '../assets/Say goodbye to the time.svg'; 
import real from '../assets/Real time NotetakinListen and learn, confident.svg'; 
import study from '../assets/Study anywhere.svg'; 
import your from '../assets/Your notes are comprehensiv.svg'; 
import multi from '../assets/Multi Style Learning.svg'; 
import listen from '../assets/Listen and learn, confident.svg'; 
import high from '../assets/Highlight Key Info.svg'; 
import all from '../assets/All in one resource.svg';
import group from '../assets/Multi Style Learning.svg'; 
import legal from '../assets/Your notes are comprehensiv.svg'; 
import lc from '../Styles/LegalCard.module.css'; 



export default function EmailPermission() {
    const router = useRouter();
    const { finalScore } = useQuiz();
    const { name, sound } = useUser();

    const handleYesClick = () => {
        router.push('/audiopermission');

    };


    const handleNoClick = () => {
        // Set flag to trigger refresh when landing on home page
        sessionStoraglc.setItem('needsRefreshFromEmailDecline', 'true');
        router.push('/');
    };

    const Section = "Audio Permission";
    const audio_url = '';
    const question_text = `t`;
    const currentQuestion = { question_text: "" };
    const currentIMG = 'https://frlc.cloud.appwritlc.io/v1/storage/buckets/dood_gifs/files/EMAIL_SEND_TEST/view?project=test-domain&mode=admin';
    
    // Placeholder functions
    const getLabelColorBySection = (section) => "#033699";

    return (

        <>

        <div className={lc.cardMainContainer} >
        {/* Top Blue Navbar Strip */}
        <div 
        className={lc.cardSubContainer}/>
        

        {/* Main Content Container */}
        <div className={lc.mainContentContainer}>
          <article 
          className={`${lc.card} ${nunito.className}`} 
          id={lc.firstCARD}>
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
  
  
                  <span style={{color:'rgb(40, 84, 168)', fontWeight: 'bolder', fontSize: '1.7rem' }}>
                      The Legals
                  </span>
              </h2>
          </div>
      )}

      {/* Add in the supporting text section here  */}
      <div className={lc.supportingTextSectionContainer}>


        <div className={lc.supportingText} style={{fontWeight: 'lighter', fontSize: '0.7rem', outline: '0px solid lime'}}>

        <article className={lc.mainSupportingTextContainer}  style={{fontWeight: 'lighter', fontSize: '1.2rem', outline: '0px solid lime'}}>

<span className={lc.mainTextSpan}>

This is a screener, not a formal assessment of Dyslexia.
</span>

<span className={lc.legalSpan}>
By Clicking ‘next’ you agree to our <a className={lc.termsSpan}>
terms</a>
&nbsp; and &nbsp;
<span className={lc.conditionsSpan}>

conditions
</span> 
.   
</span>


</article>

        </div>

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


  
      <article className={lc.card} id={lc.cardOne}></article>
      <article className={lc.card} id={lc.cardTwo}></article>
      <article className={lc.card} id={lc.cardThree}></article>
      <article className={lc.card} id={lc.cardFour}></article>
  </article>


<section className={lc.buttonSectionContainer}>

  <div className={lc.ctaContainer}>

    <div className={lc.cta} onClick={handleYesClick} style={{cursor: 'pointer', fontSize: '2rem', letterSpacing: '1px'}} >
        Next

    </div>



  </div>
  
</section>
        </div>
      </div>


      </>

    );
} 