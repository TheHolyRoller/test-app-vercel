
import { NextResponse } from "next/server";
const Airtable = require("airtable");



export async function POST(req){

  console.log('this is the capture consent status api route::::::::'); 

    // Add in the Airtable Credentials here 
    const ACCESS_TOKEN = process.env.IVVI_SUPPORT_AIRTABLE_PA_TOKEN;
    const BASE_ID = process.env.IVVI_SUPPORT_CONSENT_BASE_ID;
    const base = new Airtable({ apiKey: ACCESS_TOKEN }).base(BASE_ID);

    const TABLE_ID = process.env.IVVI_SUPPORT_CONSENT_TABLE_ID; 

    console.log('this is the TABLE_ID \n', TABLE_ID); 
    console.log('this is the type of table ID \n', typeof TABLE_ID); 


    // Log out the credentails here 

    console.log('This is the access token \n', ACCESS_TOKEN); 
    console.log('this is the base id \n', BASE_ID); 
    console.log('this is the base \n', base); 
    console.log('this is the type of the Acess token in capture consent status api route:::::: \n', typeof ACCESS_TOKEN); 
    console.log('this is the type of base id \n', typeof BASE_ID); 
    console.log("this is the type of base \n", typeof base); 


    try{


        const body = await req.json(); 
        console.log('this is the body of the request in the capture consent status route:::  \n', body); 

        // Now extract the rest of the variables through object destructuring 
        const {consentPayload} = body
        const {user_id, name, email,  IP_ADDRESS, result_consent, email_consent, subscribed} = consentPayload; 

        console.log('this is th user id, name and email in the capture consent status route', user_id, name, email,  IP_ADDRESS, subscribed); 

        

        const fields = {

            user_id: user_id, 
            name: name, 
            email: email, 
            result_consent: result_consent, 
            email_consent: email_consent, 
            subscribed: subscribed,
            IP_ADDRESS: IP_ADDRESS

        }

        console.log('this is the consent capture fields with the ip address and the user identification details', fields); 


        try {
               const airtableResp = await base(TABLE_ID).create([{ fields }]);

               console.log('this is the response from airtable in the consent capture api route', airtableResp); 


            } catch (error) {
              console.error("Airtable create error:", error);
              return NextResponse.json(
                { message: "Failed to save Airtable record" },
                { status: 500 }
              );
            }


            
    return NextResponse.json({message: 'successfully saved consent status to airtable database!'}, {status: 200}); 

    }
    catch(error){


        console.error('could not save consent status to airtable database', error); 
        return NextResponse.json({message: 'could not save consent status to airtable db'}, {status: 500}); 


    }



} 

