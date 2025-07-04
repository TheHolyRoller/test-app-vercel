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
    const { questions, currentQuestion, handleAnswer, currentIndex, quizLength, gif_URLs } = useQuiz();
    
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
                    questionText: currentQuestion.questionText
                } : null,
                gifURLsCount: gif_URLs?.length
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
                questionText: currentQuestion.questionText
            } : null,
            gifURLsCount: gif_URLs?.length
        });
    }, [currentIndex, quizLength, questions, currentQuestion, gif_URLs]);

    // Initialize currentQuestion properties safely
    const questionText = currentQuestion?.questionText || '';
    const audio_URL = sound ? (currentQuestion?.audio_URL || '') : '';
    const Section = currentQuestion?.Section || '';
    const Type = currentQuestion?.Type || '';
    const GIF_URL = currentQuestion?.GIF_URL || '';
    const currentIMG = gif_URLs?.[currentIndex] || '';

    // Log question details
    useEffect(() => {
        console.log('📝 Current Question Details:', {
            questionText,
            audio_URL,
            Section,
            Type,
            GIF_URL,
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
            questionText: currentQuestion?.questionText
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
                        categoryName={currentQuestion?.categoryName || currentQuestion?.questionText}
                        audio_URL={audio_URL}
                    />
                    </div>
                ) : (
                    <QuizCard
                        questionText={questionText}
                        Section={Section}
                        audio_URL={audio_URL}
                        currentIMG={GIF_URL}
                        currentQuestion={currentQuestion}
                    />
                )}

               </div>
            </main>
        </section>
    );
} 