'use client';

import { useRouter } from 'next/navigation';
import q from '../../Styles/Quiz.module.css';
import { useUser } from '../lib/context/UserContext';

export default function SoundPage() {
    const router = useRouter();
    const { setUserSound } = useUser();

    const handleSoundChoice = (soundEnabled) => {
        setUserSound(soundEnabled);
        router.push('/quiz/type');
    };

    return (
        <section style={{color: 'white'}}>
            <main className={q.quizComponentContainer} id='quizElement'>
                <section className={q.cardContainer}>
                    <article className={q.card}>
                        <div className={q.cardCategoryColorContainer}>
                            <div className={q.categoryLabelContainer}>
                                <label className={q.categoryLabel}>Writing</label>
                            </div>
                        </div>

                        <div className={q.questionTextContainer}>
                            <h2 className={q.questionText}>
                                <span>
                                    Hi! I&apos;m &apos;Dood&apos;. I&apos;ll Quiz You On The Signs Of Dyslexia. Can I Turn On the Audio So I Can Speak To You?
                                </span>
                            </h2>
                        </div>
                        
                        <div className={q.doodleContainer}>
                            {/* Add doodle image here if needed */}
                        </div>
                    </article>
                </section>

                <section className={q.answerSectionContainer}>
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
                </section>
            </main>
        </section>
    );
} 