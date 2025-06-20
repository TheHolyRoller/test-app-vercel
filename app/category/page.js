'use client'
import React from 'react'
import Image from 'next/image'; 
import c from '../Styles/categories.module.css';
import { nunito } from '../fonts/nunito';
import { useQuiz } from '../lib/context/QuizContext';

import { usePathname } from 'next/navigation';
import logo from '../assets/ivvi_Logo.svg'; 


function CategoryPage() {
    // Get category from quiz context like QuizCard does
    const { currentQuestion, currentIndex, questions, gif_URLs } = useQuiz();
    const pathname = usePathname();
    const Section = currentQuestion?.Section || 'reading'; // Default to reading if no current question
    
    // Extract variables like QuizCard does
    const questionText = currentQuestion?.questionText || '';
    const audio_URL = currentQuestion?.audio_URL || '';
    const currentIMG = gif_URLs?.[currentIndex] || '';
    
    console.log('Category Page - Context Data:', {
        currentQuestion,
        currentIndex,
        questionsCount: questions?.length,
        Section,
        questionText,
        audio_URL,
        currentIMG
    });

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

    const getNavbarColorBySection = (Section) => {
        // Handle undefined or null case
        if (!Section) {
            return '#2c1a3e';
        }

        // Normalize the section name
        const normalizedSection = Section.trim().toLowerCase();

        switch(normalizedSection) {
            case 'reading': 
                return 'rgb(131, 217, 156)'; 
            case 'writing': 
                return 'rgb(30, 120, 180)'; 
            case 'plans': 
                return 'rgb(160, 40, 30)'; 
            case 'memory': 
                return 'rgb(200, 100, 20)'; 
            case 'tests': 
                return 'rgb(220, 170, 10)'; 
            default: 
                return '#2c1a3e';  
        }
    }

    const getLabelColorBySection = (Section) => {
        // Handle undefined or null case
        if (!Section) {
            return '#3a2850';
        }

        // Normalize the section name
        const normalizedSection = Section.trim().toLowerCase();

        switch(normalizedSection) {
            case 'reading': 
                return 'rgb(131, 217, 156)'; // Darker green
            case 'writing': 
                return 'rgb(25, 100, 160)'; // Darker blue
            case 'plans': 
                return 'rgb(140, 35, 25)'; // Darker red
            case 'memory': 
                return 'rgb(180, 90, 15)'; // Darker orange
            case 'tests': 
                return 'rgb(200, 150, 0)'; // Darker yellow
            default: 
                return '#3a2850';  // Darker purple
        }
    }

    return (

        <>

        <section className={c.mainCategoryCardContainer}>


        <article 
        className={`${c.card} ${nunito.className}`} 
        id={c.firstCARD} 
        style={{
            marginTop: pathname === '/quiz' ? '-1em' : '0',
            position: 'relative',
            zIndex: 200,
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08)',
            backgroundColor: getColorBySection(Section)

        }}>



     <article className={c.mainLogoContainer}>
      
      {/* Add in the Logo container here  */}
      <div className={c.logoContainer}>
      <h1 className={c.categoryMainHeader}> 
     
    Signs of Dyslexia in  </h1>

    <span className={c.theSpan} >
            
            {Section}

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
        
       

        <article className={c.card} style={{backgroundColor: getColorBySection(Section)}} id={c.cardOne}></article>
        <article className={c.card} style={{backgroundColor: getColorBySection(Section)}} id={c.cardTwo}></article>
        <article className={c.card} style={{backgroundColor: getColorBySection(Section)}} id={c.cardThree}></article>
        <article className={c.card} style={{backgroundColor: getColorBySection(Section)}} id={c.cardFour}></article>
    </article>

    <aside className={c.buttonSectionContainer}>
        <div className={c.CTAButton}  onClick={() => router.push('/sound')} >Next </div>
        </aside>
        </section>


    </>

       
    )
}

export default CategoryPage