'use client'
import React from 'react'
import tp from '../Styles/TypeControls.module.css'; 
import { useUser } from '../lib/context/UserContext';
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';


function TypeControls() {
  
  
    const router = useRouter();
    const [user, setUser] = useState();
    const { setUserType } = useUser();
    
    const handleUserType = async (type) => {
        await setUserType(type);
        setUser(type);

        // Add a small delay before navigation
        setTimeout(() => {
            router.push('/details');
        }, 210);
    };

    useEffect(() => {
        console.log('User type updated:', user);
    }, [user]);

  
  
    return (

    <section className={tp.mainAnswerContainer}>
    <article className={tp.answerSection}>
        <div className={tp.buttonList}>

        <div className={tp.buttonStackContainer} onClick={() => handleUserType('adult')}>
        <div className={tp.button} id={tp.adult} onClick={() => handleUserType('adult')}>

            Adult

        </div>

        <div className={tp.buttonStack} id={tp.noStackOne}></div>
        <div className={tp.buttonStack} id={tp.noStackTwo}></div>
        <div className={tp.buttonStack} id={tp.noStackThree}></div>
        <div className={tp.buttonStack} id={tp.noStackFour}></div>
        <div className={tp.buttonStack} id={tp.noStackFive}></div>
        <div className={tp.buttonStack} id={tp.noStackSix}></div>

        </div>

      

        <div className={tp.buttonStackContainer} onClick={() => handleUserType('child')}>
        <div className={tp.button} id={tp.child} onClick={() => handleUserType('child')}>


            Child
            
        </div>

        <div className={tp.buttonStack} id={tp.yesStackOne}></div>
        <div className={tp.buttonStack} id={tp.yesStackTwo}></div>
        <div className={tp.buttonStack} id={tp.yesStackThree}></div>
        <div className={tp.buttonStack} id={tp.yesStackFour}></div>
        <div className={tp.buttonStack} id={tp.yesStackFive}></div>
        <div className={tp.buttonStack} id={tp.yesStackSix}></div>

        </div>
        </div>


    </article>
    </section>
  )
}

export default TypeControls