'use client';

import React, { useState, useEffect } from 'react';
import nf from './Styles/notFound.module.css'; 


import compass from './assets/compass.svg'; 
import puddle from './assets/Puddle.png';
import trash from './assets/Trash_Can.png'; 
import splash from './assets/Splashes.png'; 



import { nunito } from './fonts/nunito';
import Image from 'next/image';
import Link from 'next/link';

const Unsubscribe = () => {


  const question_text = "...oops it looks like you took a wrong turn";  
  const currentQuestion = { question_text: "" };

  return (
    
        <>
          <article 
            className={`${nf.card} ${nunito.className}`} 
            id={nf.firstCARD}
            style={{
              backgroundColor: 'blue',
              position: 'relative',
              zIndex: 200,
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08)',
            }}
          >

            {/* 🔵 TOP BLUE PROF ILE SECTION */}
            <div 
              className={nf.cardCategoryColorContainer}
              style={{
                backgroundColor: "#012973",
                boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1), -2px 0 8px rgba(0, 0, 0, 0.1), 2px 0 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div className={`${nf.categoryLabelContainer} ${nunito.className}`}>
                <label className={`${nf.categoryLabel} ${nunito.className}`}>
                  <div className={`${nf.labelContainer} ${nunito.className}`} style={{backgroundColor: '#033699'}}>
                    <div className={nf.cardLabelText}>Nothing found...</div>
                    <div className={nf.soundIconContainer}>
                      <div className={nf.iconBackground}>
                        <Image className={nf.icon} src={compass} alt="compass" width={28} height={28} quality={100}/>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>



            {/* Add in the main image section container here  */}
            <section className={nf.mainImageSectionContainer}>
            <section className={nf.mainImageSectionSubContainer}>

              <div className={nf.puddleContainer}>

              <Image className={nf.puddle} src={puddle} alt='puddle' quality={100} priority/> 
              </div>

              <div  className={nf.trashCotnainer}>

              <Image className={nf.trash} src={trash} alt="trash" priority quality={100} /> 



              </div>

              {/* <div className={nf.splashContainer}>

              <Image className={nf.splash} src={splash} alt='splash' priority quality={100} /> 

              </div> */}


            </section>
            </section>

              {/* Question text section  */}
            <div 
              className={`${nf.question_textContainer} ${nunito.className}`} 
            >
              <h2 className={`${nf.question_text} ${nunito.className}`}>
                {question_text}
                <span>{currentQuestion?.question_text}</span>
              </h2>
            </div>



            {/* Background stacked cards */}
            <article className={nf.card} id={nf.cardOne}></article>
            <article className={nf.card} id={nf.cardTwo}></article>
            <article className={nf.card} id={nf.cardThree}></article>
            <article className={nf.card} id={nf.cardFour}></article>

          </article>

          <section className={nf.buttonSectionContainer} style={{cursor: 'pointer'}}>
            <div className={nf.ctaContainer}>
              <div className={nf.cta} style={{fontSize: '2rem', letterSpacing: '1px'}}>
                Go Home
              </div>
            </div>
          </section>
        </>
    
  );
};

export default Unsubscribe;
