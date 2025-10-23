

import { NextResponse, NextRequest } from "next/server";
import axios from 'axios'; 
import { databases } from "@/app/lib/appwrite";


export async function POST(req){


    const db = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID; 
    const table = process.env.NEXT_PUBLIC_APPWRITE_QUESTION_COLLECTION_ID; 
    const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID; 

    console.log('this is the db \n', db); 
    console.log('this is the table id \n', table); 
    console.log('this is the project id \n', project); 



    // Extract the IP from the request headers here 
    try{


    const body = req.json(); 
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


    const payload = { Name:name, email:email, IP_ADDRESS:ip}; 
    console.log('this is the payload \n', payload); 
    console.log('this is the type of payload \n', typeof payload); 

    // Save the user details to the appwrite database here 
    // const response = await databases.createDocument(

    //     db, 
    //     table, 
    //     "unique()", 
    //     payload
    // ); 









    return NextResponse.json({message: `Successfully Saved user IP address ${ip} this is the timestapm ${timestamp}`}, {status: 200}); 


    }

       catch(error){

        console.log(`could not extract IP ${error}`);

        return NextResponse.json({message: 'Could not extract IP address'}, {status: 404}); 

    }


}