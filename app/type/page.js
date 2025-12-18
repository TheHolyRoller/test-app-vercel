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

            // alert(`this is the user type ${type}`); 

            router.push('/quiz');
        }, 210);
    };



    useEffect(() => {
        console.log('User type updated:', user);
    }, [user]);

    return (
        <section className={q.mainCardSectionContainer} style={{color: 'white', marginTop:'9rem'}}>
            <main className={q.quizComponentContainer} style={{}} id='quizElement'>
            {/* 
We can screen different people for you, who is it going to be this time?

*/}
                     <QuizCard 

                        question_text="Who is being quizzed"
                        Section="Details"
                        currentQuestion={{
                            question_text: ""
                        }}
                        
                        audio_url={sound ? "https://fra.cloud.appwrite.io/v1/storage/buckets/dood_gifs/files/Audio_Permissions/view?project=67d4d9140008273c9d84&mode=admin" : null}
                        currentIMG=''
                    >

                         <div className={q.ageBracketContainer}>
                    <div className={q.buttonGroupContainer}>


                        <button className={`${q.ageButton} ${q.childButton}`} onClick={(() => handleUserType('child'))} >
                            
                            Teen (13+) 
                        </button>
                            <button className={`${q.ageButton} ${q.studentButton}`} onClick={(() => handleUserType('student'))}>
                            
                            Student
                        </button>

                            <button className={`${q.ageButton} ${q.adultButton}`} onClick={(() => handleUserType('adult'))}>
                            
                            Adult 
                        </button>

                        <div className={q.ageTextContainer}>

                    <div className={q.ageTextSpan}>
                        This screener is intended for use only by individuals aged 13 years and older.
                        
                        </div>

                </div>

                    </div>
                    </div>



                    </QuizCard>
                    
                    
                   

            </main>
        </section>
    );
} 