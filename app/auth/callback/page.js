'use client'; 
import React from 'react'
import { useEffect, useState } from 'react';
import { account } from '../../lib/appwrite'; 
import { useRouter, useSearchParams } from 'next/navigation';

export default function CallbackPage() {

    const router = useRouter(); 
    const searchParams = useSearchParams();
    console.log('this is the search params object \n', searchParams);  
    console.log('this is the route instance \n', router); 
    console.log('this is the type of the router instance \n', typeof router); 

    const [status, setStatus] = useState('Verifying...'); 



    // Add in the useEffect hook that will run on mount and extract the necessary info from the url params and verify that there is a valid user session login and redirect the user to the profile page
    // if there is no valid session it will redirect them to the login page and throw an error. 

    useEffect(() => {


        // Extract the user id and the user secret from the params here 

        const userId = searchParams.get('userId'); 
        console.log('this is the extracted user ID from the search params using the userId string \n', userId); 
        
        const secret = searchParams.get('secret'); 

        console.log('this is the user secret extracted from the search params \n', secret); 



        if(!userId || !secret){

            setStatus('user ID invalid'); 
            return; 

        }

        // Since now error was found and userId and secret are defined then call the appwrite update api to check if the user id and secret are valid 

        const promise = account.updateMagicURLSession(userId, secret).then(() => router.push('/profile')).catch((err) => setStatus('invalid login credentials')); 

        console.log('this is the promise from updating the appwrite magic url session with the user credentials \n', promise); 


    }, [router, searchParams]);







  return (
    <div>

        <p>

        ...Verifying you login session 
        
        </p>
        </div>
  )
}

