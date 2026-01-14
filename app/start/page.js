'use client';

import { useRouter } from 'next/navigation';
import t from '../Styles/test.module.css';
import StartCard from '../Components/StartCard';


export default function StartQuiz() {
    const router = useRouter();

    return (
        <main className={t.landingPageMainContainer}>

            <section className={t.mainSection}>
                
                <StartCard/> 
              

            </section>
        </main>
    );
} 