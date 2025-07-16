'use client';

import { useRouter } from 'next/navigation';
import t from '../Styles/test.module.css';
import Image from 'next/image';
// import backgroundLogo from '../assets/CentralAsset.png';
import backgroundLogo from '../assets/ivvi_Logo.svg'; 
import Start from '../Components/Start'; 
import StartCard from '../Components/StartCard';
import UserInput from '../Components/UserInput'; 
import AudioControls from '../Components/AudioControls'; 


export default function StartQuiz() {
    const router = useRouter();

    return (
        <main className={t.landingPageMainContainer}>
           

            <section className={t.mainSection}>
                
                {/* <Start/> */}
                <StartCard/> 
                
              

            </section>
        </main>
    );
} 