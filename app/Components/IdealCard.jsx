'use client';

import { useQuiz } from '../lib/context/QuizContext';
import { useUser } from '../lib/context/UserContext';
import { useRouter } from 'next/navigation';
import QuizCard from '../Components/QuizCard';
import {PermissionAnswer} from '../Components/PermissionAnswer'; 
// import uc from '../Styles/emailPermission.module.css'; 
// import uc from '../Styles/UnderstandCard.module.css'; 
import id from '../Styles/IdealCard.module.css'; 

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



export default function EmailPermission() {
    const router = useRouter();
    const { finalScore } = useQuiz();
    const { name, sound } = useUser();

    const handleYesClick = () => {
        router.push('/adult');
    };


    const handleNoClick = () => {
        // Set flag to trigger refresh when landing on home page
        sessionStoragid.setItem('needsRefreshFromEmailDecline', 'true');
        router.push('/');
    };

    const Section = "Audio Permission";
    const audio_url = '';
    const question_text = `t`;
    const currentQuestion = { question_text: "" };
    const currentIMG = 'https://fra.cloud.appwritid.io/v1/storage/buckets/dood_gifs/files/EMAIL_SEND_TEST/view?project=test-domain&mode=admin';
    
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
          className={`${id.card} ${nunito.className}`} 
          id={id.firstCARD} 
          style={{
              position: 'relative',
              zIndex: 200,
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.06)',
              marginTop: '-40px', 

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

                  <span style={{color:'rgb(40, 84, 168)', fontWeight: 'bolder'}}>
                      Ideal for University and the Workplace 
                  </span>
              </h2>
          </div>
          
      )}




     <div className={id.supportingTextSectionContainer}>
        <p  className={id.supportingText} style={{fontWeight: 'lighter'}}>
        {/* This unique free screener will help you pinpoint how dyslexia unexpectedly affects your life.  */}
        Helps students and professionals understand when dyslexia gets in the way.

        </p>

      </div>

      <div className={id.paginationElementContainer}
      
      style={{ margin: '0 auto'}}

      >
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


<section className={id.buttonSectionContainer}>

  <div className={id.ctaContainer}>

    <div className={id.cta} onClick={handleYesClick} style={{cursor: 'pointer', fontSize: '2rem', letterSpacing: '1px'}} >
        Next

    </div>



  </div>
  
</section>
        </div>
      </div>
    );
} 