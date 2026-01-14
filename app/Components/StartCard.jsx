'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { browserOS } from '../lib/browserOS'; 



import st from '../Styles/startCard.module.css'; 
import { nunito } from '../fonts/nunito';
import Image from 'next/image';
import logo from '../assets/ivvi_Logo.svg'; 


export default function EmailPermission() {
    
    const router = useRouter()
    const cardContainerRef = useRef(null)
 
    const handleYesClick = () => {
        router.push('/understand')
    }

 

    const question_text = `t`

    // Set CSS variable for card height to enable calc() in CSS
    const updateCardHeight = () => {
        if (!cardContainerRef.current) return

        const cardFrameHeight = cardContainerRef.current.offsetHeight

        // Skip if card hasn't rendered yet
        if (cardFrameHeight === 0) return

        document.documentElement.style.setProperty('--card-container-height', `${cardFrameHeight}px`)
    }
    
    useEffect(() => {
        (async () => {
            const isMacChrome = await browserOS()
            console.log("Mac Chrome?", isMacChrome)

            if(isMacChrome === true) {
                console.log('you`re on a mac using chrome ')
            }
        })()
    }, [])

    // Update card height CSS variable on mount and resize
    useEffect(() => {
        // Use multiple frames to ensure DOM is fully rendered
        const updateHeight = () => {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    updateCardHeight()
                })
            })
        }

        updateHeight()

        // Also update after a short delay to catch any late renders
        const timeoutId = setTimeout(updateCardHeight, 100)

        const handleResize = () => {
            updateCardHeight()
        }

        window.addEventListener('resize', handleResize)
        window.addEventListener('orientationchange', handleResize)

        return () => {
            clearTimeout(timeoutId)
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('orientationchange', handleResize)
        }
    }, []) 



    return (
        <div 
            ref={cardContainerRef}
            className={st.cardElementContainer}
        >
        <div style={{}}>
          <article 
          className={`${st.card} ${nunito.className} `} 
          id={st.firstCARD} 
          style={{
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.06)',
              position: 'relative', 
              




          }}
          
          >
  
      {question_text && (
          <div className={`${st.question_textContainer} ${nunito.className}`} style={{color: 'white'}} >
              <h2 className={`${st.question_text} ${nunito.className}`} style={{fontSize: '2rem', letterSpacing: '-1px'}} >

                <span className={st.topHeaderSpan} style={{display: 'block', fontSize: '1rem'}}>
                    The 
                </span>

                    Adult Dyslexia
                    Screener

              </h2>
          </div>
      )}

        <footer className={st.ivviLogoContainer}>
                    <span className={st.bySpan}>by</span>
                    <figure className={st.logo}>
                        <Image src={logo} width={150} height={50} alt='logo' className={st.logoImage} />
                    </figure>
                </footer>

  
      <article className={st.card} id={st.cardOne}></article>
      <article className={st.card} id={st.cardTwo}></article>
      <article className={st.card} id={st.cardThree}></article>
      <article className={st.card} id={st.cardFour}></article>
  </article>


<section className={st.buttonSectionContainer}>

  <div  className={`${st.ctaContainer} `}>

    <div className={`${st.cta}`} onClick={handleYesClick} style={{cursor: 'pointer', fontSize: '2rem', letterSpacing: '1px'}} >
        Start Screener 

    </div>
  </div>

  
</section>
        </div>
      </div>
    );
} 