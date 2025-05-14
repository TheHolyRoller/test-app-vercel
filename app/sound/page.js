'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '../lib/context/UserContext';
import q from '../Styles/Quiz.module.css'; 

import QuizCard from '../Components/QuizCard';
import {QuizAnswer} from '../Components/QuizAnswer'; 



export default function SoundPage() {
    const router = useRouter();
    const { setUserSound } = useUser();

    const handleSoundChoice = (soundEnabled) => {
        setUserSound(soundEnabled);
        router.push('/type');
    };

    return (
        <section style={{color: 'white'}}>
            <main className={q.quizComponentContainer} id='quizElement'>
            <QuizCard 
                        questionText="Hi I'm 'Dood'. I'll quiz you on the signs of dyslexia. Can I turn on the audio so I can speak to you?"
                        Section="Details"
                        currentQuestion={{
                            questionText: ""
                        }}
                        audio_URL='https://dyslexiaquizapp.s3.eu-west-2.amazonaws.com/audio+doodles/intro+dood-v1.mp3'
                        currentIMG='/'
                    />

                {/* <section className={q.answerSectionContainer}>
                    <aside className={q.buttonsContainer} style={{outline: '0px solid lime', display: 'flex', placeContent: 'center', width: '90%'}}>
                        <div className={q.noButtonContainer}>
                            <button 
                                className={q.yesButton} 
                                style={{marginRight: '1rem'}}
                                onClick={() => handleSoundChoice(true)}
                            >
                                Audio On
                            </button>
                        </div>

                        <div className={q.sometimesButtonContainer}>
                            <button 
                                className={q.noButton}
                                onClick={() => handleSoundChoice(false)}
                            >
                                Audio Off
                            </button>
                        </div>
                    </aside>
                </section> */}

                <div style={{outline: '3px solid red'}} >

                <QuizAnswer/>
                </div>

            </main>
        </section>
    );
} 