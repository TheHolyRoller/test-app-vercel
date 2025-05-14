'use client'
import p from '../Styles/Permission.module.css';


// Add in the context imports here 
import { useQuiz } from '../lib/context/QuizContext';
import { useUser } from '../lib/context/UserContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


export const PermissionAnswer = () => {

 const router = useRouter();
    const { finalScore } = useQuiz();
    const { name } = useUser();

    const handleYesClick = () => {
        router.push('/email-signup');
    };

    const handleNoClick = () => {
        router.push('/');
    };

    return(

        <>

        <section className={p.mainAnswerContainer} >
        <article className={p.answerSection}>
            <div className={p.buttonList}>

            <div className={p.buttonStackContainer} onClick={handleNoClick}>

            <div className={p.button} id={p.noButton}>
          
                No 

            </div>

            <div className={p.buttonStack} id={p.noStackOne}></div>
            <div className={p.buttonStack} id={p.noStackTwo}></div>
            <div className={p.buttonStack} id={p.noStackThree}></div>
            <div className={p.buttonStack} id={p.noStackFour}></div>
            <div className={p.buttonStack} id={p.noStackFive}></div>
            <div className={p.buttonStack} id={p.noStackSix}></div>

            </div>

            

            <div className={p.buttonStackContainer} onClick={handleYesClick}>

            <div className={p.button} id={p.yesButton}>

                Yes 
            </div>

            <div className={p.buttonStack} id={p.yesStackOne}></div>
            <div className={p.buttonStack} id={p.yesStackTwo}></div>
            <div className={p.buttonStack} id={p.yesStackThree}></div>
            <div className={p.buttonStack} id={p.yesStackFour}></div>
            <div className={p.buttonStack} id={p.yesStackFive}></div>
            <div className={p.buttonStack} id={p.yesStackSix}></div>

            </div>
            </div>


        </article>
        </section>

            
        </>
    )

}