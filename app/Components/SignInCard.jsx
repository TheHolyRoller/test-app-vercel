'use client';
import React from 'react';
import si from '../Styles/SignInCard.module.css';
import { nunito } from '../fonts/nunito';
import { useQuiz } from '../lib/context/QuizContext';
import { usePathname } from 'next/navigation';
import LoginButton from '../Components/LoginButton'; 
import {account} from '../lib/appwrite'; 
import { useState } from 'react';


import Image from 'next/image'; 
import profile from '../assets/profile.svg'; 


function SignInCard() {





    return (
        
        <>  
            <article 
                className={`${si.card} ${nunito.className}`} 
                id={si.firstCARD} 
                style={{
                    position: 'relative',
                    zIndex: 200,
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08)',
                    }}>

                      <div 
                className={si.cardCategoryColorContainer} 
                style={{
                    backgroundColor: "#012973",    
                    boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1), -2px 0 8px rgba(0, 0, 0, 0.1), 2px 0 8px rgba(0, 0, 0, 0.1)', 
                }}
            >


                <div className={`${si.categoryLabelContainer} ${nunito.className}`} >
                    <label className={`${si.categoryLabel} ${nunito.className}`}>


                        <div className={`${si.labelContainer} ${nunito.className}`} style={{backgroundColor: '#033699'}}>

                            <div className={si.cardLabelText}>

                                Login

                            </div>

                        <div className={si.soundIconContainer} >


                                <div className={si.iconBackground}>

                                        <Image src={profile} alt="profile" quality={100} priority /> 

                                </div>

                        </div>

                        </div>
                    </label>
                </div>
            </div>

                <article className={si.mainLogoContainer}>
                    {/* Add in the Logo container here  */}
                    <div className={si.logoContainer}>
                        <h1 className={si.categoryMainHeader}> 

                        Enter your name and email to verify your identity
                        </h1>
                      
                    </div>
                </article>


                {/* Add in the Continue with Google Button here  */}
                <section className={si.mainSignInContainer}>

                <LoginButton/> 

                </section>

                <article className={si.card}  id={si.cardOne}></article>
                <article className={si.card}  id={si.cardTwo}></article>
                <article className={si.card}  id={si.cardThree}></article>
                <article className={si.card}  id={si.cardFour}></article>
            </article>

        </>
    )
}

export default SignInCard 