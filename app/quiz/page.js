'use client';

import { useQuiz } from '../lib/context/QuizContext';
import { useUser } from '../lib/context/UserContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import q from '../Styles/Quiz.module.css';
import Image from 'next/image';
import QuizCard from '../Components/QuizCard';
import CategoryCard from '../Components/CategoryCard';



export default function Quiz() {
    const router = useRouter();
    const { name, sound, userAge } = useUser();
    const { questions, currentQuestion, handleAnswer, currentIndex, quizLength, gif_urls } = useQuiz();
    
    const [answer, setAnswer] = useState();



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
            questionsCount: questions?.length,
            currentQuestion: currentQuestion ? {
                id: currentQuestion.$id,
                section: currentQuestion.Section,
                type: currentQuestion.Type,
                question_text: currentQuestion.question_text
            } : null,
            gifURLsCount: gif_urls?.length
        });
    }, [currentIndex, quizLength, questions, currentQuestion, gif_urls]);

    // Initialize currentQuestion properties safely
    const question_text = currentQuestion?.question_text || '';
    const audio_url = sound ? (currentQuestion?.audio_url || '') : '';
    const Section = currentQuestion?.Section || '';
    const Type = currentQuestion?.Type || '';
    const gif_url = currentQuestion?.gif_url || '';
    const currentIMG = gif_urls?.[currentIndex] || '';

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

    const handleClick = async (userAnswer) => {
        console.log('🎯 Answer Selected:', {
            answer: userAnswer,
            currentIndex,
            questionId: currentQuestion?.$id,
            question_text: currentQuestion?.question_text
        });
        
        await setAnswer(userAnswer);
        handleAnswer(userAnswer);
    };





    return (    
        <section className={q.quizMainSection} style={{color: 'white', overflowX: 'hidden', width: '349px'}}>
            <main className={q.quizComponentContainer} id='quizElement' style={{position: 'relative', zIndex: '9999999'}}>
          

            <div className={q.quizCardContainer}>

           
                {/* Conditionally render CategoryCard or QuizCard based on Type */}
                {Type.toLowerCase() === 'category' ? (

                    <div className={q.categoryCardContainer}>


                    <CategoryCard 
                        Section={Section}
                        categoryName={currentQuestion?.categoryName || currentQuestion?.question_text}
                        audio_url={audio_url}
                    />
                    </div>
                ) : (
                    <QuizCard
                        question_text={question_text}
                        Section={Section}
                        audio_url={audio_url}   
                        currentIMG={gif_url}
                        currentQuestion={currentQuestion}
                    />
                )}

               </div>
            </main>
        </section>
    );
} 