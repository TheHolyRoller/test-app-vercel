import { NextResponse } from "next/server";
import {generateULID} from '../../utils/generateULID'; 


export async function POST(req){

    console.log('this is the init ulid server route is it running \n'); 
    const baseUrl = process.env.BASE_URL_PRODUCTION || "http://localhost:3000"; 


    let generated_ulid; 
    const body = await req.json(); 
    console.log('this is the body of the request \n', body); 


    const {email} = body; 

    console.log('this is the user email from the ulid api route \n', email); 

    console.log(` this is the full ulr \n ${baseUrl}/api/fetchConsentRecords`)

    try{

        const response = await fetch(`${baseUrl}/api/fetchConsentRecords`, {

            method: "POST", 
            headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify({email})
        })
        
        console.log('this is the response from the fetch consent records \n', response); 

        console.log('this is the status of the response in the init route from the fetch Consent Records API call::: \n', response.status); 


        if(response.status === 404){

            console.log('the response is 404  generating a new ULID \n', response.status); 
            console.log('generating a ULID in the init ULID server router!!!!');
            generated_ulid = await generateULID(); 
            console.log('this is the newly generated ULID in the init ulid route \n', generated_ulid); 

        }

        else{
        
        console.log("could not find a 404 response extracting the ULID from the response \n"); 
        const body = await response.json(); 
        
        console.log('this is the body of the response from the fetch consent records route \n', body); 

        const { data } = body; 


        console.log('data from the request body \n', data); 
        console.log('this is the type of data \n', typeof data); 
        
        const {user_id} = data; 
        console.log('this is the user id \n', user_id);
        console.log('this is the type of user id \n', typeof user_id); 

        generated_ulid = user_id; 
        
        console.log('this is the latest updted generated ulid \n', generated_ulid); 
        console.log('this is the type of genreated ulid \n', typeof generated_ulid); 


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