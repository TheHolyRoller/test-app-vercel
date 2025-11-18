import { NextResponse } from "next/server";
import { ulid } from "ulid";
import axios from "axios";
const Airtable = require("airtable");

export async function POST(req) {
  console.log("Incoming request to /api/fetchip");

  // ------------------------------
  // 1. Parse the body ONCE
  // ------------------------------
  let body;
  let subscribed; 

  try {
    body = await req.json();
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

//   TODO Extract these values from the request body 
/**         score,
            memoryScore,
            writingScore,
            readingScore,
            examResultsScore,
            organisationalScore,
            ageRange: userAge */
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

  // ------------------------------
  // 2. Call /api/init_ulid to get user ID
  // ------------------------------
  let initUlidRes;
  try {
    initUlidRes = await fetch("http://localhost:3000/api/init_ulid", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    console.log('this is the unitUlidRes from the initULID call \n', initUlidRes); 
    

  } catch (error) {
    console.error("Failed calling /api/init_ulid:", error);
    return NextResponse.json(
      { message: "Failed to initialize ULID" },
      { status: 500 }
    );
  }

  if (!initUlidRes.ok) {
    const text = await initUlidRes.text();
    console.error("init_ulid returned error:", text);
    return NextResponse.json(
      { message: "init_ulid route failed", details: text },
      { status: 500 }
    );
  }

  const initUlidData = await initUlidRes.json();
  const userId = initUlidData.ulid || ulid();

  console.log("ULID returned:", userId);

  // ------------------------------
  // 3. Extract IP
  // ------------------------------
  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0].trim() ?? "IP not found";

  console.log("Client IP:", ip);

  // ------------------------------
  // 4. Prepare Airtable payload
  // ------------------------------

//   TO DO add in the subscribed field her and set it depending on the value of the email checked 
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

  // ------------------------------
  // 5. Save to Airtable
  // ------------------------------
  const ACCESS_TOKEN = process.env.IVVI_SUPPORT_AIRTABLE_PA_TOKEN;
  const BASE_ID = process.env.IVVI_SUPPORT_CONSENT_BASE_ID;


const RESULT_ACCESS_TOKEN = process.env.PERSONAL_ACCESS_TOKEN; 

const RESULT_BASE_ID = process.env.BASE_ID; 

const RESULT_TABLE_ID = process.env.TABLE_ID

  const base = new Airtable({ apiKey: ACCESS_TOKEN }).base(BASE_ID);

  let airtableResp;

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

//   TODO create the payload for the results capture api call here 
/**         
 *          answers,
 *          score,
            memoryScore,
            writingScore,
            readingScore,
            examResultsScore,
            organisationalScore,
            ageRange: userAge
 */

        const payload = {

            answers,
            score,
            memoryScore,
            writingScore,
            readingScore,
            examResultsScore,
            organisationalScore,
            ageRange: userAge


        }

// TODO 
//   Check the Result and email consent here 
if(resultChecked){

    // TODO Call the create api method with the answers object and the ULID here 

    // Call using the new fetch api pattern 
    const response = await fetch("http://localhost:3000/api/init_ulid", {

        method: "POST", 
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify({payload})
    }); 

}

  // ------------------------------
  // 6. Return success response
  // ------------------------------
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
