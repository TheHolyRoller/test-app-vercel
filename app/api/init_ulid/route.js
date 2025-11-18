
// Import the next response here 

import { NextResponse } from "next/server";

// Imoprt Axios here 
import axios from "axios";
import {generateULID} from '../../utils/generateULID'; 


// Import the utility function here 


/**
 * 
 * Okay so with this function I want to extract the email from the request and I want to 
 * 
 * 
 * 
 * 
 */


export async function POST(req){


    // Add in the environment variables here 
    // These will the the consent support airtable records. 
    let ulid; 
    const body = await req.json(); 
    console.log('this is the body of the request \n', body); 

    // Extract the user's email address here 

    const { email } = body; 
    console.log('this is the user email from the ulid api route \n', email); 



    try{


        // Query the airtable Database for that email address here 
       
       
       
       
    // TODO Call the fetch consent records api route here 
        // Use the fetchConsent records route here 
        // Add in the user email here
        
        // Refactor this to use fetch instead of axios 
        // const response = await axios.post('http://localhost:3000/api/fetchConsentRecords', {email: email});
        const response = await fetch('http://localhost:3000/api/fetchConsentRecords', {

            method: "POST", 
            headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify({email})
        })
        
        console.log('this is the response from the fetch consent records \n', response); 

        
        // If there is one extract the user's ULID here 
        // Just check the response status and add in the rest of the logic in the else statement if it's anything but 404 
        console.log('this is the status of the response \n', response.status); 

        if(response.status === 404){


            ulid = generateULID(); 

        }

        else{
        

        // parse throuh the response and extract it's ulid 



        }

        const payload = {

            ulid: ulid
        }


        
        return NextResponse.json({message: 'successfully extracted the ULID', payload}, {status: 200}); 
        
        
        
    }
    catch(error){

        console.error('could not query email from airtable \n', error); 
        return NextResponse.json({message: 'could not extract user ULID'}, {status: 500}); 

    }
}