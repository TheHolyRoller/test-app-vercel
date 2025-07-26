'use client';

import { useQuiz } from '../lib/context/QuizContext';
import { useUser } from '../lib/context/UserContext';
import { useRouter } from 'next/navigation';
import QuizCard from '../Components/QuizCard';
import {PermissionAnswer} from '../Components/PermissionAnswer'; 
// import uc from '../Styles/emailPermission.module.css'; 
import uc from '../Styles/UnderstandCard.module.css'; 
import { nunito } from '../fonts/nunito';
import Image from 'next/image';
import ivvi_group from '../assets/ivvi_group.svg'; 



export default function EmailPermission() {
    const router = useRouter();
    const { finalScore } = useQuiz();
    const { name, sound } = useUser();

    const handleYesClick = () => {
        router.push('/ideal');
    };


    const handleNoClick = () => {
        // Set flag to trigger refresh when landing on home page
        sessionStoraguc.setItem('needsRefreshFromEmailDecline', 'true');
        router.push('/');
    };

    const Section = "Audio Permission";
    const audio_url = '';
    const question_text = `t`;
    const currentQuestion = { question_text: "" };
    const currentIMG = 'https://fra.cloud.appwrituc.io/v1/storage/buckets/dood_gifs/files/EMAIL_SEND_TEST/view?project=test-domain&mode=admin';
    
    // Placeholder functions
    const getLabelColorBySection = (section) => "#033699";

    return (
        <div className={uc.mainContainer}
        
        style={{outline: '0px solid red', position: 'relative'}}
        >
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
        <div style={{ paddingTop: '60px', backgroundColor: 'green', position: 'relative' }}>
          <article 
          className={`${uc.card} ${nunito.className}`} 
          id={uc.firstCARD} 
          style={{
              position: 'relative',
              zIndex: 200,
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.06)',

          }}
          >
      <div 
          className={uc.cardCategoryColorContainer} 
          style={{
              backgroundColor: '#4168b3',
              boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1), -2px 0 8px rgba(0, 0, 0, 0.1), 2px 0 8px rgba(0, 0, 0, 0.1)', 
  
          }}
      >
          {audio_url && (
              <audio 
                  key={audio_url} 
                  controls 
                  autoPlay 
                  style={{ opacity: '0', position: 'absolute' }}
                  onPlay={() => consoluc.log('🎵 Audio Started Playing:', audio_url)}
                  onError={(e) => consoluc.error('❌ Audio Error:', e)}
              >
                  <source src={audio_url} type="audio/mp3" />
              </audio>
          )}
          
  
          <div className={`${uc.categoryLabelContainer} ${nunito.className}`}>
              <label className={`${uc.categoryLabel} ${nunito.className}`}>
  
  
                  <div className={`${uc.labelContainer} ${nunito.className}`} style={{backgroundColor: getLabelColorBySection(Section)}}>
                  Welcome
                  </div>
              </label>
          </div>
      </div>


      <header className={uc.headerImageContainer}>

            <Image className={uc.mainImage}  src={ivvi_group} width={170} height={170} alt='notes' /> 
            </header>




  
      {question_text && (
          <div className={`${uc.question_textContainer} ${nunito.className}`} style={{color:'#333333' }} >
              <h2 className={`${uc.question_text} ${nunito.className}`} style={{color:'#333333' }}>
                  {/* {question_text} */}
  
  
                  <span className={uc.understandSpan} style={{color:'rgb(40, 84, 168)',}}>
                      {/* {currentQuestion?.question_text} */}
                      Understand how Dyslexia feels 
                  </span>
              </h2>
          </div>
      )}

      {/* Add in the supporting text section here  */}
      <div className={uc.supportingTextSectionContainer}>


        <p  className={uc.supportingText} style={{fontWeight: 'lighter'}}>
        This unique free screener will help you pinpoint how dyslexia unexpectedly affects your life. 

        </p>

      </div>

      <div className={uc.paginationElementContainer}
      
      style={{ margin: '0 auto'}}

      >
      <div className={uc.paginationElementSubContainer}>

        <ul className={uc.paginationList}

          style={{display: 'flex', gap: '0.8em'}}
        
        >

          <li className={uc.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(153, 187, 154)', borderRadius: '14px', display: 'block'}}
          
          ></li>
        <li className={uc.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
             <li className={uc.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
             <li className={uc.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
            <li className={uc.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
        </ul>
      </div>
      </div>


  
      <article className={uc.card} id={uc.cardOne}></article>
      <article className={uc.card} id={uc.cardTwo}></article>
      <article className={uc.card} id={uc.cardThree}></article>
      <article className={uc.card} id={uc.cardFour}></article>
  </article>


<section className={uc.buttonSectionContainer}>

  <div className={uc.ctaContainer}>

    <div className={uc.cta} onClick={handleYesClick} style={{cursor: 'pointer', fontSize: '2rem', letterSpacing: '1px'}} >
        Next

    </div>


  </div>
  
</section>
        </div>
      </div>
    );
} 