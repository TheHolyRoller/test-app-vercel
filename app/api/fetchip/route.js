import { NextResponse } from "next/server";
import { ulid } from "ulid";
const Airtable = require("airtable");

export async function POST(req) {
  console.log("Incoming request to /api/fetchip");


  let body;
  let subscribed; 
  let user_id; 
  let global_ULID; 



  try {
    body = await req.json();
    console.log('this is the body of the request at the beginning of fetch ip server route \n', body); 
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const { answers, email, name, resultChecked, checked } = body;
    
  const {   score,
            memoryScore,
            writingScore,
            readingScore,
            examResultsScore,
            organisationalScore,
            ageRange: userAge} = body; 


  if(checked){

    subscribed = true; 

  }

  console.log('this is the subscribed value \n', subscribed); 


  if (!email) {
    return NextResponse.json(
      { message: "Email is required" },
      { status: 400 }
    );
  }

  console.log("Parsed body:", body);
  // TODO Refactor this to be defined after the init ULID api route is called 

  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0].trim() ?? "IP not found";

  console.log("Client IP:", ip);


  const fields = {
    user_id: global_ULID,
    name,
    email,
    IP_ADDRESS: ip,
    result_consent: JSON.stringify(resultChecked),
    email_consent: JSON.stringify(checked),
    subscribed: JSON.stringify(subscribed)
  };

  console.log("Airtable payload:", fields);

  const ACCESS_TOKEN = process.env.IVVI_SUPPORT_AIRTABLE_PA_TOKEN;
  const BASE_ID = process.env.IVVI_SUPPORT_CONSENT_BASE_ID;


const RESULT_ACCESS_TOKEN = process.env.PERSONAL_ACCESS_TOKEN; 

const RESULT_BASE_ID = process.env.BASE_ID; 

const RESULT_TABLE_ID = process.env.TABLE_ID

// TODO find out what this does and remove it if necessary 
  const base = new Airtable({ apiKey: ACCESS_TOKEN }).base(BASE_ID);

  let airtableResp;


  try{


    const payload = {
            email: email
        }

    console.log('this is result checked in the fetch ip if statement \n', resultChecked); 
    console.log('this is the type of result checked \n', typeof resultChecked); 


    const response = await fetch("http://localhost:3000/api/init_ulid", {

        method: "POST", 
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify({payload})
    }); 

    const data = await response.json(); 

    console.log('this is the JSON formatted response in the if statement \n', data); 

    console.log('this is the response in the result checked if statement  \n', response); 
    const api_payload = data.payload;
    console.log('this is the payload from the init ulid route in the fetch ip route \n', api_payload); 

    const {user_ulid} = api_payload; 

    if(user_ulid){

      console.log('this is the user ULID \n', user_ulid);


    }

    global_ULID = user_ulid; 
    console.log('this is the global ULID \n', global_ULID); 

  }

  catch(error){


    console.error('there was a problem generating the ULID \n', error); 
    return NextResponse.json({message: 'could not generate ULID'}, {status: 500}); 



  }
   

  // TODO Add in the consent Capture here and write 

  try{


    console.log('this is the subscribed varible in the consent capture api call in the fetch ip routeSSSS ', subscribed); 
    

    const consentPayload = {

      user_id: global_ULID || "default_ID", 
      name: name, 
      email: email, 
      IP_ADDRESS: ip,
      result_consent: JSON.stringify(resultChecked),
      email_consent: JSON.stringify(checked),
      subscribed: JSON.stringify(subscribed)

    }

    console.log('this is the consent payload in the fetch IP consent capture IP call \n', consentPayload); 

    const response = await fetch("http://localhost:3000/api/capture_consent_status", {

      method: "POST", 
      headers: {"Content-Type": 'application/json'}, 
      body: JSON.stringify({consentPayload})

    }); 


    console.log('this is the response from the consent capture api call', response); 

  }
  catch(error){

    console.log('could not capture user consent status', error); 

  }




if(resultChecked){
// TODO Add in the API call to the create route passing in the global ULID and the results variables extracted above 

console.log("this is the result capture if statement")

    // create the payload here 

    // Map out the payload like this 
    /**
     * answers, score, memoryScore, writingScore, readingScore, examResultsScore, organisationalScore, ageRange 
     */

    /**
     * 
     *   const {   
     * answers
     * score,
    memoryScore,
    writingScore,
    readingScore,
    examResultsScore,
    organisationalScore,
    ageRange: userAge} = body;
     * 
     * 
     */
    
    // TODO Change the structure of the Airtable Database to accomodate for not having personal user details anymore 
    const resultPayload = {
      answers: answers,
      ageRange: userAge, 
      score: score, 
      readingScore: readingScore, 
      writingScore: writingScore, 
      memoryScore: memoryScore, 
      examResultsScore: examResultsScore, 
      organisationalScore: organisationalScore             

    }


    // Call the create api route here with the result payload 

    try{

      const response = await fetch("http://localhost:3000/api/create", {

        method: "POST", 
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify({resultPayload})

      }); 

      console.log('this is the result of the results saving api request in the fetch ip server route \n', response); 


    }
    catch(error){

      console.error('could not save results to airtable \n', error); 
      return NextResponse.json({message: "could not save results to airtable"}, {status: 500}); 


    }

}

  return NextResponse.json(
    {
      message: "Successfully saved consent + IP",
      ip,
      global_ULID,
      airtableRecord: airtableResp,
    },
    { status: 200 }
  );
}

