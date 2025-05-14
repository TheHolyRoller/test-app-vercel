'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import q from '../../Styles/Quiz.module.css';
import q from '../Styles/Quiz.module.css'; 
import { useUser } from '../lib/context/UserContext';

import QuizCard from '../Components/QuizCard';
import TypeControls from '../Components/TypeControls'; 


export default function UserType() {
    const router = useRouter();
    const [user, setUser] = useState();
    const { setUserType } = useUser();

    const handleUserType = async (type) => {
        await setUserType(type);
        setUser(type);

        // Add a small delay before navigation
        setTimeout(() => {
            router.push('/details');
        }, 210);
    };

    useEffect(() => {
        console.log('User type updated:', user);
    }, [user]);

    return (
        <section style={{color: 'white'}}>
            <main className={q.quizComponentContainer} id='quizElement'>
            <QuizCard 
                        questionText="I can quiz different people for you. who is it this time?"
                        Section="Details"
                        currentQuestion={{
                            questionText: ""
                        }}
                        audio_URL=''
                        currentIMG=''
                    />

                {/* <section className={q.answerSectionContainer}>
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
                </section> */}


                <TypeControls/>

            </main>
        </section>
    );
} 