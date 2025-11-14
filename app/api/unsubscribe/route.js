
import { NextResponse } from "next/server"; 
import axios from "axios";
const Airtable = require('airtable');


export async function POST(req) {



         const ACCESS_TOKEN = process.env.CONSENT_PERSONAL_ACCESS_TOKEN; 
        const BASE_ID = process.env.CONSENT_BASE_ID;
        const TABLE_ID = process.env.CONTENT_TABLE_ID; 


        console.log('this is the access token \n', ACCESS_TOKEN); 
        console.log('this is the base id \n', BASE_ID); 
        console.log('this is the table id \n', TABLE_ID); 


    console.log('this is the raw request from the unsubscribe route \n', req); 
    console.log('this is the type of the request \n', typeof req); 

    const body = await req.json();
    
    if(!body) return NextResponse.json({message: 'could not extract body from request!'}, {status: 404}); 

    console.log('this is the body of the request after it has been JSON formatted \n', body); 
    
    const email = body.email; 
    if(email){

        console.log('this is the email extracted from the body of the request \n', email); 


    }

        if(!email){

                return NextResponse.json({messsage: 'could not extract the email from the request'}, {status: 404});

            }


            //   const base = await getAirtableBase();
            const base = new Airtable({apiKey: ACCESS_TOKEN}).base(BASE_ID); 

            console.log('this is the base returned from the get airtable base function \n', base); 
            console.log('this is the type of base \n', typeof base); 


               if(!base){


                return NextResponse.json({message: 'Could not return the airtable base'}, {status: 404}); 

            }



            console.log('just about to query the airtable database api \n'); 
            const records = await base(BASE_ID).
            select({

                filterByFormula: `{email} = "${email}"`, 
                sort: [{field: "Created", direction: "desc"}], 
                maxRecords: 1, 



            })
            .firstPage(); 


            if(!records){

                return NextResponse.json({message: 'could not find the email in the airtable database'}, {response: 404}); 

            }

                console.log('these are the records \n', records); 
            console.log('this is the type of records \n', typeof records); 


            return NextResponse.json({message: 'all okay records fetched', data: records[0].fields}, {status: 200});


}

























