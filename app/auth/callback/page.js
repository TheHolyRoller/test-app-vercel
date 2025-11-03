'use client'; 
import React from 'react'
import { useEffect } from 'react';
import { account } from '../../lib/appwrite'; 
import { useRouter } from 'next/navigation';

export default function CallbackPage() {


    const router = useRouter(); 
    console.log('this is the route instance \n', router); 
    console.log('this is the type of the router instance \n', typeof router); 


    // Add in the use Effect hook here to check for a valid user session on component mount once 


    useEffect(() => {

        console.log('this is the callback success url from the success url callback'); 

        (async () => {


            try{


            const user = await account.get(); 
            console.log('this is the fetched user session \n', user); 
            router.replace('/profile'); 
            
            }

            catch(error){


                console.error('could not find user session \n', error); 
                router.replace('/login');


            }


        // We inclused there parenthesis here to call the anonyomous immediately invoked asynchronous arrow function expression 
        })(); 



    }, [router]); 


  return (
    <div>

        <p>

        ...Verifying you login session 
        
        
        </p>
        </div>
  )
}

