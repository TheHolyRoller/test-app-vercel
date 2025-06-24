'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
import { useUser } from '../lib/context/UserContext';
import ab from '../Styles/audioButtons.module.css';
import { nunito } from '../fonts/nunito';
import { chewy } from '../fonts/chewy';



function AudioButtons() {
    const router = useRouter();
    const { setUserSound } = useUser();

    const handleSoundChoice = (soundEnabled) => {
        setUserSound(soundEnabled);
        router.push('/quiz');
    };
    

  return (
    <section className={`${ab.mainAnswerContainer} ${nunito.className}`}>
        <article className={`${ab.answerSection} ${nunito.className}`}>
            <div className={`${ab.buttonList} ${nunito.className}`}>

                <div className={ab.buttonStackContainer} 
                  onClick={() => handleSoundChoice(false)}
                  onMouseEnter={() => console.log('🖱️ Hovering Audio Off Button')}
                >
                    <div className={`${ab.button} ${chewy.className}`} id={ab.noButton}>
                        
                        NO 

                    </div>
                    <div className={ab.buttonStack} id={ab.noStackOne}></div>
                    <div className={ab.buttonStack} id={ab.noStackTwo}></div>
                    <div className={ab.buttonStack} id={ab.noStackThree}></div>
                    <div className={ab.buttonStack} id={ab.noStackFour}></div>
                    <div className={ab.buttonStack} id={ab.noStackFive}></div>
                    <div className={ab.buttonStack} id={ab.noStackSix}></div>
                </div>

                <div className={ab.buttonStackContainer}   
                onClick={() => handleSoundChoice(true)}
                onMouseEnter={() => console.log('🖱️ Hovering Audio On Button')}>
                    <div className={`${ab.button} ${chewy.className}`} id={ab.yesButton}>
                        Yes 
                    </div>
                    <div className={ab.buttonStack} id={ab.yesStackOne}></div>
                    <div className={ab.buttonStack} id={ab.yesStackTwo}></div>
                    <div className={ab.buttonStack} id={ab.yesStackThree}></div>
                    <div className={ab.buttonStack} id={ab.yesStackFour}></div>
                    <div className={ab.buttonStack} id={ab.yesStackFive}></div>
                    <div className={ab.buttonStack} id={ab.yesStackSix}></div>
                    <div className={ab.buttonStack} id={ab.yesStackSeven}></div>
                </div>
            </div>
        </article>
    </section>
  )
}

export default AudioButtons