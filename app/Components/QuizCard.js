'use client'
import Image from 'next/image';
import q from '../Styles/Quiz.module.css';
import { useState, useEffect } from 'react';
import { useQuiz } from '../lib/context/QuizContext';
import { useUser } from '../lib/context/UserContext';
import { usePathname } from 'next/navigation';

const QuizCard = ({ 
    questionText, 
    audio_URL, 
    Section, 
    currentIMG,
    currentQuestion 
}) => {

    // Answer button state and logic from QuizAnswer
    const { handleAnswer } = useQuiz();
    const pathname = usePathname();
    const [answer, setAnswer] = useState();
    const [counters, setCounter] = useState({
        yesNum: 0, 
        noNum: 0, 
        sometimesNum: 0 
    }); 

    const increment = (name) => {
        setCounter(prev => ({
            ...prev, 
            [name]: prev[name] + 1
        })); 
    }

    const handleClick = async (userAnswer) => {
        console.log('🎯 Answer Selected:', {
            answer: userAnswer,
            questionText: currentQuestion?.questionText
        });
        
        await setAnswer(userAnswer);
        handleAnswer(userAnswer);
    };

    // Scroll to top when on quiz route
    useEffect(() => {
        if (pathname === '/quiz') {
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    console.log("Rendering QuizCard with the following props:");
    console.log("Question Text:", questionText);
    console.log("Audio URL:", audio_URL);
    console.log("Section:", Section);
    console.log("Current Image:", currentIMG);
    console.log("Current Question:", currentQuestion);

    const getColorBySection = (Section) => {
        // Add debug logging
        console.log('getColorBySection called with:', Section);
        
        // Handle undefined or null case
        if (!Section) {
            console.warn('Section is undefined or null, using default color');
            return '#4c2a74';
        }

        // Normalize the section name
        const normalizedSection = Section.trim().toLowerCase();
        console.log('Normalized section:', normalizedSection);

        switch(normalizedSection) {
            case 'reading': 
                return 'rgb(81, 216, 139)'; 
            case 'writing': 
                return 'rgb(44, 152, 224)'; 
            case 'plans': 
                return 'rgb(199, 59, 46)'; 
            case 'memory': 
                return 'rgb(231, 126, 34)'; 
            case 'tests': 
                return 'rgb(244, 198, 14)'; 
            default: 
                console.warn('Unknown section:', Section, 'using default color');
                return '#4c2a74';  
        }
    }

    // Add debug logging for the component render
    console.log('QuizCard render - Section:', Section);
    console.log('Selected color:', getColorBySection(Section));

    return (
        <>
        <article 
            className={q.card} 
            id={q.firstCARD} 
            style={{
                marginTop: pathname === '/quiz' ? '-5em' : '0'
            }}
        >
            <div 
                className={q.cardCategoryColorContainer} 
                style={{
                    backgroundColor: getColorBySection(Section),
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

                <div className={q.categoryLabelContainer}>
                    <label className={q.categoryLabel}>
                        {Section}
                    </label>
                </div>
            </div>

            {questionText && (
                <div className={q.questionTextContainer} style={{outline: '0px solid red', color: 'black', position: 'relative', zIndex: '9999', marginTop: '1em', marginBottom: '5rem'}} >
                    <h2 className={q.questionText}>
                        {questionText}
                        <span>
                            {currentQuestion?.questionText}
                        </span>
                    </h2>
                </div>
            )}
            
            <div className={q.imageSectionContainer}>
                <div className={q.doodleContainer} style={{}}>
                    {currentIMG && (
                        <Image 
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
                                outline: '0px solid red',
                                zIndex: '0'
                            }}
                        />
                    )}
                </div>
            </div>

                    
            <article className={q.card} id={q.cardThree}></article>
            <article className={q.card} id={q.cardTwo}></article>
            <article className={q.card} id={q.cardFour}></article>
        </article>

        {/* Integrated Answer Section - Only show on /quiz route */}
        {pathname === '/quiz' && (
            <section className={q.mainAnswerContainer} >
                <article className={q.answerSection}>
                    <div className={q.buttonList}>

                        <div className={q.buttonStackContainer} 
                          onClick={() => handleClick('no')}
                          onMouseEnter={() => console.log('🖱️ Hovering No Button')}
                        >
                            <div className={q.button} id={q.noButton} onClick={() => increment('noNum')} >
                                {counters.noNum > 0 && (
                                    <span className={q.numSpan}>
                                    {counters.noNum}
                                    </span>
                                )}
                                No 
                            </div>
                            <div className={q.buttonStack} id={q.noStackOne}></div>
                            <div className={q.buttonStack} id={q.noStackTwo}></div>
                            <div className={q.buttonStack} id={q.noStackThree}></div>
                            <div className={q.buttonStack} id={q.noStackFour}></div>
                            <div className={q.buttonStack} id={q.noStackFive}></div>
                            <div className={q.buttonStack} id={q.noStackSix}></div>
                        </div>

                        <div className={q.buttonStackContainer} onClick={() => handleClick('sometimes')} onMouseEnter={() => console.log('🖱️ Hovering Sometimes Button')} >
                            <div className={q.button} id={q.sometimesButton} onClick={() => increment('sometimesNum')} >
                                {counters.sometimesNum > 0 && (
                                    <span className={q.numSpan}>
                                    {counters.sometimesNum}
                                    </span>
                                )}
                                Some 
                                times 
                            </div>
                            <div className={q.buttonStack} id={q.sometimesStackOne}></div>
                            <div className={q.buttonStack} id={q.sometimesStackTwo}></div>
                            <div className={q.buttonStack} id={q.sometimesStackThree}></div>
                            <div className={q.buttonStack} id={q.sometimesStackFour}></div>
                            <div className={q.buttonStack} id={q.sometimesStackFive}></div>
                            <div className={q.buttonStack} id={q.sometimesStackSix}></div>
                        </div>

                        <div className={q.buttonStackContainer}   
                        onClick={() => handleClick('yes')}
                        onMouseEnter={() => console.log('🖱️ Hovering Yes Button')}>
                            <div className={q.button} id={q.yesButton} onClick={() => increment('yesNum')}>
                                {counters.yesNum > 0 && (
                                    <span className={q.numSpan}>
                                    {counters.yesNum}
                                    </span>
                                )}
                                Yes 
                            </div>
                            <div className={q.buttonStack} id={q.yesStackOne}></div>
                            <div className={q.buttonStack} id={q.yesStackTwo}></div>
                            <div className={q.buttonStack} id={q.yesStackThree}></div>
                            <div className={q.buttonStack} id={q.yesStackFour}></div>
                            <div className={q.buttonStack} id={q.yesStackFive}></div>
                            <div className={q.buttonStack} id={q.yesStackSix}></div>
                        </div>
                    </div>
                </article>
            </section>
        )}
        </>
    );
};

export default QuizCard; 