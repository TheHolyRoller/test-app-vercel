'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../lib/context/UserContext';
import { useQuiz } from '../lib/context/QuizContext';
import { databases } from '../lib/appwrite';

import q from '../Styles/Quiz.module.css'; 
import QuizCard from '../Components/QuizCard';
import UserEmailInput from '../Components/UserEmailInput'; 



const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_RESULTS_COLLECTION_ID;


export default function EmailSignup() {

    return (
        <section style={{color: 'white'}}>
            <main className={q.quizComponentContainer} id='quizElement'>
                <section className={q.cardContainer}>
                    <QuizCard 
                        questionText="Enter your email to receive your results"
                        Section="Results"
                        currentQuestion={{
                            questionText: "We'll send your detailed results to your email"
                        }}
                        // No audio for this page
                        audio_URL=""
                        // Optional: Add a results-related image if you have one
                        currentIMG=""
                    />
                    
                    {/* <form onSubmit={onSubmit} className={q.emailForm}>
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
                    </form> */}

                    <UserEmailInput/>
                    



                </section>

            </main>
        </section>
    );
} 