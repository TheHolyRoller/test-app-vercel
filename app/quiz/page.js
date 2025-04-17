'use client';

import { useQuiz } from '../lib/context/QuizContext';
import { useUser } from '../lib/context/UserContext';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import q from '../Styles/Quiz.module.css';
import Image from 'next/image';

export default function Quiz() {
    const router = useRouter();
    const { name, sound, userAge } = useUser();
    const { questions, currentQuestion, handleAnswer, currentIndex, quizLength, gif_URLs } = useQuiz();
    
    // Add loading state
    const [isLoading, setIsLoading] = useState(true);

    const isQuizEndRef = useRef(false);
    const [answer, setAnswer] = useState();
    const [quizEnd, setQuizEnd] = useState(false);
    const [currentIMG, setCurrentIMG] = useState();

    // Initialize currentQuestion properties safely
    const questionText = currentQuestion?.questionText || '';
    const audio_URL = currentQuestion?.audio_URL || '';
    const Section = currentQuestion?.Section || '';
    const Type = currentQuestion?.Type || '';
    const GIF_URL = currentQuestion?.GIF_URL || '';

    useEffect(() => {
        if (currentQuestion && gif_URLs) {
            setIsLoading(false);
            let current_IMG_URL = gif_URLs[currentIndex];
            setCurrentIMG(current_IMG_URL);
            
            if(currentIndex === quizLength) {
                setQuizEnd(true);
            }
        }
    }, [currentIndex, quizLength, gif_URLs, currentQuestion]);

    useEffect(() => {
        if(quizEnd) {
            disableButtons();
        }
    }, [quizEnd]);

    const disableButtons = () => {
        const quizElem = document.getElementById('quizElement');
        if (quizElem) {
            quizElem.style.display = 'none';
        }
    }
    
    const handleClick = async (userAnswer) => {
        await setAnswer(userAnswer);
        handleAnswer(userAnswer);
    };

    if (isLoading) {
        return (
            <div className={q.loadingContainer}>
                <h2>Loading quiz...</h2>
            </div>
        );
    }

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
                                <img 
                                    src={currentIMG}
                                    alt='quiz illustration'
                                    style={{
                                        width: '300px',
                                        height: '300px',
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