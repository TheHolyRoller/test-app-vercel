'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../lib/context/UserContext';
import q from '../Styles/Quiz.module.css'; 
import { useQuiz } from '../lib/context/QuizContext';
import QuizCard from '../Components/QuizCard';
import UserInput from '../Components/UserInput';

export default function UserDetails() {
    const audio_url = 'https://dyslexiaquizapp.s3.eu-west-2.amazonaws.com/audio+doodles/quizzer+name-v1.mp3'; 
    const currentIMG = 'https://fra.cloud.appwrite.io/v1/storage/buckets/dood_gifs/files/Dood_Name/view?project=test-domain&mode=admin';

    const router = useRouter();
    const { handleAnswer } = useQuiz();
    const { setUserName, sound } = useUser();
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
                        question_text="What's The Name Of The Person Taking The Quiz?"
                        Section="Details"
                        currentQuestion={{
                            question_text: ""
                        }}
                        
                        // audio_url={ (sound && audio_url : '')}
                        audio_url={sound ? audio_url : null}

                        currentIMG={currentIMG}
                    />  

                    <div style={{position: 'relative', zIndex: '9999', marginTop: '-1.5rem', marginRight: '1em'}} >

                    <UserInput/>
                    </div>


                </section>
            </main>
        </section>
    );
} 