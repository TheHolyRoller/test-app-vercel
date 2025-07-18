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



export default function EmailPermission() {
    const router = useRouter();
    const { finalScore } = useQuiz();
    const { name, sound } = useUser();

    const handleYesClick = () => {
        router.push('/legal');
    };


    const handleNoClick = () => {
        // Set flag to trigger refresh when landing on home page
        sessionStoragfc.setItem('needsRefreshFromEmailDecline', 'true');
        router.push('/');
    };

    const Section = "Audio Permission";
    const audio_URL = '';
    const question_text = `t`;
    const currentQuestion = { question_text: "" };
    const currentIMG = 'https://frfc.cloud.appwritfc.io/v1/storage/buckets/dood_gifs/files/EMAIL_SEND_TEST/view?project=test-domain&mode=admin';
    
    // Placeholder functions
    const getLabelColorBySection = (section) => "#033699";

    return (
        <div>
        {/* Top Blue Navbar Strip */}
        <div 
          style={{
            width: '100%',
            height: '120px',
            backgroundColor: '#023597',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 100
          }}
        />
        

        {/* Main Content Container */}
        <div style={{ paddingTop: '60px' }}>
          <article 
          className={`${fc.card} ${nunito.className}`} 
          id={fc.firstCARD} 
          style={{
              position: 'relative',
              zIndex: 200,
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.06)',
              marginTop: '-40px', 

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
                  {/* {question_text} */}
  
  
                  <span style={{color:'rgb(40, 84, 168)', fontWeight: 'bolder', fontSize: '1.7rem' }}>
                      {/* Adult Dyslexia Can Affect: */}
                      How the Screener Works
                  </span>
              </h2>
          </div>
      )}

      {/* Add in the supporting text section here  */}
      <div className={fc.supportingTextSectionContainer}>


        <div className={fc.supportingText} style={{fontWeight: 'lighter'}}>

        <article className={fc.mainSupportingTextContainer}  style={{fontWeight: 'lighter'}}>

       <span className={fc.questionTextSpan} style={{display: 'block'}}>

       You can see and hear the questions.
       </span> 
        At the end you will be given a score and sent your results.


            
            </article>

        </div>

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


  
      <article className={fc.card} id={fc.cardOne}></article>
      <article className={fc.card} id={fc.cardTwo}></article>
      <article className={fc.card} id={fc.cardThree}></article>
      <article className={fc.card} id={fc.cardFour}></article>
  </article>


<section className={fc.buttonSectionContainer}>

  <div className={fc.ctaContainer}>

    <div className={fc.cta} onClick={handleYesClick} style={{cursor: 'pointer', fontSize: '2rem', letterSpacing: '1px'}} >
        Next

    </div>



  </div>
  
</section>
        </div>
      </div>
    );
} 