'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import q from '../../Styles/Quiz.module.css';
import { useUser } from '../lib/context/UserContext';
import { useQuiz } from '../lib/context/QuizContext';
import { databases } from '../lib/appwrite';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_RESULTS_COLLECTION_ID;

export default function EmailSignup() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const { name, userAge } = useUser();
    const { 
        finalScore, 
        score, 
        memoryScore, 
        writingScore, 
        readingScore, 
        examResultsScore, 
        organisationalScore 
    } = useQuiz();

    const onSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await databases.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                'unique()',
                {
                    inputEmail,
                    finalScore,
                    score,
                    memoryScore,
                    writingScore,
                    readingScore,
                    examResultsScore,
                    organisationalScore,
                    userAge,
                    name
                }
            );
            
            // Navigate to results page after successful submission
            router.push('/result');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleChange = (e) => {
        setInputEmail(e.target.value);
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
                                    Which Email is Best
                                </span>
                            </h2>
                        </div>
                        
                        <div className={q.doodleContainer}>
                            {/* Add doodle image here if needed */}
                        </div>
                    </article>
                </section>

                <form onSubmit={onSubmit} className={q.emailForm}>
                    <div className={q.emailInputContainer}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={inputEmail}
                            onChange={handleChange}
                            required
                            className={q.emailInput}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className={q.yesButton}
                        style={{marginLeft: '0.5rem'}}
                    >
                        Next
                    </button>
                </form>
            </main>
        </section>
    );
} 