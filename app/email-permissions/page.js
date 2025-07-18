'use client';

import { useQuiz } from '../lib/context/QuizContext';
import { useUser } from '../lib/context/UserContext';
import { useRouter } from 'next/navigation';
import QuizCard from '../Components/QuizCard';
import {PermissionAnswer} from '../Components/PermissionAnswer'; 
import e from '../Styles/emailPermission.module.css'; 
import { nunito } from '../fonts/nunito';
import Image from 'next/image';


export default function EmailPermission() {
    const router = useRouter();
    const { finalScore } = useQuiz();
    const { name, sound } = useUser();

    const handleYesClick = () => {
        router.push('/name');
    };


    const handleNoClick = () => {
        // Set flag to trigger refresh when landing on home page
        sessionStorage.setItem('needsRefreshFromEmailDecline', 'true');
        router.push('/');
    };

    const Section = "Audio Permission";
    const audio_url = '';
    const question_text = `Shall We send a results Report to your email?
Otherwise they won’t be saved.`;
    const currentQuestion = { question_text: "" };
    const currentIMG = 'https://fra.cloud.appwrite.io/v1/storage/buckets/dood_gifs/files/EMAIL_SEND_TEST/view?project=test-domain&mode=admin';
    
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
          className={`${e.card} ${nunito.className}`} 
          id={e.firstCARD} 
          style={{
              position: 'relative',
              zIndex: 200,
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.06)',
              marginTop: '-40px', 
          }}
          >
      <div 
          className={e.cardCategoryColorContainer} 
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
                  onPlay={() => console.log('🎵 Audio Started Playing:', audio_url)}
                  onError={(e) => console.error('❌ Audio Error:', e)}
              >
                  <source src={audio_url} type="audio/mp3" />
              </audio>
          )}
          
  
          <div className={`${e.categoryLabelContainer} ${nunito.className}`}>
              <label className={`${e.categoryLabel} ${nunito.className}`}>
  
  
                  <div className={`${e.labelContainer} ${nunito.className}`} style={{backgroundColor: getLabelColorBySection(Section)}}>
                  ready
                  </div>
              </label>
          </div>
      </div>
  
      {question_text && (
          <div className={`${e.question_textContainer} ${nunito.className}`} style={{color:'#333333' }} >
              <h2 className={`${e.question_text} ${nunito.className}`} style={{color:'#333333' }}>
                  {question_text}
  
  
                  <span style={{color:'#333333' }}>
                      {currentQuestion?.question_text}
                  </span>
              </h2>
          </div>
      )}
      
      <div className={e.imageSectionContainer}>
          <div className={e.doodleContainer}>
              {currentIMG && (
                  <Image 
                      src={currentIMG}
                      className={e.currentIMG}
                      alt='quiz illustration'
                      width={300}
                      height={300}
                      unoptimized
                      onLoad={() => console.log('🖼️ Image Loaded:', currentIMG)}
                      onError={(e) => console.error('❌ Image Error:', e)}
                      style={{
                          marginTop: '-4.5rem',
                          objectFit: 'contain', 
                          zIndex: '0', 
                      }}
                  />
              )}
          </div>
      </div>
  
      <article className={e.card} id={e.cardOne}></article>
      <article className={e.card} id={e.cardTwo}></article>
      <article className={e.card} id={e.cardThree}></article>
      <article className={e.card} id={e.cardFour}></article>
  </article>


<section className={e.buttonSectionContainer}>

  <div className={e.ctaContainer}>

    <div className={e.cta} onClick={handleYesClick} style={{cursor: 'pointer', fontSize: '2rem', letterSpacing: '1px'}} >
        Yes
    </div>


  </div>

  <div className={e.noButtonContainer}>
    <div className={e.noButton} onClick={handleNoClick} >
       No Thanks 
    
     </div>


  </div>
  
</section>
        </div>
      </div>
    );
} 