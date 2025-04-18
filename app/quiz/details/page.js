'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import q from '../../../Styles/Quiz.module.css';
import { useQuiz } from '../../../lib/context/QuizContext';
import { useUser } from '../../../lib/context/UserContext';

export default function UserDetails() {
    const router = useRouter();
    const { handleAnswer } = useQuiz();
    const { setUserName } = useUser();
    const [userName, setName] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setUserName(userName);
        handleAnswer('noop');

        setTimeout(() => {
            router.push('/quiz');
        }, 210);
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
                                    What&apos;s The Name Of The Quiz Taker?
                                </span>
                            </h2>
                        </div>
                        
                        <div className={q.doodleContainer}>
                            {/* Add doodle image here if needed */}
                        </div>
                    </article>
                </section>

                <form onSubmit={handleSubmit} className={q.detailsForm}>
                    <div className={q.inputContainer}>
                        <label htmlFor="name" className={q.inputLabel}>
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={userName}
                            onChange={handleChange}
                            className={q.nameInput}
                            required
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