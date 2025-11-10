

import { NextResponse } from "next/server";
// import { databases, ID } from '@/app/lib/appwrite.server'; 
import { getDatabases, ID } from "@/app/lib/appwrite.server";
import { v4 as uuidv4 } from 'uuid';
const Airtable = require('airtable'); 


export async function POST(req){


        
        const ACCESS_TOKEN = process.env.CONSENT_PERSONAL_ACCESS_TOKEN; 
        const BASE_ID = process.env.CONSENT_BASE_ID;
        const TABLE_ID = process.env.CONTENT_TABLE_ID; 



            console.log('this is the create post request ')
            const base = new Airtable({apiKey: ACCESS_TOKEN}).base(BASE_ID); 
            console.log('this is the base from air table \n', base); 
            console.log("this is the request object \n", req);

            const userId = uuidv4();

            console.log('this is the user ID::::!!!!! \n', userId); 
            console.log('this is the type of user id \n', typeof userId); 


    try{


    const body = await req.json(); 
    console.log('this is the json ified request body \n', body); 

        
    // TO DO stringify these boolean values 
    const {resultChecked, checked, name, email } = body;
    
    const results_consent = JSON.stringify(resultChecked); 
    const email_consent = JSON.stringify(checked); 

    console.log('this is the results consent in string FORM \n', results_consent); 
    console.log("this is the email consent in string FORM \n", email_consent); 
    
    console.log('this is the type of results consent \n', typeof results_consent); 
    console.log('this is the type of email consent \n', typeof email_consent); 

    

    console.log('this is the result Checked \n', resultChecked); 
    console.log(`this is the checked state variable ${checked}`); 


    console.log('this is the name extracted from the body \n', name); 
    console.log('this is the email extracted from the body \n', email); 
    
    
    const forwardedFor = req.headers.get('x-forwarded-for'); 
    console.log(`this is the forwarded for object extracted from the header of the request using the .get() method using a string to search for its header ${forwardedFor}`); 



    const ip = forwardedFor?.split(',')[0]?.trim() || "IP not found";
    console.log(`this is the IP address ${ip}`); 

    const fields = { user_id: userId, name:name, email:email, IP_ADDRESS:ip, result_consent:results_consent, email_consent:email_consent }; 

    console.log('this is the payload \n', fields); 
    console.log('this is the type of payload \n', typeof fields); 

        const response = await base("Consent").create([{ fields }]);
        console.log('this is the response \n', response); 

    // return NextResponse.json({message: `Successfully Saved user IP address ${ip} this is the timestapm ${timestamp} ${response}`}, {status: 200}); 
    return NextResponse.json({
        message: `Successfully saved user IP`,
        ip,
        document: response
        }, { status: 200 });


    }

       catch(error){
        console.log(`could not extract IP in fetch IP Route:::::!!! ${error}`);
        return NextResponse.json({message: 'Could not extract IP address'}, {status: 500}); 

    }

    }