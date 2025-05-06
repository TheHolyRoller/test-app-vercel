'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import q from '../../../Styles/Quiz.module.css';
// import { useQuiz } from '../../../lib/context/QuizContext';
// import { useUser } from '../../../lib/context/UserContext';

import { useUser } from '../lib/context/UserContext';
import q from '../Styles/Quiz.module.css'; 
import { useQuiz } from '../lib/context/QuizContext';
import QuizCard from '../Components/QuizCard';

export default function UserDetails() {
    const audio_URL = 'https://dyslexiaquizapp.s3.eu-west-2.amazonaws.com/audio+doodles/quizzer+name-v1.mp3'; 
    const currentIMG = '/';

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
                    <QuizCard 
                        questionText="What's The Name Of The Quiz Taker?"
                        Section="Details"
                        currentQuestion={{
                            questionText: ""
                        }}
                        audio_URL={audio_URL}
                        currentIMG={currentIMG}
                    />
                    
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
                </section>
            </main>
        </section>
    );
} 