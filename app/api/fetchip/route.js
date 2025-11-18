

import { NextResponse } from "next/server";
// import { databases, ID } from '@/app/lib/appwrite.server'; 
import { getDatabases, ID } from "@/app/lib/appwrite.server";
// import { v4 as uuidv4 } from 'uuid';
import { ulid } from "ulid";
const Airtable = require('airtable'); 


// NOTE: This is the consent capture route 
export async function POST(req){


        // TODO refactor for support@ivvi airable creds 
        const ACCESS_TOKEN = process.env.IVVI_SUPPORT_AIRTABLE_PA_TOKEN; 
        const BASE_ID = process.env.IVVI_SUPPORT_CONSENT_BASE_ID;
        const TABLE_ID = process.env.IVVI_SUPPORT_CONSENT_TABLE_ID; 

            console.log('this is the create post request ')
            const base = new Airtable({apiKey: ACCESS_TOKEN}).base(BASE_ID); 
            console.log('this is the base from air table \n', base); 
            console.log("this is the request object \n", req);
            let data; 
            let user_email; 

    
            try{


        
                 data = await req.json(); 
                 console.log('this is the data extract from the request \n', data); 
                //  Now extract the email from the data 
               const {email} = data; 
                user_email = email; 


            }
            catch(error){

                console.error('could not extract data! \n', error); 
                return NextResponse.json({message: 'failure to extract data'}, {status: 500}); 


            }


            // TODO Extract the user's email from the request body here 
            


            // TODO Abstract this away to a utility function. 
            // const userId = uuidv4();
            // TODO Call the inti_ULID api roture here 
            const userId = ulid();
            // That API will then take the user email and search the airtable database for it. 
            // If none is found then the utility function is called and the ULID is returned in the response 
            const response = await axios.post('/api/init_ulid', {email: user_email}); 

            console.log('this is the response from the route that checks for an existing email \n', response); 


            // Extract the UILD from the response here 
            

            // Assign it to the userId here 

            // TODO extract the consent flags form the request body here 



            // TODO extract the isDirtyAndFalse flag here 
            


            // TODO check if isDirty flag is true and if so take the user details and call the updated consent api route here 
            
            

            // TODO workout how to tell the difference between the isDirty flags and email and result consent 




            // TODO Take the user name email address and 



            // TODO extract the user consent status from the request body 



            // TODO if the consent is correct then update the user records database 




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