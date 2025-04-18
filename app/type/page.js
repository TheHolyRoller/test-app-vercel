'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import q from '../../Styles/Quiz.module.css';
import q from '../Styles/Quiz.module.css'; 
import { useUser } from '../lib/context/UserContext';

export default function UserType() {
    const router = useRouter();
    const [user, setUser] = useState();
    const { setUserType } = useUser();

    const handleUserType = async (type) => {
        await setUserType(type);
        setUser(type);

        // Add a small delay before navigation
        setTimeout(() => {
            router.push('/quiz/details');
        }, 210);
    };

    useEffect(() => {
        console.log('User type updated:', user);
    }, [user]);

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
                                    I can quiz different people for you. Who is it this time?
                                </span>
                            </h2>
                        </div>
                        
                        <div className={q.doodleContainer}>
                            {/* Add doodle image here if needed */}
                        </div>
                    </article>
                </section>

                <section className={q.answerSectionContainer}>
                    <aside className={q.buttonsContainer}>
                        <div className={q.noButtonContainer}>
                            <button 
                                className={q.yesButton}
                                onClick={() => handleUserType('adult')}
                            >
                                Adult
                            </button>
                        </div>

                        <div className={q.yesButtonContainer}>
                            <button 
                                className={q.sometimesButton}
                                onClick={() => handleUserType('child')}
                            >
                                Child
                            </button>
                        </div>
                    </aside>
                </section>
            </main>
        </section>
    );
} 