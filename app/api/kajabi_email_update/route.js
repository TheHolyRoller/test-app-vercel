import { NextResponse } from "next/server";
import axios from "axios";


// Create the utility function here that returns the Kajabi access token 
const KAJABI_SECRET = process.env.KAJABI_API_SECRET; 
const KAJABI_API_KEY = process.env.KAJABI_API_KEY; 

// Add in the site ID here 
const KAJABI_SITE_ID = process.env.KAJABI_SITE_ID; 

console.log('this is the Kajabi site ID \n', KAJABI_SITE_ID); 

const BASE_URL = process.env.KAJABI_BASE_URL; 

console.log('this is the Kajabi base url \n', BASE_URL); 


console.log('this is the kajabi api secret \n', KAJABI_API_SECRET); 
console.log('this is the kajabi api key \n', KAJABI_API_KEY); 


const getAccessToken = async () => {


    const response = await axios.post(`${BASE_URL}/oath/token`, {

    grant_type: 'client-credentials', 
    client_id: KAJABI_API_KEY, 
    client_secret: KAJABI_SECRET

    }, 

    {

        headers: {'Content-Type': 'application/json'}, 
    }
);

console.log('this is the response \n', response); 
console.log('this is the data of the response \n', response.data);
if(response.data.access_token){

    console.log('this is the access token \n', response.data.access_token); 
    console.log('this is the type of the access token \n', typeof response.data.access_token); 

}

if(!response.data.access_token){

    console.error("could not extract the access token!!!"); 
    return error("could not return access token!!!"); 

}

return response.data.access_token; 


}



export async function POST(req) {

    console.log('this is the Kajabi update email route');    

    try{


        // Take the request here and extract the contents 

        const body = await req.json();
        
        console.log('this is the extracted body using JSON serialization \n', body); 

        // Extract the email from the request body here 
        const {email} = body; 

        if(!email){

            return NextResponse.json({messag: 'could not extract email from the request object'}, {status: 404}); 

        }


        console.log('this is the extracted email from the body object serialized from the request object \n', email); 


        // Now send the email to the Kajabi Contacts Database using their API 

        // create the payload here 

        const payload = {

            email: email  
        }; 


        console.log('this is the Kajabi payload \n', payload); 


        // Setup the Kajabi API POST request here with the payload

        const token = await getAccessToken(); 


        const response = await fetch(`${BASE_URL}/emails`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, // <-- Use the token here
            },
            body: JSON.stringify(emailData),
          });
        
          const data = await response.json();


        // Default return the response from the Kajabi Server here 
        return NextResponse.json({message: 'Updated the Kajabi email contact list', data}, {status: 200}); 

    }

    catch(error){

        console.error("could not update Kajabi email list \n", error); 
        return NextResponse.json({message: 'could not update Kajabi email list'}, {status: 500}); 

    }

}
