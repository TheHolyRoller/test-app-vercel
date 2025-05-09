'use client'
import l from '../Styles/LongButtons.module.css'; 
import { useState } from 'react';

export default function(){

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

    return (
        <>
        <section className={l.mainAnswerContainer}>
            <article className={l.answerSection}>
                <div className={l.buttonList}>
                    <div className={l.buttonStackContainer}>
                        <div className={l.button} id={l.noButton} onClick={() => increment('noNum')}>
                            {counters.noNum > 0 && (
                                <span className={l.numSpan}>
                                    {counters.noNum}
                                </span>
                            )}
                            No 
                        </div>
                        <div className={l.buttonStack} id={l.noStackOne}></div>
                        <div className={l.buttonStack} id={l.noStackTwo}></div>
                        <div className={l.buttonStack} id={l.noStackThree}></div>
                        <div className={l.buttonStack} id={l.noStackFour}></div>
                        <div className={l.buttonStack} id={l.noStackFive}></div>
                        <div className={l.buttonStack} id={l.noStackSix}></div>
                    </div>

                    <div className={l.buttonStackContainer}>
                        <div className={l.button} id={l.sometimesButton} onClick={() => increment('sometimesNum')}>
                            {counters.sometimesNum > 0 && (
                                <span className={l.numSpan}>
                                    {counters.sometimesNum}
                                </span>
                            )}
                            Some<br />times 
                        </div>
                        <div className={l.buttonStack} id={l.sometimesStackOne}></div>
                        <div className={l.buttonStack} id={l.sometimesStackTwo}></div>
                        <div className={l.buttonStack} id={l.sometimesStackThree}></div>
                        <div className={l.buttonStack} id={l.sometimesStackFour}></div>
                        <div className={l.buttonStack} id={l.sometimesStackFive}></div>
                        <div className={l.buttonStack} id={l.sometimesStackSix}></div>
                    </div>

                    <div className={l.buttonStackContainer}>
                        <div className={l.button} id={l.yesButton} onClick={() => increment('yesNum')}>
                            {counters.yesNum > 0 && (
                                <span className={l.numSpan}>
                                    {counters.yesNum}
                                </span>
                            )}
                            Yes 
                        </div>
                        <div className={l.buttonStack} id={l.yesStackOne}></div>
                        <div className={l.buttonStack} id={l.yesStackTwo}></div>
                        <div className={l.buttonStack} id={l.yesStackThree}></div>
                        <div className={l.buttonStack} id={l.yesStackFour}></div>
                        <div className={l.buttonStack} id={l.yesStackFive}></div>
                        <div className={l.buttonStack} id={l.yesStackSix}></div>
                    </div>
                </div>
            </article>
        </section>
        </>
    )
}
