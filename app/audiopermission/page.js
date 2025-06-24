'use client'
import React from 'react'
import Image from 'next/image'; 
// import a from '../Styles/sound.module.css';
import a from '../Styles/Quiz.module.css'; 

import { nunito } from '../fonts/nunito';
import { usePathname } from 'next/navigation'; 
import AudioButtons from '../Components/AudioButtons'; 





function Page() {
  
  // Default values for missing variables
  const Section = "Audio Permission";
  const audio_URL = null;
  const questionText = "Shall i read out the questions for you?";
  const currentQuestion = { questionText: "" };
  const currentIMG = 'https://fra.cloud.appwrite.io/v1/storage/buckets/dood_gifs/files/Turn_On_Audio/view?project=test-domain&mode=admin';
  
  // Placeholder functions
  const getLabelColorBySection = (section) => "#033699";
  
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
        zIndex: 1
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
        {audio_URL && (
            <audio 
                key={audio_URL} 
                controls 
                autoPlay 
                style={{ opacity: '0', position: 'absolute' }}
                onPlay={() => console.log('🎵 Audio Started Playing:', audio_URL)}
                onError={(e) => console.error('❌ Audio Error:', e)}
            >
                <source src={audio_URL} type="audio/mp3" />
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

    {questionText && (
        <div className={`${a.questionTextContainer} ${nunito.className}`} >
            <h2 className={`${a.questionText} ${nunito.className}`}>
                {questionText}


                <span>
                    {currentQuestion?.questionText}
                </span>
            </h2>
        </div>
    )}
    
    <div className={a.imageSectionContainer}>
        <div className={a.doodleContainer}>
            {currentIMG && (
                <Image 
                    className={a.gifImage}
                    src={currentIMG}
                    alt='quiz illustration'
                    width={300}
                    height={300}
                    unoptimized
                    onLoad={() => console.log('🖼️ Image Loaded:', currentIMG)}
                    onError={(e) => console.error('❌ Image Error:', e)}
                    style={{
                        marginTop: '-4.5rem',
                        objectFit: 'contain', 
                        zIndex: '0'
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