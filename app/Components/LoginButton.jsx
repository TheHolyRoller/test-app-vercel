'use client'; 
import {account} from '../lib/appwrite'; 

import React from 'react'; 

import ll from '../Styles/LoginButton.module.css'; 


function LoginButton() {


    console.log("this is the account object instance \n", account); 


    const handleGoogleLogin = async () => {

        const redirectULR = `${window.location.origin}/auth/callback`; 
        console.log('this is the redirect ULR \n', redirectULR);

        account.createOAuth2Session('google', redirectULR, redirectULR); 

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



    <div className={ll.buttonContainer}>

        <button className={ll.loginButton} onClick={() => handleGoogleLogin()}>

        {/* Add in the icon container here  */}
        <span>

        <Image src={''} quality={100} priority alt="google icon"></Image>

        </span>

        <div className={ll.buttonText}>

        Continue with Google 

        </div>


        </button>

    </div>

   </section>
   
   </>
  )
}

export default LoginButton  