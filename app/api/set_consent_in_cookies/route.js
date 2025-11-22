import { NextResponse } from "next/server";


export async function POST(req){


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


        // Add in a timeout promise here 


        const emailPayload = {

            email: email
        }; 

        console.log('this is the payload being sent to fetch consent records \n', emailPayload); 
        console.log('this is the type of payload sent to fetch consent records \n', typeof emailPayload); 


        // Call the api here 
        const response = await fetch("http://localhost:3000/fetchConsentRecords", {

            method: "POST", 
            headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify({email})

        }); 

        if(!response.ok){


            console.log('this is the response from the fetch consent records \n', response) ; 
            console.log('running the code in the response 404 block::!!!'); 



            // Run the code that sets the email and result consent variables to false here 

            // Set the variables here 
            resultConsent = false; 
            emailConsent = false; 


            // Add in the timeout promise here if necessary 


            const userData = {

                name, 
                email, 
                resultConsent, 
                emailConsent
            }
    
    
    
            // create the cookie encodable value here 
    
            const cookieData = encodeURIComponent(JSON.stringify(userData)); 
            console.log('this is the cookie data after it has been convreted to a strig and cookie safe format \n', cookieData); 
            


            const cookieResponse = NextResponse.json({mesage: 'successfully saved user details and consent details to persistent cookies'}, {status: 200}); 

            cookieResponse.cookies.set("user", cookieData, {
    
                path: '/', 
                maxAge: 84600, 
                sameSite: "Lax"
    
            }); 
    
            return cookieResponse; 

        }


        // Extract the details from the response here 

        const data = await response.json(); 

        console.log('this is the data from the airtable database \n', data); 
        // Now extract the consent values
        const { result_consent, email_consent} = data; 

        console.log('these are the consent vairables from airtable \n', result_consent, email_consent); 

        resultConsent = result_consent; 
        emailConsent = email_consent; 

        console.log('this is the updated email consent \n', emailConsent); 
        console.log('this is the updated result consent \n', resultConsent); 


        // Save the name, email and consent variables to persisten cookies here 
        // Create the cookie payload here 
        const userData = {

            name, 
            email, 
            resultConsent, 
            emailConsent
        }



        // create the cookie encodable value here 

        const cookieData = encodeURIComponent(JSON.stringify(userData)); 
        console.log('this is the cookie data after it has been convreted to a strig and cookie safe format \n', cookieData); 



        // Refactor this to work on the server 



        // Set it to a next response so that you can give it the properties of a response. That way you can alter certain key properties including the cookies of the HTTP response 
        const cookieResponse = NextResponse.json({mesage: 'successfully saved user details and consent details to persistent cookies'}, {status: 200}); 

        cookieResponse.cookies.set("user", cookieData, {

            path: '/', 
            maxAge: 84600, 
            sameSite: "Lax"

        }); 



        // return the cookie response here 

        return cookieResponse; 
        
    }
    catch(error){


        console.error("could not save user details to cookies \n", error); 

        return NextResponse.json({message: "Could not save user details to cookies"}, {status: 500}); 


    }





}