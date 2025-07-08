'use client'
import React from 'react'
import Image from 'next/image'; 
import c from '../Styles/categories.module.css';
import { nunito } from '../fonts/nunito';
import { useQuiz } from '../lib/context/QuizContext';
import { usePathname } from 'next/navigation';
import logo from '../assets/ivvi_Logo.svg'; 

function CategoryCard({ Section, audio_URL, categoryName }) {
    const { handleAnswer, currentQuestion } = useQuiz();
    const pathname = usePathname();
    
    // Use categoryName prop, or try to extract from question data, or fallback to Section
    const actualCategory = categoryName || currentQuestion?.categoryName || currentQuestion?.questionText?.toLowerCase() || Section;
    
    console.log('CategoryCard - Props:', { Section, categoryName, actualCategory });
    
    // Color logic extracted from QuizCard.js
    const getColorBySection = (Section) => {
        // Handle undefined or null case
        if (!Section) {
            return '#4c2a74';
        }

        // Normalize the section name
        const normalizedSection = Section.trim().toLowerCase();

        switch(normalizedSection) {
            case 'reading': 
                return 'rgb(120, 213, 145)'; 
            case 'writing': 
                return 'rgb(44, 152, 224)'; 
            case 'plans': 
                return 'rgb(199, 59, 46)'; 
            case 'memory': 
                return 'rgb(231, 126, 34)'; 
            case 'tests': 
                return 'rgb(244, 198, 14)'; 
            default: 
                return '#4c2a74';  
        }
    }

    const handleNext = () => {
        console.log('CategoryCard - Moving to next question');
        handleAnswer('category_viewed'); // Use a special answer type for category cards
    };

    return (
        <>
            <article 
                className={`${c.card} ${nunito.className}`} 
                id={c.firstCARD} 
                style={{
                    marginTop: pathname === '/quiz' ? '-1em' : '0',
                    position: 'relative',
                    zIndex: 200,
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08)',
                    backgroundColor: getColorBySection(actualCategory)
                }}>

                <article className={c.mainLogoContainer}>
                    {/* Add in the Logo container here  */}
                    <div className={c.logoContainer}>
                        <h1 className={c.categoryMainHeader}> 
                            Signs of Dyslexia in  
                        </h1>

                        <span className={c.theSpan}>
                            {actualCategory}
                        </span>
                    </div>
                    {/* Add in the logo here  */}
                </article>

                <footer className={c.ivviLogoContainer}>
                    <span className={c.bySpan}>by</span>
                    <figure className={c.logo}>
                        <Image src={logo} width={150} height={50} alt='logo' className={c.logoImage} />
                    </figure>
                </footer>

                {audio_URL && (
                    <audio 
                        key={audio_URL} 
                        controls 
                        autoPlay 
                        style={{ opacity: '0', position: 'absolute' }}
                        onPlay={() => console.log('🎵 Audio Started Playing:', audio_URL)}
                        onError={(e) => console.error('❌ Audio Error:', e)}
                    >
                        <source src={audio_URL} type="audio/mp3" />
                    </audio>
                )}

                <article className={c.card} style={{backgroundColor: getColorBySection(actualCategory)}} id={c.cardOne}></article>
                <article className={c.card} style={{backgroundColor: getColorBySection(actualCategory)}} id={c.cardTwo}></article>
                <article className={c.card} style={{backgroundColor: getColorBySection(actualCategory)}} id={c.cardThree}></article>
                <article className={c.card} style={{backgroundColor: getColorBySection(actualCategory)}} id={c.cardFour}></article>
            </article>

            <aside className={c.buttonSectionContainer}>
                <div className={c.CTAButton} onClick={handleNext} style={{userSelect: 'none'}}>Next</div>
            </aside>
        </>
    )
}

export default CategoryCard 