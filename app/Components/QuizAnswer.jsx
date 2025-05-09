'use client'
import a from '../Styles/Answer.module.css'; 
import { useState } from 'react';

export const QuizAnswer = () => {

    const [counters, setCounter] = useState({

        yesNum: 0, 
        noNum: 0, 
        sometimesNum: 0 
    }); 


    const increment = (name) => {

        setCounter(prev => ({

            ...prev, 
            [name]: prev[name] + 1

        })); 

    }


    return(

        <>

        <section className={a.mainAnswerContainer} >
        <article className={a.answerSection}>
            <div className={a.buttonList}>

            <div className={a.buttonStackContainer}>

            <div className={a.button} id={a.noButton} onClick={() => increment('noNum')} >
             {counters.noNum > 0 && (

                <span className={a.numSpan}>
                {counters.noNum}
                </span>

            )}


                No 

            </div>

            <div className={a.buttonStack} id={a.noStackOne}></div>
            <div className={a.buttonStack} id={a.noStackTwo}></div>
            <div className={a.buttonStack} id={a.noStackThree}></div>
            <div className={a.buttonStack} id={a.noStackFour}></div>
            <div className={a.buttonStack} id={a.noStackFive}></div>
            <div className={a.buttonStack} id={a.noStackSix}></div>

            </div>

            <div className={a.buttonStackContainer}>

            <div className={a.button} id={a.sometimesButton} onClick={() => increment('sometimesNum')} >
             {counters.sometimesNum > 0 && (

                <span className={a.numSpan}>
                {counters.sometimesNum}
                </span>


            )}

                Some 
                times 

            </div>

            <div className={a.buttonStack} id={a.sometimesStackOne}></div>
            <div className={a.buttonStack} id={a.sometimesStackTwo}></div>
            <div className={a.buttonStack} id={a.sometimesStackThree}></div>
            <div className={a.buttonStack} id={a.sometimesStackFour}></div>
            <div className={a.buttonStack} id={a.sometimesStackFive}></div>
            <div className={a.buttonStack} id={a.sometimesStackSix}></div>

            </div>

            <div className={a.buttonStackContainer}>

            <div className={a.button} id={a.yesButton} onClick={() => increment('yesNum')}>

             {counters.yesNum > 0 && (

                <span className={a.numSpan}>
                {counters.yesNum}
                </span>

            )}

                Yes 
            </div>

            <div className={a.buttonStack} id={a.yesStackOne}></div>
            <div className={a.buttonStack} id={a.yesStackTwo}></div>
            <div className={a.buttonStack} id={a.yesStackThree}></div>
            <div className={a.buttonStack} id={a.yesStackFour}></div>
            <div className={a.buttonStack} id={a.yesStackFive}></div>
            <div className={a.buttonStack} id={a.yesStackSix}></div>

            </div>
            </div>


        </article>
        </section>

            
        </>
    )

}