'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import un from '../Styles/Unsubscribe.module.css'; 
import { nunito } from '../fonts/nunito';
import profile from '../assets/profile.svg'; 


import Link from 'next/link';

const Unsubscribe = () => {
  const [unsubscribe, setUnsubscribe] = useState(false);
    
  const searchParams = useSearchParams(); 

    const email = searchParams.get("email"); 
    console.log('this is the email extracted from the params \n', email); 
    console.log('this is the type of email extracted from the params \n', typeof email);


  if (!email) {
    console.error('No email found in the URL!');
  }

  const unsubscribeUser = async () => {

    try {

      const response = await axios.post('/api/unsubscribe', { email });
      console.log('this is the simple response from the api route call \n', response);

      console.log('Response from server:', response.data);
      setUnsubscribe(true); // mark as unsubscribed
    } catch (error) {
      console.error('Failed to unsubscribe:', error);
    }
  };

  useEffect(() => {
    console.log('unsubscribe state changed:', unsubscribe);
  }, [unsubscribe]);

  return (
    <>


      {/* TODO Add all this onto Card  */}
        {!unsubscribe ? (

            <>
              <div style={{color: 'black', position: 'relative', zIndex: '99999', outline: '0px solid red'}} >Are you sure you want to unsubscribe?</div>

      <div style={{cursor: 'pointer'}} >
        <button onClick={unsubscribeUser} style={{color: 'black', position: 'relative', zIndex: '99999', outline: '0px solid red'}}>Yes</button>
      </div>

      <div style={{color: 'black', position: 'relative', zIndex: '99999', outline: '0px solid red'}}>
        <Link href="/" prefetch={true} replace={false} aria-label="Go home">
          No, take me back
        </Link>
      </div>
            </>

        )
    
        : (

            <>

            <article 
                className={`${un.card} ${nunito.className}`} 
                id={un.firstCARD} 
                style={{
                    backgroundcolor: 'blue',
                    position: 'relative',
                    zIndex: 200,
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08)',

                    }}>



                      <div 
                className={un.cardCategoryColorContainer} 
                style={{
                    backgroundColor: "#012973",    
                    boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1), -2px 0 8px rgba(0, 0, 0, 0.1), 2px 0 8px rgba(0, 0, 0, 0.1)', 
                }}
            >
                
            </div>

                <article className={un.card}  id={un.cardOne}></article>
                <article className={un.card}  id={un.cardTwo}></article>
                <article className={un.card}  id={un.cardThree}></article>
                <article className={un.card}  id={un.cardFour}></article>
            </article> 


                   <section className={un.buttonSectionContainer} style={{cursor: 'pointer'}}>

  <div className={un.ctaContainer} style={{cursor: 'pointer'}} >

    <div className={un.cta}  style={{cursor: 'pointer', fontSize: '2rem', letterSpacing: '1px'}} >
        Confirm

    </div>

  </div>
  
</section>

</>

            


        )
    
    
    }

    </>
  );
};

export default Unsubscribe;
