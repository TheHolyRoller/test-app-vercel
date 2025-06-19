/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { useEffect } from "react";
import { createAnonymousSession } from '../appwrite'; 

export const useAnonymousAuth = async () => {

    // Add in the useEffect hook here 

    console.log('this is the anonymous auth function ')

    useEffect(() => {

        // Call the create auth function here 

        console.log('this is the create auth function being called in the useEffect hook in the use auth function \n', createAnonymousSession); 
        createAnonymousSession(); 

    }, [])

}