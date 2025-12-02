import axios from "axios";
import { NextResponse } from "next/server";


// const baseULR = process.env.NEXT_PUBLIC_BASE_URL; 
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL 
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null)
    || 'http://localhost:3000';

    


export async function POST(req){

    
    const baseUrl = process.env.BASE_URL_PRODUCTION; 
    console.log('this is the set consent in cookies post server route::'); 

    try{


        const body = await req.json(); 
        console.log('this is the body of the request \n', body); 

        const {payload} = body; 
        console.log('this is the user data \n', payload); 

        const {email, name} = payload; 


        console.log('this is the email and name extracted from payload \n', email, name); 


        let emailConsent; 
        let resultConsent; 

        const emailPayload = {

            email: email
        }; 


        console.log('this is the payload being sent to fetch consent records \n', emailPayload); 
        console.log('this is the type of payload sent to fetch consent records \n', typeof emailPayload); 


        const response = await fetch(`${baseUrl}/api/fetchConsentRecords`, {

            method: "POST", 
            headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify({email})

        });
        
        console.log('this is the response from the fetch consent records api \n', response); 


        if(!response.ok){


            console.log('this is the response from the fetch consent records \n', response) ; 
            console.log('running the code in the response 404 block::!!!'); 


            resultConsent = false; 
            emailConsent = false; 


            const userData = {

                name, 
                email, 
                resultConsent, 
                emailConsent
            }


            console.log('this is the user data \n', userData); 
    
            const cookieData = encodeURIComponent(JSON.stringify(userData)); 
            console.log('this is the cookie data after it has been convreted to a strig and cookie safe format \n', cookieData); 
            


            const cookieResponse = NextResponse.json({mesage: 'successfully saved user details and consent details to persistent cookies'}, {status: 200}); 

            cookieResponse.cookies.set("user", cookieData, {
    
                path: '/', 
                maxAge: 84600, 
                sameSite: "Lax"
    
            }); 


            console.log('this is the cookie response in the set consent cookies \n', cookieResponse); 
    
            return cookieResponse; 

        }


        const consentData = await response.json(); 

        const { data } = consentData; 
        console.log('this is the data from the airtable database in set consent cookies route \n', data); 

        const { result_consent, email_consent} = data; 

        console.log('these are the consent vairables from airtable \n', result_consent, email_consent); 

        resultConsent = result_consent; 
        emailConsent = email_consent; 




        console.log('this is the updated email consent \n', emailConsent); 
        console.log('this is the updated result consent \n', resultConsent); 



        const userData = {

            name, 
            email, 
            resultConsent, 
            emailConsent

        }


        console.log('this is the user data in the default part of the set consent cookies route \n', userData); 


        const cookieData = encodeURIComponent(JSON.stringify(userData)); 
        console.log('this is the cookie data after it has been convreted to a strig and cookie safe format \n', cookieData); 

        const cookieResponse = NextResponse.json({mesage: 'successfully saved user details and consent details to persistent cookies'}, {status: 200}); 

        cookieResponse.cookies.set("user", cookieData, {

            path: '/', 
            maxAge: 84600, 
            sameSite: "Lax"

        }); 


        console.log('this is the cookie response in the default of set cookie data \n', cookieResponse); 


        return cookieResponse; 
        
    }
    catch(error){


        console.error("could not save user details to cookies \n", error); 

        return NextResponse.json({message: "Could not save user details to cookies"}, {status: 500}); 


    }





}