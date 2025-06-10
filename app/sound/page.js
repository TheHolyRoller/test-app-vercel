'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '../lib/context/UserContext';
import q from '../Styles/Quiz.module.css'; 

import QuizCard from '../Components/QuizCard';
import {QuizAnswer} from '../Components/QuizAnswer'; 
import AudioControls from '../Components/AudioControls';


export default function SoundPage() {
    const router = useRouter();
    const { setUserSound } = useUser();

    const handleSoundChoice = (soundEnabled) => {
        setUserSound(soundEnabled);
        router.push('/type');
    };

    return (
        <section style={{color: 'white'}}>
            <main className={q.quizComponentContainer} id='quizElement'>
            <QuizCard 
                        questionText="Hi I'm 'Dood'. I'll quiz you on the signs of dyslexia. Can I turn on the audio so I can speak to you?"
                        Section="Details"
                        currentQuestion={{
                            questionText: ""
                        }}
                        audio_URL=''
                        currentIMG='https://fra.cloud.appwrite.io/v1/storage/buckets/dood_gifs/files/Turn_On_Audio/view?project=test-domain&mode=admin'
                    />

                <div style={{outline: '0px solid red', marginTop: '-5rem', position: 'relative', zIndex: '999999999'}} >

                {/* <QuizAnswer/> */}
                <AudioControls/>
                </div>

            </main>
        </section>
    );
} 