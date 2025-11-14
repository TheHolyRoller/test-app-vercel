'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

import Link from 'next/link';

const Unsubscribe = () => {
  const [unsubscribe, setUnsubscribe] = useState(false);
    
  const searchParams = useSearchParams(); 

 
//   const email = 'danielwakeley7@gmail.com'; 
// const email = params.email; 


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

            <div style={{color: 'black', position: 'relative', zIndex: '99999', outline: '2px solid red'}} >Confirmed! You are now unsubscribed</div>


        )
    
    
    }

        

      



    </>
  );
};

export default Unsubscribe;
