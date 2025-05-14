'use client';

import { useRouter } from 'next/navigation';
import t from '../Styles/test.module.css';
import Image from 'next/image';
import backgroundLogo from '../assets/CentralAsset.png';
import Start from '../Components/Start'; 
import UserInput from '../Components/UserInput'; 



export default function StartQuiz() {
    const router = useRouter();

    return (
        <main className={t.landingPageMainContainer}>
            <nav className={t.navbarMainContainer}>
                {/* <Navbar/> */}
            </nav>

            <section className={t.mainSection}>
                {/* <div className={t.callToActionContainer}>
                    <div className={t.logoImageContainer}>
                        <Image 
                            src={backgroundLogo} 
                            alt='background logo' 
                            width={50} 
                            height={50} 
                            className={t.backgroundLogoCTAImage} 
                            style={{outline: '0px solid red'}}
                        />
                    </div>

                    <div className={t.dividerElement}></div>

                    <article className={t.callToActionButtonContainer}>
                        <div className={t.callToActionButton}>
                            <button 
                                className={t.callToActionLink}
                                onClick={() => router.push('/sound')}
                            >
                                Start Quiz
                            </button>
                        </div>
                    </article>
                </div> */}
                
                <Start/>

                {/* <UserInput/> */}

            </section>
        </main>
    );
} 