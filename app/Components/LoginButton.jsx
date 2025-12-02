'use client'; 
import React from 'react'; 
import ll from '../Styles/LoginButton.module.css'; 
import google from '../assets/Google.svg'; 
import { account, ID } from '../lib/appwrite';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { setConstantValue } from 'typescript';
import axios from 'axios';

function LoginButton() {
    
    console.log('this is the login button component')
    
    const [isLoading, setIsLoading] = useState(); 
    const [email, setEmail] = useState(''); 
    const [name, setName] = useState(''); 


    console.log("this is the account object instance \n", account);
    console.log("Available methods on account:", Object.keys(account));


    useEffect(() => {
    
        console.log('this is the email input in the login button comoponent \n', email); 

    }, [email]); 
    useEffect(() => {

        console.log('this is the is loading status \n', isLoading); 

    }, [isLoading])



    const handleLogin = async (e) => {
      e.preventDefault();
      setIsLoading("Logging you in...");
      try {
        const currentURL = `${window.location.origin}/auth/callback`; 
        console.log(`this is the callback url ${currentURL}`);
        
        // Create magic link
        const response = await account.createMagicURLToken({
          userId: ID.unique(),
          email: email,
          name: name,
          url: currentURL
        });
        
        // ✅ FIXED: Send payload directly, not nested
        const payload = {
          email: email, 
          name: name, 
        };
        
        const consentResponse = await axios.post('/api/set_consent_in_cookies', payload);
        
        console.log('✅ Magic link sent:', consentResponse);
        setIsLoading('Check your email for the magic link!');
        alert('Check your email for the magic link!');
      } catch (error) {
        console.error('❌ Could not login:', error);
        setIsLoading('Error logging in');
        console.log(`this is the callback url ${currentURL}`);
        alert(`Could not log user in! ${error.message}`);


        

      }
    };


  return (
   <>
   
   <section className={ll.loginSectionContainer}>

    {/* Add in the text cotnainer here  */}
    <div className={ll.loginTextContainer}>

    
    <span className={ll.loginSupportingText}>

        Sign in or Sign up 

    </span>

    </div>
    

        {/* Add in the form section here  */}
    <form className={ll.loginForm}   onSubmit={handleLogin}>
        <input  className={ll.nameInput}  type='name' placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
        <input   className={ll.emailInput} type='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
       
        <button className={ll.continueButton}  type='submit'>

            Continue 

        </button>

    </form>
   </section>
   
   </>
  )
}

export default LoginButton  