

import { NextResponse } from "next/server";
import { databases, ID } from '@/app/lib/appwrite.server'; 

export async function POST(req){


    // Create the client instance here 

    console.log('this is the databases import in the fetch ip server route \n', databases); 


    const db = process.env.APPWRITE_DATABASE_ID; 
    const table = process.env.APPWRITE_TABLE_ID; 
    const project = process.env.APPWRITE_PROJECT_ID; 


    console.log('this is the db \n', db); 
    console.log('this is the table id \n', table); 
    console.log('this is the project id \n', project); 



    // Extract the IP from the request headers here 
    try{


    const body = await req.json(); 
    console.log('this is the json ified request body \n', body); 

    
    const {resultChecked, checked, name, email } = await body; 

    console.log('this is the result Checked \n', resultChecked); 
    console.log(`this is the checked state variable ${checked}`); 


    console.log('this is the name extracted from the body \n', name); 
    console.log('this is the email extracted from the body \n', email); 
    
    
    const forwardedFor = req.headers.get('x-forwarded-for'); 
    console.log(`this is the forwarded for object extracted from the header of the request using the .get() method using a string to search for its header ${forwardedFor}`); 

    // Extract the ip address from the forwarded for object 
    const ip = forwardedFor ? forwardedFor.split(',')[0] : 
    req.ip ?? "no IP found";
    console.log(`this is the IP address ${ip}`); 


    // Collect the timestamp here 
    const timestamp = new Date().toISOString(); 
    console.log(`this is the timestamp ${timestamp}`); 


    const data = {Name:name, email:email, IP_ADDRESS:ip, result_consent:resultChecked, email_consent:checked }; 

    console.log('this is the payload \n', data); 
    console.log('this is the type of payload \n', typeof data); 


    // Save the user details to the appwrite database here 
        const response = await databases.createDocument({
        databaseId: db,
        collectionId: table,
        documentId: ID.unique(),
        data: data,
        });


    console.log('this is the response \n', response); 


    return NextResponse.json({message: `Successfully Saved user IP address ${ip} this is the timestapm ${timestamp} ${response}`}, {status: 200}); 

    }

       catch(error){

        console.log(`could not extract IP in fetch IP Route:::::!!! ${error}`);

        return NextResponse.json({message: 'Could not extract IP address'}, {status: 500}); 

    }


}