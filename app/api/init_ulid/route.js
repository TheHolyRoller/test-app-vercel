import { NextResponse } from "next/server";
import {generateULID} from '../../utils/generateULID'; 


export async function POST(req){

    console.log('this is the init ulid server route is it running \n'); 

    let generated_ulid; 
    const body = await req.json(); 
    console.log('this is the body of the request \n', body); 


    const {email} = body; 

    console.log('this is the user email from the ulid api route \n', email); 

    try{

        const response = await fetch('http://localhost:3000/api/fetchConsentRecords', {

            method: "POST", 
            headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify({email})
        })
        
        console.log('this is the response from the fetch consent records \n', response); 

        console.log('this is the status of the response in the init route from the fetch Consent Records API call::: \n', response.status); 

        if(response.status === 404){

            console.log('generating a ULID in the init ULID server router!!!!');
            generated_ulid = await generateULID(); 
            console.log('this is the newly generated ULID in the init ulid route \n', generated_ulid); 

        }

        else{
        
        console.log("could not find a 404 response extracting the ULID from the response \n"); 



        }

        const payload = {

            user_ulid: generated_ulid
        }

        console.log('this is the payload in the init ULID server route about to be sent back to fetch ip \n', payload); 


        
        return NextResponse.json({message: 'successfully extracted the ULID', payload}, {status: 200}); 
        
        
        
    }
    catch(error){

        console.error('could not query email from airtable \n', error); 
        return NextResponse.json({message: 'could not extract user ULID'}, {status: 500}); 

    }
}