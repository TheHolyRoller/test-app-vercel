'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
//  const q = '';  
import q from '../Styles/Type.module.css'; 

import { useUser } from '../lib/context/UserContext';

import QuizCard from '../Components/QuizCard';
import TypeControls from '../Components/TypeControls'; 


export default function UserType() {
    const router = useRouter();
    const [user, setUser] = useState();
    const { setUserType, sound } = useUser();

    const handleUserType = async (type) => {
        await setUserType(type);
        setUser(type);
        setTimeout(() => {
            router.push('/details');
        }, 210);
    };



    useEffect(() => {
        console.log('User type updated:', user);
    }, [user]);

    return (
        <section className={q.mainCardSectionContainer} style={{color: 'white', marginTop:'9rem'}}>
            <main className={q.quizComponentContainer} style={{outline: '5px solid red'}} id='quizElement'>
            <QuizCard 
                        question_text="I can quiz different people for you. who is it this time?"
                        Section="Details"
                        currentQuestion={{
                            question_text: ""
                        }}
                        
                        audio_url={sound ? "https://dyslexiaquizapp.s3.eu-west-2.amazonaws.com/audio+doodles/quizzer+who-v1.mp3" : null}
                        currentIMG=''
                    />
                    
                    
                    <div className={q.ageBracketContainer}>
                    <div className={q.buttonGroupContainer}>


                        <button className={q.ageButton}>
                            
                            Child 13+ 
                        </button>


                    </div>
                    </div>

            </main>
        </section>
    );
} 