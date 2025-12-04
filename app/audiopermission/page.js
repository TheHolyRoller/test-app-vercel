'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'; 
// import a from '../Styles/sound.module.css';
import a from '../Styles/Quiz.module.css'; 

import { nunito } from '../fonts/nunito';
import { usePathname } from 'next/navigation'; 
import AudioButtons from '../Components/AudioButtons'; 
// import currentIMG from '../../public/v.mp4'; 

function Page() {
  
  // Default values for missing variables
  const Section = "Audio Permission";
  const audio_url = '';
  const question_text = "Hello. Welcome to our Dyslexia Screener. Shall I read out the questions for you? Press the audio button to switch audio on or off during the screener.";
  const currentQuestion = { question_text: "" };

  const currentIMG = 'https://fra.cloud.appwrite.io/v1/storage/buckets/onboarding_gifs/files/reading_test/view?project=67d4d9140008273c9d84&mode=admin'; 
  
  // Placeholder functions
  const getLabelColorBySection = (section) => "#033699";

  useEffect(() => {
    const scrollOnLaptop = () => {
      // Check if screen width is in laptop range (typically 1024px to 1440px)
      if (window.innerWidth >= 1024 && window.innerWidth <= 1440) {
        window.scrollTo({
          top: 100, // Scroll down 100px
          behavior: 'smooth'
        });
      }
    };

    // Small delay to ensure the page is fully loaded
    const timer = setTimeout(scrollOnLaptop, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (

    <>


   <section className={a.mainPageContainer}>

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
        zIndex: 1, 
        display: 'none'
        }}
      />
      
      {/* Main Content Container */}
      <div style={{ paddingTop: '60px' }}>
        <article 
        className={`${a.card} ${nunito.className}`} 
        id={a.audioFirstCard} 
        style={{
            position: 'relative',
            zIndex: 200,
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.06)',
            marginTop: '-40px', 
        }}
        >

    <div 
        className={a.cardCategoryColorContainer} 
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
        

        <div className={`${a.categoryLabelContainer} ${nunito.className}`}>
            <label className={`${a.categoryLabel} ${nunito.className}`}>


                <div className={`${a.labelContainer} ${nunito.className}`} style={{backgroundColor: getLabelColorBySection(Section)}}>

                ready
                </div>
            </label>
        </div>
    </div>

    {question_text && (
        <div className={`${a.question_textContainer} ${nunito.className}`} style={{outline: '0px solid red', marginTop: '-2.7rem', fontSize: '0.1rem'}} >
            <h2 className={`${a.question_text} ${nunito.className}`} style={{fontSize: '1rem'}} >
                {question_text}

                <span>
                    {currentQuestion?.question_text}
                </span>
            </h2>
        </div>
    )}
    
    <div className={a.imageSectionContainer} style={{outline: '0px solid red', top: '69%'}} >
        <div className={a.doodleContainer}>
            {currentIMG && (
                <Image 
                className={a.gifImage}
                    src={currentIMG}
                    alt='quiz illustration'
                    width={250}
                    height={250}
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

    <article className={a.card} id={a.cardOne}></article>
    <article className={a.card} id={a.cardTwo}></article>
    <article className={a.card} id={a.cardThree}></article>
    <article className={a.card} id={a.cardFour}></article>
</article>

        <div className={a.audioButtonSectionContainer}>
        <div className={a.audioButtonsSubContainer}>

        <AudioButtons/> 
        </div>
        </div>

      </div>
    </div>
   </section>


    </>

  )
}

export default Page