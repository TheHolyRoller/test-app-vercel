'use client';

import { useQuiz } from '../lib/context/QuizContext';
import { useUser } from '../lib/context/UserContext';
import { useEffect } from 'react';
import q from '../Styles/Quiz.module.css';
import QuizCard from '../Components/QuizCard';
import CategoryCard from '../Components/CategoryCard';
import { useGifPreloader } from '../lib/hooks/useGifPreloader';



export default function Quiz() {


    const { name, sound, userAge } = useUser();
    const { questions, currentQuestion, currentIndex, quizLength, gif_urls, navColor } = useQuiz();

    useGifPreloader(gif_urls, currentIndex, 2);
    
    const progress = quizLength > 0 ? Math.round(((currentIndex + 1) / quizLength) * 100) : 0; 

    // Function to lighten a hex color
    const lightenColor = (hex, percent) => {
        const num = parseInt(hex.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    };

    // Create lighter version of navbar color for progress bar
    const progressBarColor = navColor ? lightenColor(navColor, 30) : '#4f46e5';


    // Log initial props and state
    useEffect(() => {
        console.log('🎯 Quiz Page Initial State:', {
            userInfo: {
                name,
                sound,
                userAge
            },
            quizState: {
                currentIndex,
                quizLength,
                questionsCount: questions?.length,
                currentQuestion: currentQuestion ? {
                    id: currentQuestion.$id,
                    section: currentQuestion.Section,
                    type: currentQuestion.Type,
                    question_text: currentQuestion.question_text
                } : null,
                gifURLsCount: gif_urls?.length
            }
        });
    }, []);

    // Log state changes
    useEffect(() => {
        console.log('🔄 Quiz State Update:', {
            currentIndex,
            quizLength,
            progress: `${progress}%`,
            questionsCount: questions?.length,
            currentQuestion: currentQuestion ? {
                id: currentQuestion.$id,
                section: currentQuestion.Section,
                type: currentQuestion.Type,
                question_text: currentQuestion.question_text
            } : null,
            gifURLsCount: gif_urls?.length
        });
    }, [currentIndex, quizLength, questions, currentQuestion, gif_urls, progress]);

    console.log('this is the gif_urls array \n', gif_urls); 


    // Initialize currentQuestion properties safely
    const question_text = currentQuestion?.question_text || '';
    const audio_url = sound ? (currentQuestion?.audio_url || '') : '';
    const Section = currentQuestion?.Section || '';
    const Type = currentQuestion?.Type || '';
    const gif_url = currentQuestion?.gif_url || '';
    const currentIMG = gif_urls?.[currentIndex] || '';

    console.log('this is the gif url \n', gif_url); 


    // Log question details
    useEffect(() => {
        console.log('📝 Current Question Details:', {
            question_text,
            audio_url,
            Section,
            Type,
            gif_url,
            currentIMG,
            currentIndex,
            totalQuestions: quizLength,
            isCategory: Type.toLowerCase() === 'category',
            categoryName: currentQuestion?.categoryName
        });
    }, [currentQuestion, currentIndex]);



    return (    
        <section className={q.quizMainSection} style={{color: 'white'}}>

            {/* TODO put the position relative back */}
            <main className={q.quizComponentContainer} id='quizElement' style={{ zIndex: '9999'}}>
          

            <div className={q.quizCardContainer} style={{}}>
                
                <div className={q.progressBarContainer} style={{}}>
                    
                    <div className={q.progressBarFill} style={{

                        width: `${progress}%`, 
                        height: '100%', 
                        background: progressBarColor, 
                        borderRadius: '10px', 
                        transition: 'width 0.3s ease'
                        }}>
                    </div>
                </div>


                {Type.toLowerCase() === 'category' ? (

                    <div className={q.categoryCardContainer} >

                    <CategoryCard 
                        key={`category-${currentIndex}-${currentQuestion?.$id}`}
                        Section={Section}
                        categoryName={currentQuestion?.categoryName || currentQuestion?.question_text}
                        audio_url={audio_url}   
                    />
                    </div>
                ) : (

                    // TODO Dial this in with the dynamic top margin element 
                    <div style={{ marginTop:"4.3rem"}} >

                    <QuizCard
                        key={`quiz-${currentIndex}-${currentQuestion?.$id}`}
                        question_text={question_text}
                        Section={Section}
                        audio_url={audio_url}   
                        currentIMG={gif_url}
                        currentQuestion={currentQuestion}
                        />
                        </div>
                )}

               </div>
            </main>
        </section>
    );
} 