
// Import the next response here 

import { NextResponse } from "next/server";

// Imoprt Axios here 
import axios from "axios";


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

    const body = req.json(); 
    console.log('this is the body of the request \n', body); 

    // Extract the user's email address here 

    const { email } = body; 
    console.log('this is the user email from the ulid api route \n', email); 



    try{


        // Query the airtable Database for that email address here 
        // Use the fetchConsent records route here 
        

        
        // If there is one extract the user's ULID here 
        
        

        // If none was found call the utility function here 


        // Return the ULID in the response here 



        
        
        
    }
    catch(error){

        console.error('could not query email from airtable \n', error); 

    }

    


}




















