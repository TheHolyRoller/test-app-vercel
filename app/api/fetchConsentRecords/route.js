import { getAirtableBase } from '../../lib/airtable'; 
import { NextResponse } from 'next/server';




export async function POST(req){


    console.log('fetch consent records api route '); 

    try{

        // TODO Change this temporarily to the old consent airtable base 
        const BASE_ID = process.env.IVVI_SUPPORT_CONSENT_BASE_ID; 
        
            console.log('this is the base ID \n', BASE_ID); 

            console.log('this is the result of the get Airtable method call \n', getAirtableBase); 
            console.log('this is the type of get Airtable Base method \n', typeof getAirtableBase); 
            const baseTest = getAirtableBase(); 
            console.log('this is the base test from the get airtable base function call \n', baseTest); 
            
            console.log('this is the query airtable post route'); 
            console.log('this is the requst from the front end \n', req); 

            const body = await req.json(); 
            console.log('this is the body of the request extracted with object destructuring after turning the request object into a JSON string \n', body); 
            const { email } = body; 
            console.log('this is the extracted email from the body of the request \n', email || "no email found"); 

            if(!email){

                console.log('no email found in fetch consent records!!!!!:::::::');
                return NextResponse.json({messsage: 'could not extract the email from the request'}, {status: 404});

            }


    


            const base = getAirtableBase();

            console.log('this is the base returned from the get airtable base function \n', base); 
            console.log('this is the type of base \n', typeof base); 

            if(!base){


                return NextResponse.json({message: 'Could not return the airtable base'}, {status: 404}); 

            }

            console.log('just about to query the airtable database api \n'); 
            const records = await base("Consent").
            select({

                filterByFormula: `{email} = "${email}"`, 
                sort: [{field: "Created", direction: "desc"}], 
                maxRecords: 1, 

            })
            .firstPage(); 


            if(!records || records.length === 0){

                return NextResponse.json({message: 'could not find the email in the airtable database'}, {status: 404}); 

            }

            console.log('these are the records \n', records); 
            console.log('this is the type of records \n', typeof records);
            
            console.log('this is the returned valued \n', { data: records[0].fields});
             

            return NextResponse.json({message: 'all okay records fetched', data: records[0].fields}, {status: 200});

    }

    catch(error){

        console.error('could not handle request \n', error); 
        return NextResponse.json({mesage: 'could not handle request'}, {status: 500}); 


    }

}

