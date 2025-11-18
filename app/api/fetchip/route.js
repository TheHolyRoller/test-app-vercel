import { NextResponse } from "next/server";
import { ulid } from "ulid";
import axios from "axios";
import { resolveNaptr } from "dns";
const Airtable = require("airtable");

export async function POST(req) {
  console.log("Incoming request to /api/fetchip");


  let body;
  let subscribed; 

  try {
    body = await req.json();
    console.log('this is the body of the request at the beginning of fetch ip server route \n', body); 
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }


  const { answers, email, name, resultChecked, checked } = body;
    
  const {score,
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
  const userId = ulid(); 

  console.log("ULID returned:", userId);

  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0].trim() ?? "IP not found";

  console.log("Client IP:", ip);


  const fields = {
    user_id: userId,
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

  const base = new Airtable({ apiKey: ACCESS_TOKEN }).base(BASE_ID);

  let airtableResp;


  // TODO Refactor this to be called after the init ulid route is called 
  try {
    airtableResp = await base("Consent").create([{ fields }]);
  } catch (error) {
    console.error("Airtable create error:", error);
    return NextResponse.json(
      { message: "Failed to save Airtable record" },
      { status: 500 }
    );
  }

  console.log("Airtable response:", airtableResp);
     

if(resultChecked){

     const payload = {
            email: email,
            answers,
            score,
            memoryScore,
            writingScore,
            readingScore,
            examResultsScore,
            organisationalScore,
            ageRange: userAge
        }

    console.log('this is result checked in the fetch ip if statement \n', resultChecked); 
    console.log('this is the type of result checked \n', typeof resultChecked); 


    // TODO Call the create api method with the answers object and the ULID here 
    // Call using the new fetch api pattern 
    const response = await fetch("http://localhost:3000/api/init_ulid", {

        method: "POST", 
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify({payload})
    }); 

    const data = await response.json(); 

    console.log('this is the JSON ifide response in the if statement \n', data); 

    console.log('this is the response in the result checked if statement  \n', response); 
    const api_payload = data.payload;
    console.log('this is the payload from the init ulid route in the fetch ip route \n', api_payload); 

    const {user_ulid} = api_payload; 

    if(user_ulid){

      console.log('this is the user ULID \n', user_ulid);


    }

}

  return NextResponse.json(
    {
      message: "Successfully saved consent + IP",
      ip,
      userId,
      airtableRecord: airtableResp,
    },
    { status: 200 }
  );
}









/** 















































 */



























