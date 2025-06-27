'use client'
import Image from 'next/image';
import q from '../Styles/Quiz.module.css';
import { useState, useEffect } from 'react';
import { useQuiz } from '../lib/context/QuizContext';
import { useUser } from '../lib/context/UserContext';
import { usePathname } from 'next/navigation';
import { nunito } from '../fonts/nunito';
import { chewy } from '../fonts/chewy';
import mute from '../assets/mute.png'; 
import soundOn from '../assets/volume.png'; 



const QuizCard = ({ 
    questionText, 
    audio_URL, 
    Section, 
    currentIMG,
    currentQuestion
    
}) => {



    // Answer button state and logic from QuizAnswer
    const { handleAnswer, buttonCounters, incrementButtonCounter } = useQuiz();
    const { sound, toggleUserSound } = useUser();
    const pathname = usePathname();
    const [answer, setAnswer] = useState();

    console.log('this is the sound instance variable \n', sound); 

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
                return 'rgb(120, 213, 145)'; 
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

    const getNavbarColorBySection = (Section) => {
        // Add debug logging
        console.log('getNavbarColorBySection called with:', Section);
        
        // Handle undefined or null case
        if (!Section) {
            console.warn('Section is undefined or null, using default navbar color');
            return '#2c1a3e';
        }

        // Normalize the section name
        const normalizedSection = Section.trim().toLowerCase();
        console.log('Normalized navbar section:', normalizedSection);

        switch(normalizedSection) {
            case 'reading': 
                return 'rgb(119, 210, 143)'; 
            case 'writing': 
                return 'rgb(30, 120, 180)'; 
            case 'plans': 
                return 'rgb(160, 40, 30)'; 
            case 'memory': 
                return 'rgb(200, 100, 20)'; 
            case 'tests': 
                return 'rgb(220, 170, 10)'; 
            default: 
                console.warn('Unknown navbar section:', Section, 'using default navbar color');
                return '#2c1a3e';  
        }
    }

    const getLabelColorBySection = (Section) => {
        // Handle undefined or null case
        if (!Section) {
            return '#3a2850';
        }

        // Normalize the section name
        const normalizedSection = Section.trim().toLowerCase();

        switch(normalizedSection) {
            case 'reading': 
                return 'rgb(90, 170, 115)'; // Darker green
            case 'writing': 
                return 'rgb(25, 100, 160)'; // Darker blue
            case 'plans': 
                return 'rgb(140, 35, 25)'; // Darker red
            case 'memory': 
                return 'rgb(180, 90, 15)'; // Darker orange
            case 'tests': 
                return 'rgb(200, 150, 0)'; // Darker yellow
            default: 
                return '#3a2850';  // Darker purple
        }
    }

    // Add debug logging for the component render
    console.log('QuizCard render - Section:', Section);
    console.log('Selected card color:', getColorBySection(Section));
    console.log('Selected navbar color:', getNavbarColorBySection(Section));

    return (
        <>
        {/* Navbar background strip */}
        <div 
            className={q.navbarStrip}
            style={{
                backgroundColor: getNavbarColorBySection(Section),
                width: '100%',
                height: '120px',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 100,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
        />

            {/* CARD  */}

        <article 
            className={`${q.card} ${nunito.className}`} 
            id={q.firstCARD} 
            style={{
                marginTop: pathname === '/quiz' ? '-1em' : '0',
                position: 'relative',
                zIndex: 200,
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.06)', 

            }}
        >
            <div 
                className={q.cardCategoryColorContainer} 
                style={{
                    backgroundColor: getColorBySection(Section),
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

                <div className={`${q.categoryLabelContainer} ${nunito.className}`}>
                    <label className={`${q.categoryLabel} ${nunito.className}`}>

                        {/* Add in the category section container here  */}


                        <div className={`${q.labelContainer} ${nunito.className}`} style={{backgroundColor: getLabelColorBySection(Section)}}>

                        {Section}


                        {/* Add in the icon here  */}
                        {/* Add in an event listener here that toggles the sound on or off option  */}
                        <div className={q.soundIconContainer} onClick={toggleUserSound} >



                            {sound === true ? (

                                <Image src={soundOn} width={20} height={20} alt='sound'/>


                            ) : (

                                <Image src={mute} width={20} height={20} alt='sound off'/>


                            )}



                        </div>


                        </div>
                    </label>
                </div>
            </div>

            {questionText && (
                <div className={`${q.questionTextContainer} ${nunito.className}`} style={{ marginTop: '-4.5rem' }}>
                    <h2 className={`${q.questionText} ${nunito.className}`}>
                        {questionText}
                    </h2>
                </div>
            )}
            
            <div className={q.imageSectionContainer}>
                <div className={q.doodleContainer}>
                    {currentIMG && (
                        <Image 
                            src={currentIMG}
                            className={q.currentIMG}
                            alt='quiz illustration'
                            width={200}
                            height={200}
                            unoptimized
                            onLoad={() => console.log('🖼️ Image Loaded:', currentIMG)}
                            onError={(e) => console.error('❌ Image Error:', e)}
                            style={{
                                marginTop: '-3.5rem',
                                objectFit: 'contain', 
                                zIndex: '0', 
                               
                            }}
                        />
                    )}
                    

                </div>
            </div>

            <article className={q.card} id={q.cardOne}></article>
            <article className={q.card} id={q.cardTwo}></article>
            <article className={q.card} id={q.cardThree}></article>
            <article className={q.card} id={q.cardFour}></article>
        </article>

        {/* Integrated Answer Section - Only show on /quiz route */}
        {pathname === '/quiz' && (
            <section className={`${q.mainAnswerContainer} ${nunito.className}`}>
                <article className={`${q.answerSection} ${nunito.className}`}>
                    <div className={`${q.buttonList} ${nunito.className}`}>

                        <div className={q.buttonStackContainer} 
                          onClick={() => handleClick('no')}
                          onMouseEnter={() => console.log('🖱️ Hovering No Button')}
                        >
                            <div className={`${q.button} ${chewy.className}`} id={q.noButton} onClick={() => incrementButtonCounter('noNum')} >
                                {buttonCounters.noNum > 0 && (
                                    <span className={q.numSpan}>
                                    {buttonCounters.noNum}
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
                            <div className={`${q.button} ${chewy.className}`} id={q.sometimesButton} onClick={() => incrementButtonCounter('sometimesNum')} >
                                {buttonCounters.sometimesNum > 0 && (
                                    <span className={q.numSpan}>
                                    {buttonCounters.sometimesNum}
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
                            <div className={`${q.button} ${chewy.className}`} id={q.yesButton} onClick={() => incrementButtonCounter('yesNum')}>
                                {buttonCounters.yesNum > 0 && (
                                    <span className={q.numSpan}>
                                    {buttonCounters.yesNum}
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
                            <div className={q.buttonStack} id={q.yesStackSeven}></div>

                        </div>
                    </div>
                </article>
            </section>
        )}
        </>
    );
};

export default QuizCard; 