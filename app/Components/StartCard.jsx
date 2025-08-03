'use client';

import { useQuiz } from '../lib/context/QuizContext';
import { useUser } from '../lib/context/UserContext';
import { useRouter } from 'next/navigation';
import QuizCard from '../Components/QuizCard';
import {PermissionAnswer} from '../Components/PermissionAnswer'; 
import st from '../Styles/startCard.module.css'; 
import { nunito } from '../fonts/nunito';
import Image from 'next/image';
import logo from '../assets/ivvi_Logo.svg'; 

export default function EmailPermission() {
    const router = useRouter();
    const { finalScore } = useQuiz();
    const { name, sound } = useUser();

    const handleYesClick = () => {
        router.push('/understand');
    };




    const handleNoClick = () => {
        // Set flag to trigger refresh when landing on home page
        sessionStoragst.setItem('needsRefreshFromEmailDecline', 'true');
        router.push('/');
    };

    const Section = "Audio Permission";
    const audio_url = 'https://dyslexiaquizapp.s3.eu-west-2.amazonaws.com/audio+doodles/send+email-v1.mp3';
    const question_text = `t`;
    const currentQuestion = { question_text: "" };
    const currentIMG = 'https://fra.cloud.appwritst.io/v1/storage/buckets/dood_gifs/files/EMAIL_SEND_TEST/view?project=test-domain&mode=admin';
    
    // Placeholder functions
    const getLabelColorBySection = (section) => "#033699";

    return (
        <div>
        {/* Top Blue Navbar Strip */}
        {/* <div 
          style={{
            width: '100%',
            height: '120px',
            backgroundColor: '#023597',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 100
          }}
        /> */}
        

        {/* Main Content Container */}
        <div style={{ paddingTop: '60px' }}>
          <article 
          className={`${st.card} ${nunito.className}`} 
          id={st.firstCARD} 
          style={{
              position: 'relative',
              zIndex: 200,
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.06)',
              marginTop: '-40px', 
          }}
          >
      {/* <div 
          className={st.cardCategoryColorContainer} 
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
                  onPlay={() => consolst.log('🎵 Audio Started Playing:', audio_url)}
                  onError={(e) => consolst.error('❌ Audio Error:', e)}
              >
                  <source src={audio_url} type="audio/mp3" />
              </audio>
          )}
          
  
          <div className={`${st.categoryLabelContainer} ${nunito.className}`}>
              <label className={`${st.categoryLabel} ${nunito.className}`}>
  
  
                  <div className={`${st.labelContainer} ${nunito.className}`} style={{backgroundColor: getLabelColorBySection(Section)}}>
                  ready
                  </div>
              </label>
          </div>
      </div> */}
      
  
      {question_text && (
          <div className={`${st.question_textContainer} ${nunito.className}`} style={{color: 'white'}} >
              <h2 className={`${st.question_text} ${nunito.className}`} style={{fontSize: '2rem', letterSpacing: '-1px'}} >

                <span className={st.topHeaderSpan} style={{display: 'block', fontSize: '1rem'}}>
                    The 
                </span>

                    Adult Dyslexia
                    Screener



              </h2>
          </div>
      )}
      
      {/* <div className={st.imageSectionContainer}>
          <div className={st.doodleContainer}>
              {currentIMG && (
                  <Image 
                      src={currentIMG}
                      className={st.currentIMG}
                      alt='quiz illustration'
                      width={300}
                      height={300}
                      unoptimized
                      onLoad={() => consolst.log('🖼️ Image Loaded:', currentIMG)}
                      onError={(e) => consolst.error('❌ Image Error:', e)}
                      style={{
                          marginTop: '-4.5rem',
                          objectFit: 'contain', 
                          zIndex: '0', 
                      }}
                  />
              )}
          </div>
      </div> */}


        {/* Add in the by ivvi section here  */}

        <footer className={st.ivviLogoContainer}>
                    <span className={st.bySpan}>by</span>
                    <figure className={st.logo}>
                        <Image src={logo} width={150} height={50} alt='logo' className={st.logoImage} />
                    </figure>
                </footer>




  
      <article className={st.card} id={st.cardOne}></article>
      <article className={st.card} id={st.cardTwo}></article>
      <article className={st.card} id={st.cardThree}></article>
      <article className={st.card} id={st.cardFour}></article>
  </article>


<section className={st.buttonSectionContainer}>

  <div className={st.ctaContainer}>

    <div className={st.cta} onClick={handleYesClick} style={{cursor: 'pointer', fontSize: '2rem', letterSpacing: '1px'}} >
        Start Screener 

    </div>


  </div>

  
</section>
        </div>
      </div>
    );
} 