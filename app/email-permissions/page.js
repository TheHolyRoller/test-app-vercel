'use client';

import { useQuiz } from '../lib/context/QuizContext';
import { useUser } from '../lib/context/UserContext';
import { useRouter } from 'next/navigation';
// import q from '../../Styles/Quiz.module.css';
import q from '../Styles/Quiz.module.css'; 


export default function EmailPermission() {
    const router = useRouter();
    const { finalScore } = useQuiz();
    const { name } = useUser();

    const handleYesClick = () => {
        router.push('/email-signup');
    };

    const handleNoClick = () => {
        router.push('/');
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
                                    Can I send your results to your email?
                                </span>
                            </h2>
                        </div>
                        
                        <div className={q.doodleContainer}>
                            {/* Add doodle image here if needed */}
                        </div>
                    </article>
                </section>

                <section className={q.answerSectionContainer}>
                    <aside className={q.buttonsContainer} style={{outline: '0px solid lime', display: 'flex', placeContent: 'center', width: '90%'}}>
                        <div className={q.noButtonContainer}>
                            <button 
                                className={q.yesButton} 
                                style={{marginRight: '1rem'}}
                                onClick={handleYesClick}
                            >
                                Yes
                            </button>
                        </div>       

                        <div className={q.sometimesButtonContainer}>
                            <button 
                                className={q.noButton}
                                onClick={handleNoClick}
                            >
                                No
                            </button>
                        </div>
                    </aside>
                </section>
            </main>
        </section>
    );
} 