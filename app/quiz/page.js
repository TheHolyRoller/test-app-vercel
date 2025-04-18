'use client';

import { useQuiz } from '../lib/context/QuizContext';
import { useUser } from '../lib/context/UserContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import q from '../Styles/Quiz.module.css';
import q from '../Styles/Quiz.module.css'; 
import Image from 'next/image';


export default function Quiz() {
    const router = useRouter();
    const { name, sound, userAge } = useUser();
    const { questions, currentQuestion, handleAnswer, currentIndex, quizLength, gif_URLs } = useQuiz();
    
    const [answer, setAnswer] = useState();

    // Initialize currentQuestion properties safely
    const questionText = currentQuestion?.questionText || '';
    const audio_URL = currentQuestion?.audio_URL || '';
    const Section = currentQuestion?.Section || '';
    const Type = currentQuestion?.Type || '';
    const GIF_URL = currentQuestion?.GIF_URL || '';
    const currentIMG = gif_URLs?.[currentIndex] || '';

    const handleClick = async (userAnswer) => {
        await setAnswer(userAnswer);
        handleAnswer(userAnswer);
    };

    return (
        <section style={{color: 'white'}}>
            <main className={q.quizComponentContainer} id='quizElement'>
                <section className={q.cardContainer}>
                    <article className={q.card}>
                        <div className={q.cardCategoryColorContainer}>
                            {sound === true && audio_URL && (
                                <audio key={audio_URL} controls autoPlay style={{ opacity: '0', position: 'absolute' }}>
                                    <source src={audio_URL} type="audio/mp3" />
                                </audio>
                            )}

                            <div className={q.categoryLabelContainer}>
                                <label className={q.categoryLabel}>
                                    {Section}
                                </label>
                            </div>
                        </div>

                        <div className={q.questionTextContainer}>
                            <h2 className={q.questionText}>
                                {questionText}
                                <span>
                                    {currentQuestion?.question_text}
                                </span>
                            </h2>
                        </div>
                        
                        <div className={q.doodleContainer} style={{outline: '0px solid lime', margin: '0 auto'}}>
                            {currentIMG && (
                                <Image 
                                    src={currentIMG}
                                    alt='quiz illustration'
                                    width={300}
                                    height={300}
                                    unoptimized
                                    style={{
                                        margin: '0 auto',
                                        objectFit: 'contain'
                                    }}
                                />
                            )}
                        </div>
                    </article>
                </section>

                <section className={q.answerSectionContainer}>
                    <aside className={q.buttonsContainer}>
                        <div className={q.noButtonContainer}>
                            <button className={q.noButton} onClick={() => handleClick('no')}>
                                No 
                            </button>
                        </div>       

                        <div className={q.sometimesButtonContainer}>
                            <button className={q.sometimesButton} onClick={() => handleClick('sometimes')}>
                                Sometimes   
                            </button>
                        </div>  

                        <div className={q.yesButtonContainer}>
                            <button className={q.yesButton} onClick={() => handleClick('yes')}>
                                Yes 
                            </button>
                        </div>
                    </aside>
                </section>
            </main>
        </section>
    );
} 