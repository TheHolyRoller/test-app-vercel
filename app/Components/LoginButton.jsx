'use client'; 
import {account} from '../lib/appwrite'; 

import React from 'react'; 

import ll from '../Styles/LoginButton.module.css'; 
import google from '../assets/Google.svg'; 
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { setConstantValue } from 'typescript';


function LoginButton() {
    
    
    const [isLoading, setIsLoading] = useState(); 
    const [email, setEmail] = useState(''); 


    console.log("this is the account object instance \n", account); 


    useEffect(() => {
    
        console.log('this is the email input in the login button comoponent \n', email); 

    }, [email])


    const handleLogin = async (e) => {


        e.preventDefault(); 

        setIsLoading("Logging you in....."); 

        try{

         await account.createMagicURLSession({
            email,
            url: `${window.location.origin}/auth/callback`,
});

            console.log('this is the response from the email login \n', response); 
            setIsLoading('check your email for magic link!'); 
            alert('check email for magic link!'); 



        }
        catch(error){

            console.error('could not login \n', error); 
            setIsLoading(error); 
            alert('could not log user in! \n', error);

        }


    }


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
    <form onSubmit={handleLogin}>
        <input type='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} ></input>
        <button type='submit'>

            Continue 

        </button>


    </form>

   

   </section>
   
   </>
  )
}

export default LoginButton  